const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({

    name:{
        type : String,
        required: [ true, 'please enter a name'],
        minLength:[3, 'please enter atleast 3 character']
    },
    email:{
        type : String,
        required: [ true, 'please enter a email address'],
        validator: [ validator.isEmail, 'please enter a valid email']
    },
    password:{
        type : String,
        required: [ true, 'please enter a password'],
        minLength : [7, 'please enter atleast 7 characters password']
    },
    number:{
        type : Number,
        required: [ true, 'please enter a number'],
        minLength : [9, 'please enter valid number']
    }
})

module.exports = mongoose.model("User", userSchema);