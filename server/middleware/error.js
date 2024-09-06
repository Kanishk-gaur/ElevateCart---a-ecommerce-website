const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500;
   err.message = err.message || "Internal server error";

   //mongodberror Cast error
   if (err.name === "CastError") {
      const message = `Resource Not found.Invalid:${err.path}`;
      err = new ErrorHandler(message, 400);
   }

   //Mongoore duplicate Key Error
   if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.KeyValue)} Entered`
      err = new ErrorHandler(message, 400);
   }

   //Wrong Jwt error
   if (err.name === "JsonWebTokenError") {
      const message = `Json Web Token is invalid,try Again`;
      err = new ErrorHandler(message, 400);
   }

   //Jwt expire Error
   if (err.name === "TokenExpiredError") {
      const message = `Json Web Token is Expired,try Again`;
      err = new ErrorHandler(message, 400);
   }

   res.status(err.statusCode).json({
      success: false,
      message: err.message,
   })
}