const userModel = require('../models/userModel');
const { setUser } = require("../services/auth");
const bcrypt = require("bcryptjs");
const { renderErrorCard, renderSuccessCard } = require("../services/signupMessageContainer")
const { renderLoginError, renderLoginSuccess } = require("../services/loginMessageContainer")

async function handleUserSignup(req, res) {

    try {
        const { name, email, password } = req.body;

        // 1. Check for missing fields
        if (!name || !email || !password) {
            return res.status(400).send(renderErrorCard("Missing Fields", "All fields are required. Please fill out the entire form."));
        }

        // 2. Regex Definitions
        const nameRegex = /^[a-zA-Z]{2,}(?:\s[a-zA-Z]{2,}){1,2}$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // 3. Name Validation
        if (!nameRegex.test(name.trim())) {
            return res.status(400).send(renderErrorCard("Invalid Name", "Please enter a valid full name (e.g., First Last). Only letters and spaces are allowed."));
        }

        // 4. Email Validation
        if (!emailPattern.test(email)) {
            return res.status(400).send(renderErrorCard("Invalid Email", "Please enter a valid email address format."));
        }

        // 5. Password Validation
        if (!passwordPattern.test(password)) {
            return res.status(400).send(renderErrorCard("Weak Password", "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."));
        }

        // 6. Check if user already exists
        const userExists = await userModel.findOne({ email: email });
        if (userExists) {
            return res.status(422).send(renderErrorCard("Account Exists", "A user is already registered with this email address. Please login instead."));
        }

        // 7. Hash password and save user
        const hashedPassword = await bcrypt.hash(password, 10);

        const cleanName = name.trim();

        const user = await userModel.create({
            name: cleanName,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        // 8. Render the dynamic Success UI with the auto-redirect script!
        return res.status(200).send(renderSuccessCard(cleanName));

    } catch (err) {
        console.log("Error while saving signup details", err);
        return res.status(500).send(renderErrorCard("Server Error", "An internal server error occurred. Please try again later."));
    }
}


async function handleUserLogin(req, res) {
    
    try {
        const { email, password } = req.body;

        // Validation: Missing fields
        if (!email || !password) {
            return res.status(400).send(renderLoginError("Missing Fields", "Please provide both your email and password."));
        }

        // Find user in DB
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).send(renderLoginError("Login Failed", "We couldn't find an account matching those credentials. Please double-check your email and password."));
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            console.log("Server response - Password did not match");
            return res.status(401).send(renderLoginError("Login Failed", "We couldn't find an account matching those credentials. Please double-check your email and password."));
        }

        // --- SUCCESSFUL LOGIN LOGIC ---
        const token = setUser(user);
        res.cookie('userToken', token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day cookie
            httpOnly: true
        });

        console.log('Server response - Password has matched');

        // Render the local Green Success UI
        return res.status(200).send(renderLoginSuccess(user.name));

    } catch (error) {
        console.error("Login Error: ", error);
        return res.status(500).send(renderLoginError("Server Error", "An internal server error occurred. Please try again later."));
    }
}

// FIX 3: Clean module exports (No DB connection code mixed in here!)
module.exports = {
    handleUserSignup,
    handleUserLogin
};