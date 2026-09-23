import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  // Google Sheets API configuration
  GOOGLE_SHEETS_ID: process.env.GOOGLE_SHEETS_ID || '',
  GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
  GOOGLE_PRIVATE_KEY: (() => {
    const raw = process.env.GOOGLE_PRIVATE_KEY;
    if (!raw) return '';
    if (raw.startsWith('"') || raw.startsWith("'")) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        return raw.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');
      }
    }
    return raw.replace(/\\n/g, '\n');
  })(),
  
  // WhatsApp Notification Settings
  WHATSAPP_PHONE: process.env.WHATSAPP_PHONE || '+919478613001',
  ADMIN_NOTIFICATION_NUMBER: process.env.ADMIN_NOTIFICATION_NUMBER || '+919478613001',
  WHATSAPP_API_URL: process.env.WHATSAPP_API_URL || '',
  WHATSAPP_API_TOKEN: process.env.WHATSAPP_API_TOKEN || '',
  
  // Email Service (Resend & SMTP)
  RESEND_API_KEY: process.env.RESEND_API_KEY || '',
  EMAIL_FROM: process.env.EMAIL_FROM || 'WhiteCabz <onboarding@resend.dev>',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'info@whitecabz.com',
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: process.env.SMTP_PORT || 587,
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || '',

  // Cloudinary Storage Configuration
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'whitecabz',
};
