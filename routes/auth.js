const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const asyncMiddleware = require("../middleware/asyncMiddleware")


const route = express.Router()

route.post("/",asyncMiddleware(async (req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user)return res.status(400).send("Invalid emial or password")

    const isValid = await bcrypt.compare(password,user.password)
    if(!isValid)return res.status(400).send("Invalid emial or password")

    const token = user.generateAuthToken()
    res.send(token)
}))



module.exports = route