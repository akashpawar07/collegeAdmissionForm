// const { v4: uuidv4 } = require('uuid')
const signupModel = require('../models/signupModel')
const { setUser } = require("../services/auth")
const bcrypt = require("bcryptjs")
// const popups = require('popups')

async function handleUserSignup(req, res) {

    // get data from body
    const { name, email, password } = req.body

    // check fields empty or not
    if (!name || !email || !password) {
        res.status(500).send(`
            <h1>All fields are required</h1>
            <a href="/signup">Go back to Signup</a>`);
        return null
    }

    //checking that email is already exist in our database or not if exist  
    const userExists = await signupModel.findOne({ email: email })
    if (userExists) {
        return res.status(422).send(`
            <h1>User already exists with this email</h1>
            <a href="/signup">Go back to Signup</a> `);
    }

    // has the password
    const hashedPassword = await bcrypt.hash(password, 12)

    // save the user into database
    user = await signupModel.create({
        name,
        email,
        password: hashedPassword
    });
    try {
        const userData = await user.save()
        console.log("signup details saved successfully", userData)
    } catch (err) {
        console.log("Error while saving signup details", err)
    }
    res.status(200).redirect('/login')
}


async function handleUserLogin(req, res) {
    try {
        // get all data from from frontend
        const { email, password } = req.body

        //checking here fields empty or not send response accordingly
        if (!(email && password)) {
            res.status(500).send(`
                <h1>Email and Password is required</h1>
                <a href="/login">Go back to login</a>
            `);
            return null
        }

        //geting user on basis of email
        const user = await signupModel.findOne({ email });

        // if there is no user belongs the redirect to the login page
        if (!user) {
            // return res.redirect("/login");
            return res.send(`
                <h1>User not found with this credentials</h1>
                <a href="/login">Go back to login</a>
            `);
            return null;
        }


        if (user && await bcrypt.compare(password, user.password)) {
            //if it is user then generate cookie for user and redirect to the home page "/"
            const token = setUser(user)
            res.cookie('userToken', token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly: true
            })
            console.log('server response - Password has matched')
            return res.redirect("/");

        } else {
            res.send("Something went wrong")
            console.log("server response - password has not match")
        }
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    handleUserSignup,
    handleUserLogin
}
