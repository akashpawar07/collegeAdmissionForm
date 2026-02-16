const express = require('express')
const router = express.Router()
const {preventLoggedinUser} = require('../middleware/authMiddlewares')
const {handleUserLogin} = require("../controllers/singupController")


router.post("/", handleUserLogin)

router.get("/", preventLoggedinUser, (req, res) => {
    res.render('login')
})



module.exports = router