import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY || '534736738479736';
const apiSecret = process.env.CLOUDINARY_API_SECRET || 'z0AqSe-Rm3M4JjQxFxaTf16KF24';

console.log('--- WhiteCabz Cloudinary Asset Sync Tool ---');
console.log(`Cloud Name : ${cloudName || '[Not set]'}`);
console.log(`API Key    : ${apiKey}`);

if (!cloudName || cloudName === 'whitecabz') {
  console.log('\nNOTE: If you see "cloud_name mismatch", update CLOUDINARY_CLOUD_NAME in apps/api/.env with your exact Cloudinary Cloud Name (visible in your Cloudinary Dashboard).');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

async function syncAssets() {
  const imagesDir = path.resolve(__dirname, '../../../web/public/images');
  if (!fs.existsSync(imagesDir)) {
    console.error(`Images directory not found at: ${imagesDir}`);
    return;
  }

  const files = fs.readdirSync(imagesDir);
  console.log(`Found ${files.length} assets to sync in ${imagesDir}\n`);

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.webp', '.svg'].includes(ext)) continue;

    const publicId = path.basename(file, ext).replace(/\s+/g, '_').toLowerCase();

    try {
      console.log(`Uploading [${file}] -> whitecabz/${publicId}...`);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'whitecabz',
        public_id: publicId,
        overwrite: true,
        resource_type: 'auto',
      });
      console.log(`  ✓ Success: ${result.secure_url}`);
    } catch (err) {
      console.error(`  ✗ Failed to upload ${file}: ${err.message}`);
    }
  }

  console.log('\n--- Asset Sync Completed ---');
}

syncAssets();
