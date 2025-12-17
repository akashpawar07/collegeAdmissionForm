const express = require("express")
const router = express.Router()

// imported the studentUndertakingSchema of secondPage
const studentUndertakingSchema = require('../models/undertakingModels')

// importing middleware for storing student sign and guardian sign
const Upload = require("../middleware/undertakingMiddeware")
const docUploader = Upload.fields([
    { name: 'studentSign', maxCount: 1 },
    { name: 'guardianSign', maxCount: 1 }
])


////////////// New POST Request to store files dierctly in DB \\\\\\\\\\\\\\\\\\

router.post("/", docUploader, async (req, res) => {
    try {
        const data = new studentUndertakingSchema({
            date: req.body.tarikh,
            GuardianName: req.body.fathername,
            StudentName: req.body.stdname,
            InstituteName: req.body.institutename,
        })

        // Save student signature if provided
        if (req.files && req.files['studentSign']) {
            data.studentSignature = {
                data: req.files['studentSign'][0].buffer,
                contentType: req.files['studentSign'][0].mimetype,
                filename: req.files['studentSign'][0].originalname
            }
        }

        // Save guardian signature if provided
        if (req.files && req.files['guardianSign']) {
            data.ParentsSignature = {
                data: req.files['guardianSign'][0].buffer,
                contentType: req.files['guardianSign'][0].mimetype,
                filename: req.files['guardianSign'][0].originalname
            }
        }

        const stdUndertakingData = await data.save()
        res.status(200).render('studentUnderPopup')
    } catch (error) {
        console.error("Error saving data:", error)
        res.status(500).send("Error saving undertaking data")
    }
})





/////////////// OLD POST request \\\\\\\\\\\\\\\\
// router.post("/", docUploader, async (req, res) => {
//     try {
//         // Uncomment when you want to save signatures
//         const studentSignature = req.files['studentSign']?.[0]?.path
//         const ParentsSignature = req.files['guardianSign']?.[0]?.path

//         const data = new studentUndertakingSchema({
//             date: req.body.tarikh,
//             GuardianName: req.body.fathername,
//             StudentName: req.body.stdname,
//             InstituteName: req.body.institutename,
//             studentSignature: studentSignature,
//             ParentsSignature: ParentsSignature
//         })

//         const stdUndertakingData = await data.save()
//         res.status(200).render('studentUnderPopup')

//     } catch (error) {
//         console.error("Error saving data:", error)
//         res.status(500).send("Error saving undertaking data")
//     }
// })





// GET routes for studentUndertaking
router.get("/", (req, res) => {
    res.render('studentUndertaking')
})

// exporting module
module.exports = router