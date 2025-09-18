// src/middlewares/error.middleware.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // Prisma errors
    if (err.code && err.code.startsWith('P')) {
      return res.status(400).json({
        success: false,
        message: 'Database error occurred',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  
    // JWT errors
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }
  
    // Default error
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  };
  
  module.exports = {
    errorHandler
  };