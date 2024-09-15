const jwt = require('jsonwebtoken');
// const secrete = "radhekrishn"


function setUser(user){
    // const paylaod = {
    //    _id: user._id,
    //    email : user.email
    // };
     return jwt.sign(
        {id : user._id,email : user.email}, // paylaod
        process.env.SECRETE_KEY,  //secrete key
       
    )
}

function getUser(token){
    if(!token) return null
    try {
        return jwt.verify(token, process.env.SECRETE_KEY)
        console.log("user verified successfully")
    } catch (error) {
        return null;
    }
 
}

module.exports = {
    setUser,
    getUser
}