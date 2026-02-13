import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const errorResponse = {
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    errorResponse.message = 'Validation Error';
    errorResponse.errors = {};
    
    Object.keys(err.errors).forEach((key) => {
      errorResponse.errors[key] = err.errors[key].message;
    });
    
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  // Handle duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    errorResponse.message = `${field} already exists`;
    return res.status(StatusCodes.CONFLICT).json(errorResponse);
  }

  // Handle CastError (e.g., invalid ObjectId)
  if (err.name === 'CastError') {
    errorResponse.message = 'Resource not found';
    return res.status(StatusCodes.NOT_FOUND).json(errorResponse);
  }

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
