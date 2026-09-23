import express from 'express';
import { CloudinaryService } from '../services/cloudinary.service.js';
import { ENV } from '../config/env.js';

const router = express.Router();

/**
 * GET /api/upload/status
 * Check Cloudinary credentials status
 */
router.get('/status', async (req, res) => {
  const result = await CloudinaryService.ping();
  return res.json({
    service: 'Cloudinary Asset CDN',
    configured: Boolean(ENV.CLOUDINARY_API_KEY && ENV.CLOUDINARY_API_SECRET),
    ...result,
  });
});

/**
 * POST /api/upload
 * Upload image (Base64 data or image URL) to Cloudinary
 */
router.post('/', async (req, res) => {
  const { file, folder, tags } = req.body;

  if (!file) {
    return res.status(400).json({
      success: false,
      message: 'No image data or URL provided. Pass "file" as base64 string or remote URL.',
    });
  }

  const uploadResult = await CloudinaryService.uploadImage(file, {
    folder: folder || 'whitecabz/uploads',
    tags: tags || ['whitecabz'],
  });

  if (!uploadResult.success) {
    return res.status(500).json({
      success: false,
      message: 'Failed to upload image to Cloudinary',
      error: uploadResult.error,
    });
  }

  return res.status(201).json({
    success: true,
    message: 'Image successfully uploaded to Cloudinary CDN',
    data: uploadResult,
  });
});

export default router;
