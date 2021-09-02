const multer = require("multer")
const {getUser} = require("../middleware/auth")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    
        let user = getUser(req.headers["x-auth-token"])
        if(user){
            cb(null, `users/${user}`)
        }else{
            cb(null, `public`)
        }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
const  upload = multer({ storage: storage }).single('file')


module.exports = upload