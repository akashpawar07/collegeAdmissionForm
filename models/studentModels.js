const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    surname: {
        type: String,
        uppercase: true
    },
    firstName: {
        type: String,
        uppercase: true
    },
    fatherName: {
        type: String,
        uppercase: true
    },
    motherName: {
        type: String,
        uppercase: true,
        trim: true
    },
    courses: {
        type: String,
        uppercase: true
    },
    addmissionThrough: {
        type: String,
        uppercase: true
    },
    class: {
        type: String,
        uppercase: true
    },
    branch: {
        type: String,
        uppercase: true
    },
    dateOfBirth: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        uppercase: true
    },
    village: {
        type: String,
        uppercase: true
    },
    taluka: {
        type: String,
        uppercase: true,
    },
    dist: {
        type: String,
        uppercase: true
    },
    state: {
        type: String,
        uppercase: true
    },
    abcId: {
        type: String,
    },
    aadharNo: {
        type: Number,
    },
    email: {
        type: String,
        lowercase: true
    },
    nationality: {
        type: String,
        uppercase: true
    },
    religion: {
        type: String,
        uppercase: true
    },
    category: {
        type: String,
        uppercase: true
    },
    caste: {
        type: String,
        uppercase: true
    },
    address: {
        type: String,
        uppercase: true
    },
    studentContact: {
        type: Number,
    },
    parentsContact: {
        type: Number,
    },
    // store binary data
    studentProfileImage: {
        data: Buffer,
        contentType: String,
        filename: String
    },
    studentSign: {
        data: Buffer,
        contentType: String,
        filename: String
    },
    studentDocuments: [{
        data: Buffer,
        contentType: String,
        filename: String
    }]

}, { timestamps: true })

const Student = mongoose.model("Student", studentSchema)
module.exports = Student;