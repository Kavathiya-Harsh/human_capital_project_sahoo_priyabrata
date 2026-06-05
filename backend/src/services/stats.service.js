const Price = require("../models/price.model");
const User = require("../models/user.model");

// Aggregate statistics using MongoDB pipelines for maximum performance on 190k records
const getPriceStatisticsService = async () => {
  try {
    // Get main stats
    const statsPromise = Price.aggregate([
      {
        $group: {
          _id: null,
          totalRecords: { $sum: 1 },
          averageValue: { $avg: "$value" },
          maxValue: { $max: "$value" },
          minValue: { $min: "$value" },
        },
      },
    ]);

    // Get distinct countries count
    const countriesCountPromise = Price.distinct("countryCode");

    // Get trend: average value by year
    const trendPromise = Price.aggregate([
      { $group: { _id: "$year", value: { $avg: "$value" } } },
      { $sort: { _id: 1 } },
      { $limit: 8 }
    ]);

    // Get categories: count by indicatorName
    const categoriesPromise = Price.aggregate([
      { $group: { _id: "$indicatorName", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Get active users count
    const usersCountPromise = User.countDocuments();

    const [stats, countries, trendAgg, categoryAgg, activeUsers] = await Promise.all([
      statsPromise,
      countriesCountPromise,
      trendPromise,
      categoriesPromise,
      usersCountPromise
    ]);

    const mainStats = stats[0] || { totalRecords: 0, averageValue: 0, maxValue: 0, minValue: 0 };

    const trend = trendAgg.map(t => ({
      name: String(t._id),
      value: t.value ? Math.round(t.value * 100) / 100 : 0
    }));

    const categories = categoryAgg.map(c => ({
      name: c._id ? (c._id.length > 25 ? c._id.substring(0, 22) + "..." : c._id) : 'General',
      count: c.count
    }));

    return {
      totalRecords: mainStats.totalRecords,
      totalIndicators: mainStats.totalRecords,
      totalCountries: countries.length,
      activeUsers,
      averageValue: mainStats.averageValue,
      maxValue: mainStats.maxValue,
      minValue: mainStats.minValue,
      trend: trend.length > 0 ? trend : undefined,
      categories: categories.length > 0 ? categories : undefined
    };
  } catch (error) {
    console.error("Error in getPriceStatisticsService:", error);
    return {};
  }
};

const getHighestValueService = async () => {
  // Sort descending by value and pick the first document using lean()
  return Price.findOne().sort("-value").lean();
};

const getLowestValueService = async () => {
  // Sort ascending, ignoring null values
  return Price.findOne({ value: { $ne: null } })
    .sort("value")
    .lean();
};

const getMonthlyAverageService = async () => {
  return Price.aggregate([
    { $match: { month: { $ne: null } } },
    { $group: { _id: "$month", average: { $avg: "$value" } } },
    { $sort: { _id: 1 } }, // Sort Jan to Dec
  ]);
};

const getYearlyAverageService = async () => {
  return Price.aggregate([
    { $group: { _id: "$year", average: { $avg: "$value" } } },
    { $sort: { _id: -1 } }, // Sort newest to oldest
  ]);
};

const getTopCountriesService = async () => {
  return Price.aggregate([
    { $group: { _id: "$countryName", recordCount: { $sum: 1 } } },
    { $sort: { recordCount: -1 } },
    { $limit: 10 },
  ]);
};

const getTopIndicatorsService = async () => {
  return Price.aggregate([
    { $group: { _id: "$indicatorName", recordCount: { $sum: 1 } } },
    { $sort: { recordCount: -1 } },
    { $limit: 10 },
  ]);
};

const getValueDistributionService = async () => {
  // Ready for advanced $bucket aggregation logic
  return { message: "Value distribution data" };
};

const getRecordsCountService = async () => {
  return { total: await Price.estimatedDocumentCount() }; // Faster than countDocuments
};

const getTrendingStatisticsService = async () => {
  return { trending: true };
};

const getOverviewStatsService = async () => {
  const [totalPrices, topCountries] = await Promise.all([
    Price.estimatedDocumentCount(),
    getTopCountriesService(),
  ]);
  return { totalPrices, topCountries };
};

const getCountryStatsService = async (countryCode) => {
  return Price.aggregate([
    { $match: { countryCode: String(countryCode).toUpperCase() } },
    {
      $group: {
        _id: "$countryCode",
        avgValue: { $avg: "$value" },
        count: { $sum: 1 },
      },
    },
  ]);
};

const getYearStatsService = async (year) => {
  return Price.countDocuments({ year: Number(year) });
};

const getMonthStatsService = async (month) => {
  return Price.countDocuments({ month: Number(month) });
};

module.exports = {
  getPriceStatistics: getPriceStatisticsService,
  getHighestValue: getHighestValueService,
  getLowestValue: getLowestValueService,
  getMonthlyAverage: getMonthlyAverageService,
  getYearlyAverage: getYearlyAverageService,
  getTopCountries: getTopCountriesService,
  getTopIndicators: getTopIndicatorsService,
  getValueDistribution: getValueDistributionService,
  getRecordsCount: getRecordsCountService,
  getTrendingStatistics: getTrendingStatisticsService,
  getOverviewStats: getOverviewStatsService,
  getCountryStats: getCountryStatsService,
  getYearStats: getYearStatsService,
  getMonthStats: getMonthStatsService,
};
