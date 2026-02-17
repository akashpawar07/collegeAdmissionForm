const express = require("express");
const router = express.Router();
const {renderLogoutSuccess} = require("../services/logoutMessageContainer")



router.post("/", (req, res) => {
    // 1. Tell the browser to delete the cookie
    res.clearCookie("userToken");
    
    // 2. Send the beautiful HTML response back
    res.status(200).send(renderLogoutSuccess());
});

module.exports = router;