const express = require("express")
const router = express.Router()
const studentUndertakingFessSchema = require('../models/studentFeesModels')

const {preventLoggedinUser} = require('../middleware/authMiddlewares')

// POST route
router.post("/", async (req, res) => {
    try {
        const data = new studentUndertakingFessSchema({
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

        await data.save()
        res.status(200).render('feesUnderPopup')

    } catch (error) {
        console.error("Server error:", error.message)
        res.status(500).send("Server Error: " + error.message)
    }
})

// GET route
router.get("/", preventLoggedinUser, (req, res) => {
    res.render('feesUndertaking')
})

module.exports = router
