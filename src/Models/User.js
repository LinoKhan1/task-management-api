// models/User.js

const mongoose = require('moogoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = moogoose.model('User', userSchema);