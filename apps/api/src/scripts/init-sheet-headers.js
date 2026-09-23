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

const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

console.log('--- WhiteCabz Auto Google Sheet Initializer ---');
console.log('Spreadsheet ID:', spreadsheetId);
console.log('Service Account:', email);

const HEADERS_MAP = {
  Bookings: [
    'Booking ID',
    'Created At',
    'Customer Name',
    'Phone Number',
    'WhatsApp',
    'Email',
    'Pickup Location',
    'Drop Destination',
    'Trip Type',
    'Travel Date',
    'Pickup Time',
    'Passengers',
    'Vehicle Preference',
    'Special Requirements',
    'Booking Status',
    'Payment Status',
    'Assigned Driver',
    'Driver Phone',
    'Cab Number',
    'Quoted Fare',
    'Discount / Coupon',
    'Customer Notes',
    'Internal Admin Notes',
    'Last Updated At',
  ],
  Enquiries: [
    'Enquiry ID',
    'Created At',
    'Customer Name',
    'Phone Number',
    'WhatsApp',
    'Email',
    'Interested Service',
    'Pickup Location',
    'Drop Destination',
    'Departure Date',
    'Trip Type',
    'Customer Message',
    'Source Channel',
    'Enquiry Status',
    'Assigned Coordinator',
    'Estimated Quote',
    'Follow-up Date',
    'Internal Notes',
  ],
  Notifications: [
    'Notification ID',
    'Booking / Enquiry ID',
    'Recipient Type',
    'Recipient Contact',
    'Channel',
    'Message Type',
    'Timestamp',
    'Delivery Status',
    'Error Details',
  ],
};

async function setupSheet() {
  if (!spreadsheetId || !email || !key) {
    console.error('Missing Google credentials in apps/api/.env');
    return;
  }

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId });
    const existingTitles = sheetMeta.data.sheets.map((s) => s.properties.title);
    console.log('Found existing tabs:', existingTitles.join(', '));

    // 1. Create missing sheets
    const requests = [];
    for (const sheetName of Object.keys(HEADERS_MAP)) {
      if (!existingTitles.includes(sheetName)) {
        requests.push({
          addSheet: {
            properties: { title: sheetName },
          },
        });
      }
    }

    if (requests.length > 0) {
      console.log(`Adding ${requests.length} missing tabs...`);
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: { requests },
      });
      console.log('Tabs created successfully.');
    }

    // 2. Populate Headers on each sheet
    for (const [sheetName, headers] of Object.entries(HEADERS_MAP)) {
      console.log(`Writing headers to tab "${sheetName}"...`);
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1:${String.fromCharCode(64 + headers.length)}1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [headers],
        },
      });
      console.log(`  ✓ Tab "${sheetName}" headers ready.`);
    }

    console.log('\n🎉 ALL GOOGLE SHEET HEADERS AND TABS ARE CONFIGURED AND READY FOR LIVE ENTRIES!');
  } catch (err) {
    console.error('Setup failed:', err.message);
    if (err.message.includes('The caller does not have permission')) {
      console.log(`\n👉 Make sure you shared edit permissions with: ${email}`);
    }
  }
}

setupSheet();
