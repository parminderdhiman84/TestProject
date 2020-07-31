
const logger = require("pino")({ 
level: "trace" 
}); 
const expressLogger = require("express-pino-logger")({ 
logger 
}); 

module.exports = {
    expressLogger,
    logger 
  };
