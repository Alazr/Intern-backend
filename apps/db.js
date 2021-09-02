const logger = require("../utils/loggerConfig")
const mongoose = require("mongoose")


module.exports = function(){
    mongoose.connect("mongodb://localhost/intern")
    .then(()=>logger.info("Connected to MongoDB"))
}