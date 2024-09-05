const mongoose = require("mongoose")


const studentUndertakingFessSchema = new mongoose.Schema({
    studentName:{
        type:String,
        uppercase: true
    },
    fatherName:{
        type:String,
        uppercase: true
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
        uppercase: true
    },
    currentDate:{
        type:String,
    }
},
{ timestamps: true })

const feesUndertaking = mongoose.model("FeesUndertaking", studentUndertakingFessSchema)
module.exports = feesUndertaking;