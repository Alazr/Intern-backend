const express = require("express")
const logger = require("./utils/loggerConfig")
const app = express()

require("./apps/routes")(app)
require("./apps/db")()
require("./apps/prod")(app)

process.on("uncaughtException",ex=>{
    logger.error(ex.message,ex)
})
process.on("unhandledRejection",ex=>{
    logger.error(ex.message,ex)
})


const port = process.env.PORT || 3000 
app.listen(port,()=>{
    logger.info(`Listening on port ${port}`)
})
