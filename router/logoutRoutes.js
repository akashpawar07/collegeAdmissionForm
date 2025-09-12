const express = require("express")
const router = express.Router()
const { getUser } = require("../services/auth")

console.log(getUser)


router.post("/", req, res=>{

})