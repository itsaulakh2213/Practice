const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
i;
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = await req.cookies;

  if (!token) {
    return next(new ErrorHandler("please login for access this resource", 401));
  }

  const decodeData = jwt.verify(token, process.env.JWT.SKEY);

  req.user = await User.findById(decodeData.id);

  next();
});

exports.authorizeRole = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed this resource`,
          403
        )
      );
    }
    next();
  };
};
