const { createLogger, format, transports } = require('winston');
require('dotenv').config()
const loggers =(loggerLevel, loggerPath) =>
 createLogger({
    transports:
        new transports.File({
            level: loggerLevel,
            filename: loggerPath,
        format:format.combine(
            format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
            format.align(),
            format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        )}),
    });
    const error_logger = loggers(process.env.ERROR_LEVEL, "./logs/error.log");
    const warn_logger = loggers(process.env.WARN_LEVEL, "./logs/warn.log");
    
    const logger = {
      error: (params) => {
        return error_logger.error(params);
      },
      warn: (params) => {
        return warn_logger.warn(params);
      },
    };
    
    module.exports = logger;