const User = require("../models/user");
const errorHander = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const catchAsyncError = require("../middleware/catchAsyncError");

// register user

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, number } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    number,
  });

  sendToken(user, 201, res);
});

//Login user

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  
  if (!email || !password) {
    return next(new errorHander("please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new errorHander("invalid email or password", 401));
  }

  const isPasswordMatched = user.comparePassword("password");

  if (!isPasswordMatched) {
    return next(new errorHander("invalid email or password", 401));
  }

  sendToken(user, 201, res);
});
