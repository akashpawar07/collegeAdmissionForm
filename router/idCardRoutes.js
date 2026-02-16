const express = require("express");
const router = express.Router();
const studentIdCard = require("../models/studentIdCardModels");
const {preventLoggedinUser} = require('../middleware/authMiddlewares')


// POST
router.post("/", async (req, res) => {
    try {
        // Helper function to handle accidental arrays
        const getSingleValue = (val) => Array.isArray(val) ? val[0] : val;

        const studentId = new studentIdCard({
            academicYear: getSingleValue(req.body.academicYear),
            firstName: getSingleValue(req.body.firstName),
            surName: getSingleValue(req.body.surName),
            dateOfBirth: getSingleValue(req.body.dateOfBirth),
            bloodGroup: getSingleValue(req.body.bloodGroup),
            course: getSingleValue(req.body.course), // This fixes the error!
            classes: getSingleValue(req.body.classes),
            studentContact: getSingleValue(req.body.studentContact),
            parentsContact: getSingleValue(req.body.parentsContact),
            studentAddress: getSingleValue(req.body.studentAddress)
        });

        await studentId.save();
        res.status(200).render("idCardPopup");

    } catch (err) {
        console.error("Validation/Save Error:", err);
        res.status(500).send("Server Error: " + err.message);
    }
});


router.get("/", preventLoggedinUser, (req, res) => {
    res.render('idCard');
});

module.exports = router;