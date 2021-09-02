const express = require("express")
const bcrypt = require("bcrypt")
const _ = require("lodash")
const upload = require('../utils/multer')
const {auth} = require("../middleware/auth")
const {removeFile,createDir} =require("../utils/file")
const User = require("../models/user")
const asyncMiddleware = require("../middleware/asyncMiddleware")

const route = express.Router()

route.post("/",async(req,res)=>{
    const {name,email,password} = req.body

    let user = await User.findOne({email})
    if(user)return res.status(400).send("User is already registered")

    user = new User({
        name,
        email,
        password
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password,salt)

    user = await user.save()

    createDir(name)

    const token = user.generateAuthToken()

    res.header("x-auth-token", token)
    .header("access-control-expose-headers","x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]))
})

route.get("/:userId/resources",asyncMiddleware(async (req,res)=>{
    const user = await User.findById(req.params.userId)
    if(!user)return res.status(404).send("User with the given was not found")
    res.send(user.resources)   
}));
route.post('/:userId/resources',auth, asyncMiddleware((req, res) =>{
    upload(req, res, async err => {
           if (err) {
               return res.status(500).json(err)
           }
           let user = await User.findById({_id:req.params.userId})
           if(!req.file)return res.status(400).send("Invalid file")
           
           user.resources.push(req.file)
           user = await user.save()
            return res.status(200).send(user.resources)
    })

}));
route.delete("/:userId/resources/",asyncMiddleware(async (req,res)=>{
    const user = await User.findById(req.params.userId)
    if(!user)return res.status(404).send("User with the given was not found")

    const {resources} = user

    for (let i=0; i<=resources.length;i++){
        removeFile(resources[i])
        resources[i].remove()
    }

    await user.save()
    res.send(resources)
}))
route.get("/:userId/resources/:fileId",asyncMiddleware(async (req,res)=>{
    const user = await User.findById(req.params.userId)
    if(!user)return res.status(404).send("User with the given was not found")

    const file = user.resources.id(req.params.fileId)
    if(!file)return res.status(404).send("File with the given was not found")
    res.send(file)
}))
route.delete("/:userId/resources/:fileId",asyncMiddleware(async (req,res)=>{
    const user = await User.findById(req.params.userId)
    if(!user)return res.status(404).send("User with the given was not found")

    const file = user.resources.id(req.params.fileId)
    if(!file)return res.status(404).send("File with the given was not found")

    // // removing the file data from db
    file.remove()
    
    // removing the actual file from dir
    removeFile(file)
    
    await user.save()
    res.send(file)
}))

module.exports = route