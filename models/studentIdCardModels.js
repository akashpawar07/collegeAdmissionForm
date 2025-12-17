const mongoose = require("mongoose");

const studentIdCardSchema = new mongoose.Schema({
    academicYear: {
        type: String,
        trim: true
    },
    firstName: {
        type: String,
        uppercase: true,
        trim: true,
        required: true
    },
    middleName: {
        type: String,
        uppercase: true,
        trim: true
    },
    surName: {
        type: String,
        uppercase: true,
        trim: true,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE', 'OTHER'],
        uppercase: true
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        uppercase: true
    },
    course: {
        type: String,
        uppercase: true,
        enum: ['B.TECH', 'M.TECH', 'M.B.A']
    },
    classes: {
        type: String,
        uppercase: true,
        enum: ['FIRST YEAR', 'SECOND YEAR', 'THIRD YEAR', 'FINAL YEAR']
    },

    branch: {
        type: String,
        uppercase: true,
        enum: ['CIVIL', 'EE', 'CSE', 'ECE', 'DS', 'AIML', 'MECH', 'VLSI', '5G']
    },
    
    otherBranch: {
        type: String,
        uppercase: true,
        trim: true
    },

    studentContact: {
        type: String,
        trim: true,
        required: true,
    },
    
    parentsContact: {
        type: String,
        trim: true,
        required: true,
    },
    studentAddress: {
        type: String,
        uppercase: true,
        trim: true,
        required: true
    }
}, { timestamps: true });

const studentIdCard = mongoose.model("studentIdCard", studentIdCardSchema);
module.exports = studentIdCard;