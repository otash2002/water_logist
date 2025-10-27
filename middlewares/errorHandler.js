import { error } from '../utils/response.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return error(res, 'Validation Error', 400, err.errors);
  }
  
  if (err.name === 'CastError') {
    return error(res, 'Invalid ID format', 400);
  }
  
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return error(res, `${field} already exists`, 409);
  }
  
  return error(res, err.message || 'Internal Server Error', err.status || 500);
};
