import { v2 as cloudinary } from 'cloudinary';
import { ENV } from '../config/env.js';
import { logger } from '../utils/logger.js';

// Helper to ensure Cloudinary is configured with freshest env
export function getCloudinaryClient() {
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({ url: process.env.CLOUDINARY_URL, secure: true });
  } else {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || ENV.CLOUDINARY_CLOUD_NAME || '',
      api_key: process.env.CLOUDINARY_API_KEY || ENV.CLOUDINARY_API_KEY || '',
      api_secret: process.env.CLOUDINARY_API_SECRET || ENV.CLOUDINARY_API_SECRET || '',
      secure: true,
    });
  }
  return cloudinary;
}

export class CloudinaryService {
  /**
   * Test Cloudinary connection & credentials
   */
  static async ping() {
    try {
      const client = getCloudinaryClient();
      const result = await client.api.ping();
      logger.info({ status: result.status }, 'Cloudinary connection verified');
      return { success: true, status: result.status, cloudName: process.env.CLOUDINARY_CLOUD_NAME || ENV.CLOUDINARY_CLOUD_NAME };
    } catch (error) {
      logger.error({ error: error.message }, 'Cloudinary ping failed');
      return {
        success: false,
        error: error.message,
        hint: error.message?.includes('cloud_name mismatch')
          ? 'Cloud Name does not match this API Key/Secret. Please verify your Cloud Name from your Cloudinary Dashboard.'
          : error.message
      };
    }
  }

  /**
   * Upload an image (file path, base64 data URI, or remote URL) to Cloudinary
   */
  static async uploadImage(fileData, options = {}) {
    try {
      const client = getCloudinaryClient();
      const defaultOptions = {
        folder: 'whitecabz/fleet',
        resource_type: 'auto',
        transformation: [
          { quality: 'auto', fetch_format: 'auto' }
        ],
        ...options,
      };

      const result = await client.uploader.upload(fileData, defaultOptions);
      logger.info({ publicId: result.public_id, url: result.secure_url }, 'Image uploaded to Cloudinary');
      return {
        success: true,
        publicId: result.public_id,
        url: result.secure_url,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
      };
    } catch (error) {
      logger.error({ error: error.message }, 'Cloudinary upload failed');
      return { success: false, error: error.message };
    }
  }

  /**
   * Generate an optimized CDN URL with auto quality and formatting
   */
  static getOptimizedUrl(publicId, { width, height, crop = 'fill' } = {}) {
    if (!publicId) return '';
    const client = getCloudinaryClient();
    return client.url(publicId, {
      secure: true,
      quality: 'auto',
      fetch_format: 'auto',
      ...(width && { width }),
      ...(height && { height }),
      ...(width || height ? { crop } : {}),
    });
  }

  /**
   * Delete image by publicId
   */
  static async deleteImage(publicId) {
    try {
      const client = getCloudinaryClient();
      const result = await client.uploader.destroy(publicId);
      return { success: result.result === 'ok' };
    } catch (error) {
      logger.error({ error: error.message, publicId }, 'Cloudinary delete failed');
      return { success: false, error: error.message };
    }
  }
}

export const cloudinaryService = CloudinaryService;
