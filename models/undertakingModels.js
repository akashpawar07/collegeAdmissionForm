const mongoose = require("mongoose");

const studentUndertakingSchema = new mongoose.Schema({
    date: {
        type: String,
        trim: true
    },
    GuardianName: {
        type: String,
        required: true,
        uppercase: true
    },
    StudentName: {
        type: String,
        required: true,
        uppercase: true
    },
    InstituteName: {
        type: String,
        required: true,
        uppercase: true
    },
    studentSignature: {
        data: Buffer,
        contentType: String,
        filename: String
    },
    ParentsSignature: {
        data: Buffer,
        contentType: String,
        filename: String
    }

}, { timestamps: true })

const studentUndertaking = mongoose.model("studentUndertaking", studentUndertakingSchema)
module.exports = studentUndertaking