const { getUser } = require("../services/auth");
const {renderAlreadyLoggedIn } = require("../services/authMessageContainer")

// 1. Middleware for PRIVATE routes (Admin Dashboard)
async function loggedinUserOnly(req, res, next) {
    try {
        const userToken = req.cookies?.userToken;
        const user = await getUser(userToken);

        if (!userToken || !user) return res.redirect("/login");

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}





// 2. Middleware for PUBLIC routes (Login / Register pages)
async function preventLoggedinUser(req, res, next) {
    try {
        const userToken = req.cookies?.userToken;

        if (userToken) {
            const user = await getUser(userToken);

            // If the token is valid and user exists, block them with an alert
            if (user) {
                // Now beautifully clean!
                return res.send(renderAlreadyLoggedIn());
            }
        }

        next();
    } catch (error) {
        console.error(error);
        next(); // Added next() here so your app doesn't hang if there's an error decoding the token!
    }
}



module.exports = {
    loggedinUserOnly,
    preventLoggedinUser
};