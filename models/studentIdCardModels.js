const mongoose = require("mongoose");

const studentIdCardSchema = new mongoose.Schema({
    academicYear: String,
    firstName: { type: String, uppercase: true, trim: true },
    surName: { type: String, uppercase: true, trim: true },
    dateOfBirth: String,
    bloodGroup: { type: String, uppercase: true },
    course: { type: String, uppercase: true },
    classes: { type: String, uppercase: true },
    studentContact: String,
    parentsContact: String,
    studentAddress: { type: String, uppercase: true, trim: true }
}, { timestamps: true });

const studentIdCard = mongoose.model("studentIdCard", studentIdCardSchema);
module.exports = studentIdCard;