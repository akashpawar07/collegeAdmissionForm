const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    courses:{
        type:String,
        uppercase: true
    },
    addmissionThrough:{
        type:String,
        uppercase: true
    },
    class:{
        type:String,
        uppercase: true
    },
    branch:{
        type:String,
        uppercase: true
    },
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
    dateOfBirth: {
        type: Date,
        trim: true
        // required:true
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
        // required: true
    },
    email: {
        type: String,
        lowercase: true
    },
    nationality:{
        type:String,
        uppercase: true
    },
    religion:{
        type:String,
        uppercase: true
    },
    category:{
        type:String,
        uppercase: true
    },
    caste:{
        type:String,
        uppercase: true
    },
    address:{
        type:String,
        uppercase: true
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


