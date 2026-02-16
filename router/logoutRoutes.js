const express = require("express");
const router = express.Router();


router.post("/", (req, res) => {
    // 1. Tell the browser to delete the cookie
    res.clearCookie("userToken");
    
    res.redirect("/login"); 
});

module.exports = router;