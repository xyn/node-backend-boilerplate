const winston = require('winston');

module.exports = function () {
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
            winston.format.json()
        ),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp({
                        format: 'MMM-DD-YYYY HH:mm:ss'
                    }),
                    winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
                )
            })
        ],
    });
    winston.add(logger);
}