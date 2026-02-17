const express = require("express");
const router = express.Router();
const studentSchema = require("../models/studentModels");
const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken');

// middleware for authorized user only
// const {preventLoggedinUser} = require('../middleware/authMiddlewares')

// 1. ROUTE TO RENDER THE PAGE
router.get("/", (req, res) => {
    res.render('admin-dashboard'); 
});

// 2. API ROUTE TO FETCH DATA
router.get("/students", async (req, res) => {   
    try {

        const students = await studentSchema.find().select(
            "-studentDocuments"
        );
        
        // Send the array directly as JSON
        res.status(200).json(students);
        console.log("Fetched students from DB successfully.");

    } catch (error) {
        console.log("Server error: ", error);
        res.status(500).json({
            message: "Failed to fetch data from database",
            success: false
        });
    }
});


// API ROUTE TO FETCH ADMIN PROFILE
router.get("/profile", async (req, res) => {
    try {
        const token = req.cookies.userToken; 
        
        if (!token) {
            return res.status(401).json({ success: false, message: "Not logged in" });
        }

        const decodedToken = jwt.verify(token, process.env.SECRETE_KEY);

        // 3. Find the user by the 'id' stored in the payload: {id: user._id, email: user.email}
        const admin = await userModel.findById(decodedToken.id).select("-password");

        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin profile not found" });
        }

        // 4. Send the data back to the frontend!
        res.status(200).json(admin);

    } catch (error) {
        console.log("Error fetching profile: ", error);
        res.status(500).json({ success: false, message: "Failed to load profile" });
    }
});

// PATCH route to update student status
router.patch("/update-status/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const { status } = req.body;

        // Find the student by ID and update their status field
        const updatedStudent = await studentSchema.findByIdAndUpdate(
            studentId, 
            { status: status }, 
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        console.log(`Student ${studentId} status updated to ${status}`);
        res.status(200).json({ success: true, message: "Status updated successfully" });

    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;