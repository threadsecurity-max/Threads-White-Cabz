import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error({ err, path: req.path, method: req.method }, 'Unhandled API error occurred');

  res.status(err.status || 500).json({
    success: false,
    message: "We're having trouble processing your request right now. Please call or WhatsApp WhiteCabz directly at +91 98765 43210.",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};
