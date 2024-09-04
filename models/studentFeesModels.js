const mongoose = require("mongoose")


const studentUndertakingFessSchema = new mongoose.Schema({
    studentName:{
        type:String,
        lowercase: true
    },
    fatherName:{
        type:String,
        lowercase: true
    },
    presentFees:{
        type:String,
    },
    propossedFees:{
        type:String,
    },
    address:{
        type:String,
    },
    personalContact:{
        type:String, 
    },
    fathersContact:{
        type:String, 
    },
    mothersContact:{
        type:String, 
    },
    relativeContact:{
        type:String, 
    },
    place:{
        type:String,
    },
    currentDate:{
        type:String,
    }
},
{ timestamps: true })

const feesUndertaking = mongoose.model("FeesUndertaking", studentUndertakingFessSchema)
module.exports = feesUndertaking;