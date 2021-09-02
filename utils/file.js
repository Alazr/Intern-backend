const fs = require("fs")
const logger = require('../utils/loggerConfig')
const createDir = dirName =>{
    const cwdr = process.cwd()
    fs.mkdir(`${cwdr}/users/${dirName}`,{recursive:true},err=>{
        if(err)logger.error(err.message)
    })
}

const removeFile = file =>{
    fs.unlink(file.path, (err) => {
        if (err) {
            logger.error(err.message)
            return
        }
    })
} 

module.exports.removeFile = removeFile;
module.exports.createDir = createDir;
