const express = require("express")
const user = require("../routes/users") 
const auth = require("../routes/auth")
const error =  require("../middleware/error")
const cors = require("cors")

module.exports = function(app){
    app.use(cors())
    app.use(express.json())
    app.use("/users",user)
    app.use("/auth",auth)
    app.use(error)
}