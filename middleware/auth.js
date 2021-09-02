const jwt = require("jsonwebtoken")
require("dotenv/config")

function auth(req,res,next){
    const token = req.header("x-auth-token")
    if(!token)return res.status(401).send("Access denied. no token provided")
    
    try {
        getUser(token)
        next()
    } catch (error) {
        res.status(400).send("invalid token")
    }
}

function getUser(token){
    const decode = jwt.verify(token,process.env.JwtPrivateKey)
    return decode.name
}

module.exports.auth = auth;
module.exports.getUser = getUser