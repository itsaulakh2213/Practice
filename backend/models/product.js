const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const productSchema = new mongoose.Schema({
  title : {
    type: String,
    required: true
  },
  description:{
    type : String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  mrp:{
    type: Number,
    required: true
  },
  image:{
    public_id:{
        type: String,
        required: true
    },
    url:{
        type:String,
        required: true
    }
  }
})

productSchema.methods.jwtToken = function () {
  return jwt.sign( {id: this._id}, process.env.JWT_SKEY)
}

module.exports = mongoose.model("Product", productSchema)