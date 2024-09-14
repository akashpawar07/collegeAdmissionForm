const express = require('express')
const router = express.Router()

const {handleUserLogin} = require("../controllers/singupController")


router.post("/", handleUserLogin)

router.get("/", (req, res) => {
    res.render('login')
})



module.exports = router