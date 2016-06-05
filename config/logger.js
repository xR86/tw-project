var winston = require('winston');
var RotaryFile = require('winston-daily-rotate-file');
var fs = require('fs');

var logDir = '././log/';
var logName = 'server.log';

if(!fs.existsSync(logDir)){
  fs.mkdirSync(logDir, 0766, function(err){
    if(err){
      console.error(err);
    }
  });
}

var logger = new winston.Logger({
  // Configure the outpur type of the logging
  transports: [
    new (winston.transports.Console)({level: "silly"}),

    new (RotaryFile)({
      datePattern: '-dd-MM-yyyy',
      filename: logDir + logName,
      level: "silly",
      json: false,
      timestamp: true
    })
  ]
});


module.exports = logger;
module.exports.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
};