import { error } from '../../utils/response.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err?.stack || err);
  if (res.headersSent) return next(err);
  return error(res, err.message || 'Internal Server Error', err.status || 500);
};
