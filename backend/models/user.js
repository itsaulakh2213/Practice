const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter a name"],
    minLength: [3, "please enter atleast 3 character"],
  },
  email: {
    type: String,
    required: [true, "please enter a email address"],
    validator: [validator.isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minLength: [7, "please enter atleast 7 characters password"],
  },
  number: {
    type: Number,
    required: [true, "please enter a number"],
    minLength: [9, "please enter valid number"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SKEY, {
    expiresIn: process.env.JWT_EXP,
  });
};

// comparePassword

userSchema.methods.comparePassword = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
