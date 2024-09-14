const express = require('express')
const router = express.Router()

const {handleUserSignup} = require("../controllers/singupController")

router.post("/", handleUserSignup)

router.get("/", (req, res) => {
    res.render('signup')
})



module.exports = router