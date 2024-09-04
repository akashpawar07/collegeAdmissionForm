const mongoose = require("mongoose");


const studentIdCardSchema = new mongoose.Schema({
    academicYear: {
        type: String,
    },
    firstName: {
        type: String,
        require: true,
        lowercase:true
    },
    middleName: {
        type: String,
        require: true,
        lowercase:true
    },
    surName: {
        type: String,
        require: true,
        lowercase:true
    },
    dateOfBirth: {
        type: Date,
        trim: true
    },
    gender: {
        type: String,
        require: true,
    },
    bloodGroup: {
        type: String
    },
    course: [{
        type: String,
        lowercase:true
    }],
    classes: [{
        type: String,
        lowercase:true
    }],
    branch: [{
        type: String,
        lowercase:true
    }],
    otherBranch: {
        type: String,
        lowercase:true
    },
    studentContact: {
        type: Number,
        require: true
    },
    parentsContact: {
        type: Number,
        require: true
    },
    studentAddress: {
        type: String,
        require: true,
        lowercase:true
    }
}, { timestamps: true })

const studentIdCard = mongoose.model("studentIdCard", studentIdCardSchema)
module.exports = studentIdCard