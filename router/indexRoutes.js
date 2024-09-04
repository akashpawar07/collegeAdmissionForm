const express = require("express")
const router = express.Router()

const studentSchema = require("../models/studentModels")


const upload = require("../middleware/indexMiddleware")

const docUploader = upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: 'documents', maxCount: 16 }
])

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
    res.json(req.files)
})

router.get("/", (req, res) => {
    res.render('index')
})

module.exports = router

