const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendEmail = require("../utils/sendEmail.js");

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
    return next(new ErrorHandler("please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("invalid email or password", 401));
  }

  const isPasswordMatched = user.comparePassword("password");

  if (!isPasswordMatched) {
    return next(new ErrorHandler("invalid email or password", 401));
  }

  sendToken(user, 201, res);
});

// logout

exports.logOut = catchAsyncError( async (req, res, next)=>{

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })

  res.status(200).json({
    success: true,
    message: "LOGOUT SUCCESSFULLY",
  })

})

//forgotPassword

exports.forgotPassword = catchAsyncError( async(req, res, next) => {

  const user = await User.findOne({email: req.body.email})

  if(!user){
    return next(new ErrorHandler("user not found"), 404);
  }

  const resetToken = user.resetPassword();

  await user.save({validatorBeforeSave: false})

  const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/resetPassword/${resetToken}`;

  const message = `your password token is ${resetPasswordURL} and will be reset`

  try {
    await sendEmail({
      email: user.email,
      subject :`practice password reset`,
      message,

    })
    res.status(200).json({
      success: true,
      message: `send email to ${user.email} is successfully`

    })
  }
  catch (err){
    user.resetPasswordToken = undefined;
    user.resetPasswordExpaires = undefined;
    await user.save({validatorBeforeSave: false})
    return next(new ErrorHandler(err.message), 500)
  }
})

exports.updateData = catchAsyncError ( async (req, res, next) => {
    const user = await User.findOne({id: req.params._id})
    con
})