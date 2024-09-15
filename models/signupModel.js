const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

},{timestamps: true})

// userSignupSchema.pre("save", async function(next){
//     if(this.isModified('password')){
//         this.password = await bcrypt.hash(this.password, 12)
//     }
//     next();
// })

module.exports = mongoose.model("userSignup", userSignupSchema)