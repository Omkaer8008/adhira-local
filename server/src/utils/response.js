// src/utils/response.js
const successResponse = (res, message, data = null, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  };
  
  const errorResponse = (res, message, statusCode = 500, errors = null) => {
    return res.status(statusCode).json({
      success: false,
      message,
      errors: process.env.NODE_ENV === 'development' ? errors : undefined
    });
  };
  
  module.exports = {
    successResponse,
    errorResponse
  };