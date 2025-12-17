const express = require("express")
const router = express.Router();

const studentIdCard = require("../models/studentIdCardModels")


// POST route fro creating idCards
router.post("/", async (req, res) => {
    try {
        // console.log("REQ BODY:", req.body);

        studentId = new studentIdCard({
            academicYear: req.body.academic,
            firstName: req.body.fname,
            middleName: req.body.mname,
            surName: req.body.sname,
            dateOfBirth: req.body.DOB,
            gender: req.body.Gender,
            bloodGroup: req.body.BloodGroup,

            course: req.body.course || "",
            classes: req.body.classes || "",
            branch: req.body.branches || "",
            otherBranch: req.body.otherBranches || "",

            studentContact: req.body.stdContact,
            parentsContact: req.body.pContact,
            studentAddress: req.body.stdAddress
        });

        const newStudent = await studentId.save();

        // console.log("Saved Student:", newStudent);

        res.status(200).render("idCardPopup");

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});




// GET route
router.get("/", (req, res) => {
    res.render('idCard')
})
// exporting last page route
module.exports = router




