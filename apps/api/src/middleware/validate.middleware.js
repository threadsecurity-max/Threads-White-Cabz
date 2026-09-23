import { z } from 'zod';
import { logger } from '../utils/logger.js';

/**
 * Strips HTML tags and dangerous characters to prevent XSS injection
 */
export function sanitizeString(val) {
  if (typeof val !== 'string') return val;
  return val
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Strip control characters
    .trim();
}

/**
 * Validates and normalizes phone numbers
 */
export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const digitsOnly = phone.replace(/\D/g, '');
  // Must be 10 to 15 digits
  if (digitsOnly.length < 10 || digitsOnly.length > 15) return false;
  // Reject repetitive fake numbers (e.g. 0000000000, 1111111111, 9999999999)
  if (/^(\d)\1{9,}$/.test(digitsOnly)) return false;
  return true;
}

/**
 * Generic Request Validator with Honeypot Spam Prevention & Sanitization
 */
export const validate = (schema) => async (req, res, next) => {
  try {
    // 1. Honeypot Bot Detection
    // If hidden bot fields (e.g., website, url, hp_field) are filled by automated scrapers, silently return 200 OK without processing
    const honeypot = req.body.website || req.body.hp_field || req.body.bot_token;
    if (honeypot) {
      logger.warn({ ip: req.ip }, 'Spam bot submission blocked via honeypot trap');
      return res.status(200).json({
        success: true,
        message: 'Request received successfully',
      });
    }

    // 2. Sanitize all string fields in body
    const sanitizedBody = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string') {
        sanitizedBody[key] = sanitizeString(value);
      } else {
        sanitizedBody[key] = value;
      }
    }

    // 3. Validate with Zod Schema
    const validated = await schema.parseAsync(sanitizedBody);
    req.body = validated;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      logger.warn({ errors: formattedErrors, path: req.originalUrl }, 'Input validation failed');

      return res.status(400).json({
        success: false,
        message: 'Invalid input data. Please check your submission details.',
        errors: formattedErrors,
      });
    }
    next(error);
  }
};
