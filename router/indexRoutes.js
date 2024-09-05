const express = require("express");
const router = express.Router();

//using middleware fro get student profileIamge, signature, documents
const upload = require("../middleware/indexMiddleware")
const docUploader = upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: 'documents', maxCount: 16 }
])

//importing student schmea from models folder
const studentSchema = require("../models/studentModels")

// POST route fro creating student
router.post("/", docUploader, async (req, res) => {
    studentProfile =    req.files['profileImage'][0].path,
    studentSignature =  req.files['signature']   [0].path,
    studentDoc =        req.files['documents']
    
    students = new studentSchema({
        courses:req.body.course,
        addmissionThrough:req.body.AdmissionThrough,
        class:req.body.classes,
        branch:req.body.branch,
        surname: req.body.sur_name,
        firstName: req.body.first_name,
        fatherName: req.body.father_name,
        motherName: req.body.mother_name,
        dateOfBirth: req.body.dob,
        gender: req.body.Gender,
        village: req.body.Village,
        taluka: req.body.Taluka,
        dist: req.body.District,
        state: req.body.State,
        abcId: req.body.abcid,
        aadharNo: req.body.Aadhar,
        email: req.body.Email,
        nationality: req.body.Nationality,
        religion: req.body.Religion,
        category: req.body.Category,
        caste: req.body.Caste,
        address: req.body.Address,
        studentContact: req.body.StudentMN,
        parentsContact: req.body.pcontact,

        studentProfileImage:    studentProfile,
        studentSign:            studentSignature,
        studentDocuments:       studentDoc.map(doc=>doc.path)
    })
    const studentIsCreated = await students.save()
    res.status(200).render("indexPopup") 
})
// GET route for accessing home page
router.get("/", (req, res) => {
    res.render('index')
})

//exporting router
module.exports = router

