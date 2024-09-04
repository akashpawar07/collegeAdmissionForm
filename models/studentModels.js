const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    courses:{
        type:String,
    },
    addmissionThrough:{
        type:String,
    },
    class:{
        type:String,
    },
    branch:{
        type:String,
    },
    surname: {
        type: String,
        // required: true,
        lowercase: true
    },
    firstName: {
        type: String,
        // required: true,
        lowercase: true
    },
    fatherName: {
        type: String,
        // required: true,
        lowercase: true
    },
    motherName: {
        type: String,
        // required: true,
        lowercase: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        trim: true
        // required:true
    },
    gender: {
        type: String
    },
    village: {
        type: String
    },
    taluka: {
        type: String,
        // required: true
    },
    dist: {
        type: String,
        // required: true
    },
    state: {
        type: String,
        // required: true
    },
    abcId: {
        type: String,
        // required: true
    },
    aadharNo: {
        type: Number,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    nationality:{
        type:String,
        // required:true
    },
    religion:{
        type:String,
        // required:true
    },
    category:{
        type:String,
        // required:true
    },
    caste:{
        type:String,
        // required:true
    },
    address:{
        type:String,
        // required:true
    },
    studentContact:{
        type:Number,
        // required:true
    },
    parentsContact:{
        type:Number,
        // required:true
    },
    studentProfileImage:[{
        type: String
    }],
    studentSign:[{
        type: String
    }],
    studentDocuments:[{
        type: String
    }],

}, { timestamps: true })

const Student = mongoose.model("Student", studentSchema)
module.exports = Student;


