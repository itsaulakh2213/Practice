const User = require('../models/user');
const catchAsyncError = require('../middleware/catchAsyncError');

exports.registerUser = catchAsyncError( (req, res, next)=>{

    const { name, email, password, number } = req.body;

    const user = User.create({
        name, email, password, number
    })

    res.status(200).json({
        success: true,
        User
    });

})