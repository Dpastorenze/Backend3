import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
