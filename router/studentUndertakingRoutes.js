const express = require("express")
const router = express.Router()

// imported the studentUndertakingSchema of secondPage
const studentUndertakingSchema = require('../models/undertakingModels')

// importing middleware for storing student sign and guardian sign
const Upload = require("../middleware/undertakingMiddeware")
const docUploader = Upload.fields([
    { name: 'studentSign', maxCount:1},
    { name: 'guardianSign', maxCount:1}
])

// post route of student undertaking
router.post("/", docUploader, async(req, res)=>{
    studentSignature = req.files['studentSign'][0].path
    ParentsSignature = req.files['guardianSign'][0].path

    data = new studentUndertakingSchema({
        date: req.body.tarikh,
        GuardianName: req.body.fathername,
        StudentName: req.body.stdname,   
        InstituteName:req.body.institutename,
        studentSignature:studentSignature,
        ParentsSignature:ParentsSignature
    })
    stdUndertakingData = await data.save()
    res.status(200).render('studentUnderPopup')
})
// GET routes for studentUndertaking
router.get("/", (req, res) => {
    res.render('studentUndertaking')
})
// exporting module
module.exports = router