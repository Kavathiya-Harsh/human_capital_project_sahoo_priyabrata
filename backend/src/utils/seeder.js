const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load backend .env configuration
dotenv.config({ path: path.join(__dirname, "../../.env") });

const User = require("../models/user.model");
const Country = require("../models/country.model");
const Indicator = require("../models/indicator.model");
const Price = require("../models/price.model");

const seedDatabase = async () => {
  const localUri = process.env.LOCAL_MONGODB_URI || "mongodb://127.0.0.1:27017/humanCapitalDB";
  console.log(`[🌱 Seeder] Connecting to database: ${localUri}`);

  try {
    await mongoose.connect(localUri);
    console.log("[🌱 Seeder] Connected successfully to MongoDB.");

    // Clear existing data
    console.log("[🌱 Seeder] Clearing existing database collections...");
    await Promise.all([
      User.deleteMany({}),
      Country.deleteMany({}),
      Indicator.deleteMany({}),
      Price.deleteMany({}),
    ]);
    console.log("[🌱 Seeder] Collections cleared.");

    // 1. Seed Users
    console.log("[🌱 Seeder] Seeding Users...");
    const users = await User.create([
      {
        name: "Admin User",
        email: "admin@humancapital.io",
        password: "Password123",
        role: "admin",
        isVerified: true,
      },
      {
        name: "Standard User",
        email: "user@humancapital.io",
        password: "Password123",
        role: "user",
        isVerified: true,
      },
    ]);
    const adminUser = users[0];
    console.log(`[🌱 Seeder] Seeded ${users.length} users successfully.`);

    // 2. Seed Countries
    console.log("[🌱 Seeder] Seeding Countries...");
    const countriesData = [
      { countryCode: "USA", countryName: "United States", region: "Americas", currency: "USD", createdBy: adminUser._id },
      { countryCode: "CAN", countryName: "Canada", region: "Americas", currency: "CAD", createdBy: adminUser._id },
      { countryCode: "GBR", countryName: "United Kingdom", region: "Europe", currency: "GBP", createdBy: adminUser._id },
      { countryCode: "DEU", countryName: "Germany", region: "Europe", currency: "EUR", createdBy: adminUser._id },
      { countryCode: "FRA", countryName: "France", region: "Europe", currency: "EUR", createdBy: adminUser._id },
      { countryCode: "JPN", countryName: "Japan", region: "Asia", currency: "JPY", createdBy: adminUser._id },
      { countryCode: "IND", countryName: "India", region: "Asia", currency: "INR", createdBy: adminUser._id },
      { countryCode: "CHN", countryName: "China", region: "Asia", currency: "CNY", createdBy: adminUser._id },
      { countryCode: "AUS", countryName: "Australia", region: "Oceania", currency: "AUD", createdBy: adminUser._id },
      { countryCode: "BRA", countryName: "Brazil", region: "Americas", currency: "BRL", createdBy: adminUser._id },
    ];
    const countries = await Country.create(countriesData);
    console.log(`[🌱 Seeder] Seeded ${countries.length} countries successfully.`);

    // 3. Seed Indicators
    console.log("[🌱 Seeder] Seeding Indicators...");
    const indicatorsData = [
      { indicatorCode: "CPI", indicatorName: "Consumer Price Index", category: "CPI", description: "Measure of the average change over time in the prices paid by urban consumers for a market basket of consumer goods and services." },
      { indicatorCode: "INF", indicatorName: "Inflation Rate", category: "Inflation", description: "The pace at which prices increase over a specific period, typically monthly or annually." },
      { indicatorCode: "UNE", indicatorName: "Unemployment Rate", category: "Unemployment", description: "The share of the labor force that is jobless, expressed as a percentage." },
      { indicatorCode: "GDP", indicatorName: "GDP Growth Rate", category: "GDP", description: "The rate at which a nation's Gross Domestic Product increases or decreases year-over-year." },
    ];
    const indicators = await Indicator.create(indicatorsData);
    console.log(`[🌱 Seeder] Seeded ${indicators.length} indicators successfully.`);

    // 4. Seed Prices
    console.log("[🌱 Seeder] Seeding Price records (historical series)...");
    const pricesData = [];

    // Helper baseline configurations per country & indicator
    const baseline = {
      USA: { CPI: 100, INF: 2.1, UNE: 3.9, GDP: 2.3 },
      CAN: { CPI: 99, INF: 2.0, UNE: 5.8, GDP: 1.9 },
      GBR: { CPI: 101, INF: 2.5, UNE: 4.1, GDP: 1.5 },
      DEU: { CPI: 98, INF: 1.8, UNE: 3.4, GDP: 1.3 },
      FRA: { CPI: 99, INF: 1.6, UNE: 8.5, GDP: 1.4 },
      JPN: { CPI: 95, INF: 0.5, UNE: 2.4, GDP: 0.8 },
      IND: { CPI: 110, INF: 4.8, UNE: 7.2, GDP: 6.5 },
      CHN: { CPI: 105, INF: 2.2, UNE: 4.5, GDP: 6.1 },
      AUS: { CPI: 100, INF: 2.1, UNE: 5.2, GDP: 2.2 },
      BRA: { CPI: 115, INF: 4.5, UNE: 11.0, GDP: 1.2 },
    };

    // A. Annual Prices (2018 to 2026)
    for (const c of countriesData) {
      for (const ind of indicatorsData) {
        let currentCPI = baseline[c.countryCode].CPI;
        for (let year = 2018; year <= 2026; year++) {
          let value = 0;
          const randomFactor = (Math.random() - 0.5) * 0.8; // subtle noise

          // Adjust macro stats based on COVID in 2020
          const isCovidYear = year === 2020;
          const isPostCovidYear = year === 2021 || year === 2022;

          if (ind.indicatorCode === "CPI") {
            const infRate = baseline[c.countryCode].INF + (isPostCovidYear ? 3.5 : 0) + randomFactor;
            currentCPI = currentCPI * (1 + infRate / 100);
            value = Math.round(currentCPI * 100) / 100;
          } else if (ind.indicatorCode === "INF") {
            value = baseline[c.countryCode].INF + (isPostCovidYear ? 4.0 : 0) + (isCovidYear ? -1.0 : 0) + randomFactor;
            value = Math.round(value * 100) / 100;
          } else if (ind.indicatorCode === "UNE") {
            value = baseline[c.countryCode].UNE + (isCovidYear ? 3.0 : 0) + (isPostCovidYear ? 1.0 : 0) + randomFactor;
            value = Math.round(Math.max(1.5, value) * 100) / 100;
          } else if (ind.indicatorCode === "GDP") {
            value = baseline[c.countryCode].GDP + (isCovidYear ? -5.5 : 0) + (isPostCovidYear ? 3.0 : 0) + randomFactor;
            value = Math.round(value * 100) / 100;
          }

          pricesData.push({
            frequency: "A",
            countryCode: c.countryCode,
            countryName: c.countryName,
            indicatorCode: ind.indicatorCode,
            indicatorName: ind.indicatorName,
            value,
            year,
            month: null,
          });
        }
      }
    }

    // B. Monthly Prices (Jan 2024 to Dec 2025)
    for (const c of countriesData) {
      for (const ind of indicatorsData) {
        let baseVal = 0;
        if (ind.indicatorCode === "CPI") baseVal = baseline[c.countryCode].CPI * 1.15;
        else if (ind.indicatorCode === "INF") baseVal = baseline[c.countryCode].INF + 1.2;
        else if (ind.indicatorCode === "UNE") baseVal = baseline[c.countryCode].UNE - 0.5;
        else if (ind.indicatorCode === "GDP") baseVal = baseline[c.countryCode].GDP + 0.3;

        for (let year = 2024; year <= 2025; year++) {
          for (let month = 1; month <= 12; month++) {
            let value = baseVal;
            const monthTrend = (year - 2024) * 12 + month;
            const seasonality = Math.sin((month / 12) * Math.PI * 2) * 0.5;
            const noise = (Math.random() - 0.5) * 0.4;

            if (ind.indicatorCode === "CPI") {
              value = baseVal + (monthTrend * 0.35) + seasonality + noise;
            } else if (ind.indicatorCode === "INF") {
              value = baseVal - (monthTrend * 0.05) + seasonality + noise;
            } else if (ind.indicatorCode === "UNE") {
              value = baseVal - (monthTrend * 0.03) + seasonality + noise;
            } else if (ind.indicatorCode === "GDP") {
              value = baseVal + seasonality + noise;
            }

            pricesData.push({
              frequency: "M",
              countryCode: c.countryCode,
              countryName: c.countryName,
              indicatorCode: ind.indicatorCode,
              indicatorName: ind.indicatorName,
              value: Math.round(Math.max(0, value) * 100) / 100,
              year,
              month,
            });
          }
        }
      }
    }

    console.log(`[🌱 Seeder] Bulking ${pricesData.length} price records...`);
    const seededPrices = await Price.create(pricesData);
    console.log(`[🌱 Seeder] Seeded ${seededPrices.length} price records successfully.`);

    console.log("[🌱 Seeder] Database seeded perfectly! 🌱");
    process.exit(0);
  } catch (err) {
    console.error("[❌ Seeder Error] Seeding process failed:", err);
    process.exit(1);
  }
};

seedDatabase();
