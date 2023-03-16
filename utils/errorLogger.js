const winston = require('winston')

const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: "logs.json", level: "info" }),
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
});

module.exports = logger