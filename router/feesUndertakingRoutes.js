const express = require("express")
const router = express.Router()

// imported the studentUndertakingSchema of secondPage
const studentUndertakingFessSchema = require('../models/studentFeesModels')

// POST route for feesUndertaking
router.post("/", async (req, res) => {
    data = new studentUndertakingFessSchema({
        studentName: req.body.stuname,
        fatherName: req.body.fathername,
        presentFees: req.body.presentFees,
        propossedFees: req.body.praposedFees,
        address: req.body.homeAdress,
        personalContact: req.body.pContact,
        fathersContact: req.body.fContact,
        mothersContact: req.body.mContact,
        relativeContact: req.body.rContact,
        place: req.body.placeName,
        currentDate: req.body.presentDate
    })
    stdFessUndertakingData = await data.save()
    res.status(200).render('feesUndertaking')
})
// GET router
router.get("/", (req, res) => {
    res.render('feesUndertaking')
})
// exporting module
module.exports = router;