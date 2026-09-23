/**
 * Cloudinary Media Helper Utility for WhiteCabz
 */

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'whitecabz';

/**
 * Generate an optimized Cloudinary delivery URL
 * @param {string} publicId - The Cloudinary public ID or image path
 * @param {object} options - width, height, crop, format
 * @returns {string} Fully optimized image URL
 */
export function getCloudinaryImageUrl(publicId, { width, height, crop = 'fill', quality = 'auto', format = 'auto' } = {}) {
  if (!publicId) return '';
  if (publicId.startsWith('http://') || publicId.startsWith('https://') || publicId.startsWith('/')) {
    return publicId;
  }

  const transformations = [];
  if (format) transformations.push(`f_${format}`);
  if (quality) transformations.push(`q_${quality}`);
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop && (width || height)) transformations.push(`c_${crop}`);

  const transformString = transformations.join(',');
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformString}/${publicId}`;
}
