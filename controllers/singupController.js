const {v4:  uuidv4 } = require('uuid')
const signupModel = require('../models/signupModel')
const {setUser} = require("../services/auth")

async function handleUserSignup (req, res) {
    const { name, email, password } = req.body
    if(!name || !email || !password){
        res.status(500).send("All fields are required")
        return null
    }
    user = await signupModel.create({
        name,   
        email,
        password
    });
    try {
         const userData = await user.save()
         console.log("signup details saved successfully", userData)
     } catch (err) {
        console.log("Error while saving signup details", err)
     }
     res.status(200).redirect('/login')
}


async function handleUserLogin (req, res) {
    const { email, password } = req.body

    if(!email || !password){
        res.status(500).send("Email and password is required")
        return null
    }

    const user = await signupModel.findOne({email, password});
    // if there is no user belongs the redirect to the login page
    if(!user){
        return res.redirect("/login");
        console.log("user is not loggedin")
    }

    //if it is user then generate cookie for user and redirect to the home page "/"
    const token =  setUser(user)
    res.cookie('userToken', token)
    return res.redirect('/')
    
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}
