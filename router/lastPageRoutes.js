const express = require("express")
const router = express.Router();


const {
    lastPageGetController
} = require("../controller/lastPageController")



router.get("/", lastPageGetController)

module.exports = router




