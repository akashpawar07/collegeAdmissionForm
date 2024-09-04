const mongoose = require("mongoose");

const studentUndertakingSchema = new mongoose.Schema({
    date: {
        type: Date,
        trim: true
    },
    GuardianName: {
        type: String,
        require: true,
        lowercase:true
    },
    StudentName: {
        type: String,
        require: true,
        lowercase:true
    },

    InstituteName: {
        type: String,
        require: true,
        lowercase:true
    },
    studentSignature:{
        type: String,
        require: true,
        lowercase:true
    },
    ParentsSignature:{
        type: String,
        require: true,
        lowercase:true
    }
    
}, { timestamps: true })

const studentUndertaking = mongoose.model("studentUndertaking", studentUndertakingSchema)
module.exports = studentUndertaking