const logger = require("../utils/loggerConfig")

module.exports = function error(err,req,res,next){
    logger.error(err.message,err)
    res.send(500).send("Something failed.")
} 
