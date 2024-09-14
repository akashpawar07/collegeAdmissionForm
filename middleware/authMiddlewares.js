const { getUser } = require("../services/auth")

async function loggedinUserOnly(req, res, next) {
    try {
        const userToken = req.cookies?.userToken; // Use req.cookies instead of req.cookie
       
        if (!userToken) return res.redirect("/login");

        const user = await getUser(userToken); // Await the getUser function
        if (!user) return res.redirect("/login");
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    loggedinUserOnly,
}