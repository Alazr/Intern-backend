const winston = require("winston")

const logConfiguration = {
   
    'transports': [
        new winston.transports.File({
            level:"error",
            filename: 'logs/logfile.log'
        })
    ]
};

const logger = winston.createLogger(logConfiguration)

module.exports = logger