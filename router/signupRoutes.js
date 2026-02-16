const express = require('express')
const router = express.Router()

const {preventLoggedinUser} = require('../middleware/authMiddlewares')
const {handleUserSignup} = require("../controllers/singupController")

router.post("/",  handleUserSignup)

router.get("/", preventLoggedinUser,(req, res) => {
    res.render('signup')
})



module.exports = router