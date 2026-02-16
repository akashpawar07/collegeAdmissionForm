const signupModel = require('../models/signupModel');
const { setUser } = require("../services/auth");
const bcrypt = require("bcryptjs");

async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send(`
                <h1>All fields are required</h1>
                <a href="/signup">Go back to Signup</a>
            `);
        }

        const userExists = await signupModel.findOne({ email: email });
        if (userExists) {
            return res.status(422).send(`
                <h1>User already exists with this email</h1>
                <a href="/signup">Go back to Signup</a> 
            `);
        }

        // FIX 1: Changed salt rounds from 18 to 10 (Fast and perfectly secure)
        const hashedPassword = await bcrypt.hash(password, 10);

        // FIX 2: .create() automatically saves to MongoDB. No need for .save()
        const user = await signupModel.create({
            name,
            email,
            password: hashedPassword
        });

        console.log("Signup details saved successfully", user);
        return res.status(200).redirect('/login');

    } catch (err) {
        console.log("Error while saving signup details", err);
        return res.status(500).send("Internal Server Error");
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send(`
                    <h2>All fields are compulsory</h2>
                    <a href="/login">Go back to login Page</a>
            `);
        }

        const user = await signupModel.findOne({ email });

        if (!user) {
            return res.send(`
        <style>
            .alert-wrapper {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background-image: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('https://img.freepik.com/free-vector/leaves-background-color-year_23-2148380575.jpg?ga=GA1.1.919035732.1724917926&semt=ais_hybrid');
                background-size: cover; background-position: center;
                display: flex; justify-content: center; align-items: center;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                z-index: 9999; margin: 0; padding: 0;
            }
            .alert-card {
                background: rgba(30, 41, 59, 0.6);
                backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.2); border-top: 4px solid #dc2626;
                border-radius: 12px; padding: 40px 30px;
                text-align: center; max-width: 400px; width: 90%;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                color: white;
            }
            .alert-card h3 { margin: 0 0 10px 0; font-size: 1.4rem; font-weight: 600; color: #f87171; }
            .alert-card p { margin: 0 0 25px 0; font-size: 0.95rem; color: rgba(255, 255, 255, 0.8); line-height: 1.5; }
            .alert-btn {
                display: inline-block; padding: 10px 24px;
                background-color: #dc2626; color: white;
                text-decoration: none; border-radius: 6px;
                font-weight: bold; transition: all 0.2s ease; border: none;
            }
            .alert-btn:hover { background-color: #b91c1c; transform: translateY(-2px); }
        </style>
        
        <div class="alert-wrapper">
            <div class="alert-card">
                <h3>Login Failed</h3>
                <p>We couldn't find an account matching those credentials. Please double-check your email and password.</p>
                <a href="/login" class="alert-btn">Try Again</a>
            </div>
        </div>
    `);
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            console.log("Server response - Password did not match");
            return res.send(`
        <style>
            .alert-wrapper {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background-image: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('https://img.freepik.com/free-vector/leaves-background-color-year_23-2148380575.jpg?ga=GA1.1.919035732.1724917926&semt=ais_hybrid');
                background-size: cover; background-position: center;
                display: flex; justify-content: center; align-items: center;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                z-index: 9999; margin: 0; padding: 0;
            }
            .alert-card {
                background: rgba(30, 41, 59, 0.6);
                backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.2); border-top: 4px solid #dc2626;
                border-radius: 12px; padding: 40px 30px;
                text-align: center; max-width: 400px; width: 90%;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                color: white;
            }
            .alert-card h3 { margin: 0 0 10px 0; font-size: 1.4rem; font-weight: 600; color: #f87171; }
            .alert-card p { margin: 0 0 25px 0; font-size: 0.95rem; color: rgba(255, 255, 255, 0.8); line-height: 1.5; }
            .alert-btn {
                display: inline-block; padding: 10px 24px;
                background-color: #dc2626; color: white;
                text-decoration: none; border-radius: 6px;
                font-weight: bold; transition: all 0.2s ease; border: none;
            }
            .alert-btn:hover { background-color: #b91c1c; transform: translateY(-2px); }
        </style>
        
        <div class="alert-wrapper">
            <div class="alert-card">
                <h3>Login Failed</h3>
                <p>We couldn't find an account matching those credentials. Please double-check your email and password.</p>
                <a href="/login" class="alert-btn">Try Again</a>
            </div>
        </div>
    `);
        } else {
            const token = setUser(user);
            res.cookie('userToken', token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly: true
            });
            console.log('Server response - Password has matched');

            return res.redirect("/admin-dashboard"); // Double check this matches your actual route name!
        }

    } catch (error) {
        console.error("Login Error: ", error);
        return res.status(500).send("Internal Server Error");
    }
}

// FIX 3: Clean module exports (No DB connection code mixed in here!)
module.exports = {
    handleUserSignup,
    handleUserLogin
};