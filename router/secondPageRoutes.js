const express = require("express")
const router = express.Router()


const studentUndertakingSchema = require("../models/undertakingModels")

router.post("/", async (req, res) => {

    stdUndertaking = new studentUndertakingSchema({

        dateOfUndertaking: req.body.date,
        guardianName: req.body.guardian_name,
        studentName: req.body.student_name,
        InstituteName: req.body.institute_name

    })

    const stdUnder= await stdUndertaking.save()
    res.send("zal kam")
    // console.log(req.body.dateOfUndertaking)
})
router.get("/", (req, res) => {
    res.render('secondPage')
})

module.exports = router