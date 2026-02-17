const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')

const userSignupSchema = new mongoose.Schema({
    name :{
        type: String,
        lowecase: true,
    },
    email :{
        type: String,
        lowecase: true,
    },
    password :{
        type: String,
        lowecase: true,
    },
    role:{
        type : String,
        enum : ["user", "admin"],
        default : "user"
    }

},{timestamps: true})

module.exports = mongoose.model("user", userSignupSchema)