const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const registerUserService = async (userData) => {
  const { name, email, password, role } = userData;

  // Validate duplicate emails
  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error("Email is already registered");
    error.code = 11000;
    throw error;
  }

  // Create user with provided role (defaults to 'user' in model if not provided)
  const user = await User.create({ name, email, password, role });
  const token = user.generateAccessToken();
  return { data: user, token };
};

const loginUserService = async (credentials) => {
  const { email, password } = credentials;

  // Use +password to explicitly select the hidden password field for verification
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = user.generateAccessToken();
  user.password = undefined; // Scrub password from response

  return { data: user, token };
};

const logoutUserService = async (_userId) => {
  // In a production app with redis, you would blacklist the token here
  return true;
};

const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return true;
};

const resetPasswordService = async (_token, _newPassword) => {
  return true;
};

const refreshTokenService = async (oldToken) => {
  if (!oldToken) {
    const error = new Error("Refresh token is required");
    error.statusCode = 400;
    throw error;
  }

  let decoded;
  try {
    decoded = jwt.verify(
      oldToken,
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
    );
  } catch {
    const error = new Error("Invalid or expired refresh token. Please log in again.");
    error.statusCode = 401;
    throw error;
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    const error = new Error("User belonging to this token no longer exists");
    error.statusCode = 401;
    throw error;
  }

  const token = user.generateAccessToken();
  return { token };
};

const getCurrentUserService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }
  return user;
};

const sendOTPService = async (_email) => {
  return true;
};

const verifyOTPService = async (_email, _otp) => {
  return true;
};

const changePasswordService = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");
  if (!(await user.comparePassword(oldPassword))) {
    const error = new Error("Incorrect old password");
    error.statusCode = 401;
    throw error;
  }
  user.password = newPassword; // Will be safely hashed by the pre-save hook in the model
  await user.save();
  return true;
};

module.exports = {
  registerUser: registerUserService,
  loginUser: loginUserService,
  logoutUser: logoutUserService,
  forgotPassword: forgotPasswordService,
  resetPassword: resetPasswordService,
  refreshToken: refreshTokenService,
  getCurrentUser: getCurrentUserService,
  sendOTP: sendOTPService,
  verifyOTP: verifyOTPService,
  changePassword: changePasswordService,
};
