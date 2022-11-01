const catchAsyncError = require('../middleware/catchAsyncError');
const Product = require('../models/product');

exports.getAllProduct = catchAsyncError( async (req, res, next) => {

    const { title, description, category, mrp, image} = req.body;

    const product = await Product.create({
    title, description, category, mrp, image
   })

   const token = await product.jwtToken();

   res.status(201).cookie("Practice", token, () => {

   }).json({
    success: true,
    product
   })
})