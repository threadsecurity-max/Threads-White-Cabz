import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
let key = process.env.GOOGLE_PRIVATE_KEY;
if (key && (key.startsWith('"') || key.startsWith("'"))) {
  try {
    key = JSON.parse(key);
  } catch (e) {
    key = key.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');
  }
} else if (key) {
  key = key.replace(/\\n/g, '\n');
}

const sheetId = process.env.GOOGLE_SHEETS_ID;

console.log('--- WhiteCabz Google Sheets Tracking Diagnostic ---');
console.log('Service Account Email:', email);
console.log('Google Sheet ID      :', sheetId || '[Not Set]');

if (!email || !key) {
  console.error('Google Service Account email or private key is missing in apps/api/.env');
  process.exit(1);
}

const auth = new google.auth.JWT({
  email: email,
  key: key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

auth.authorize(async (err, tokens) => {
  if (err) {
    console.error('✗ Authentication Failed:', err.message);
    return;
  }

  console.log('✓ Google Service Account Authenticated Successfully!');

  if (!sheetId) {
    console.log('\nTIP: Create a Google Sheet, copy its ID from the URL, set GOOGLE_SHEETS_ID in apps/api/.env, and share edit access with:\n' + email);
    return;
  }

  try {
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
    console.log(`✓ Connected to Google Sheet: "${res.data.properties.title}"`);
    console.log(`  Sheets / Tabs found: ${res.data.sheets.map((s) => s.properties.title).join(', ')}`);
  } catch (sheetErr) {
    console.warn('\nNotice on Sheet Access:', sheetErr.message);
    console.log(`\n👉 ACTION REQUIRED TO SYNC:`);
    console.log(`1. Open your Google Sheet in browser: https://docs.google.com/spreadsheets/d/${sheetId}`);
    console.log(`2. Click "Share" (top right button).`);
    console.log(`3. Add "${email}" as an Editor.`);
  }
});
