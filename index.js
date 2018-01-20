'use strict';
const winston = require('winston');
const path = require('path');
const fs = require('fs');
require('winston-daily-rotate-file');

const logger = function(configuration){
    const logDirectory = configuration.path || path.join(__dirname, '../','../','logs');
    const fileName = configuration.fileName || "logfile.log";
    
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
    
    const customFileFormatter = function(options) {
        return options.timestamp() +' ['+ options.level.toUpperCase() +'] '+ (undefined !== options.message ? options.message : '') +
         (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
    }

    const timestamp = function() {
        const d = new Date().toISOString();
        return d;
    };

    const transport = new (winston.transports.DailyRotateFile)({
        filename: path.join(logDirectory, fileName),
        datePattern: 'yyyy-MM-dd.',
        prepend: true,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        timestamp: timestamp,
        formatter: customFileFormatter,
        json:false
      });
    
    const logger = new (winston.Logger)({             
    transports: [
        transport
    ]
    });
      
    const accesslog = function(req,res,next){
        logger.log('info',"Request protocol:[%s], request type:[%s], request path:[%s], request headers:[%s]",req.protocol,req.method,req.path,JSON.stringify(req.headers));
        
        next();
    };

    return {
        logger: logger,
        accesslog: accesslog,
        log: logger.log.bind(logger),
        info: logger.info.bind(logger),
        debug: logger.debug.bind(logger),
        error: logger.error.bind(logger),
        warn: logger.warn.bind(logger)
    }
};

module.exports = logger;