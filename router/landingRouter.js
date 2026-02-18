const express = require('express')
const router = express.Router()
const {preventLoggedinUser} = require('../middleware/authMiddlewares')


router.get("/", preventLoggedinUser, (req, res) => {
    res.render('landing'); 
});

module.exports = router