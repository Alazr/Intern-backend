const logger = require("../utils/loggerConfig")
const mongoose = require("mongoose")
require("dotenv/config")

module.exports = function(){
    mongoose.connect(process.env.db)
    .then(()=>logger.info("Connected to MongoDB"))
}