const mongoose = require("mongoose");

const studentUndertakingSchema = new mongoose.Schema({
    date: {
        type: Date,
        trim: true
    },
    GuardianName: {
        type: String,
        require: true,
        uppercase: true
    },
    StudentName: {
        type: String,
        require: true,
        uppercase: true
    },

    InstituteName: {
        type: String,
        require: true,
        uppercase: true
    },
    studentSignature:{
        type: String,
        require: true,
        uppercase: true
    },
    ParentsSignature:{
        type: String,
        require: true,
        uppercase: true
    }
    
}, { timestamps: true })

const studentUndertaking = mongoose.model("studentUndertaking", studentUndertakingSchema)
module.exports = studentUndertaking