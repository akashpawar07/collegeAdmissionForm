const mongoose = require("mongoose");


const studentIdCardSchema = new mongoose.Schema({
    academicYear: {
        type: String,
    },
    firstName: {
        type: String,
        uppercase: true
    },
    middleName: {
        type: String,
        uppercase: true
    },
    surName: {
        type: String,
        uppercase: true
    },
    dateOfBirth: {
        type: Date,
        trim: true
    },
    gender: {
        type: String,
        uppercase: true
    },
    bloodGroup: {
        type: String,
        uppercase: true
    },
    course: [{
        type: String,
        uppercase: true
    }],
    classes: [{
        type: String,
        uppercase: true
    }],
    branch: [{
        type: String,
        uppercase: true
    }],
    otherBranch: {
        type: String,
        uppercase: true
    },
    studentContact: {
        type: Number
    },
    parentsContact: {
        type: Number
    },
    studentAddress: {
        type: String,
        uppercase: true
    }
}, { timestamps: true })

const studentIdCard = mongoose.model("studentIdCard", studentIdCardSchema)
module.exports = studentIdCard