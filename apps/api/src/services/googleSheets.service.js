import { google } from 'googleapis';
import { ENV } from '../config/env.js';
import { SHEET_NAMES, BOOKING_STATUS } from '../config/constants.js';
import { logger } from '../utils/logger.js';

class GoogleSheetsService {
  constructor() {
    this.sheets = null;
    this.isConfigured = false;
    this.memoryStore = {
      bookings: [],
      enquiries: [],
      customers: [],
      notifications: [],
    };
    this.initialize();
  }

  initialize() {
    try {
      const email = ENV.GOOGLE_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
      const sheetId = ENV.GOOGLE_SHEETS_ID || process.env.GOOGLE_SHEETS_ID;
      const key = ENV.GOOGLE_PRIVATE_KEY;

      if (sheetId && email && key) {
        const auth = new google.auth.JWT({
          email: email,
          key: key,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        this.sheets = google.sheets({ version: 'v4', auth });
        this.isConfigured = true;
        logger.info('Google Sheets API service initialized successfully.');
      } else {
        logger.warn('Google Sheets credentials not fully configured in ENV. Running with operational memory/fallback store.');
      }
    } catch (error) {
      logger.error({ err: error.message }, 'Failed to initialize Google Sheets service. Using fallback operational store.');
    }
  }

  async appendRow(sheetName, values) {
    if (!this.isConfigured) {
      this.initialize();
    }

    if (this.isConfigured && this.sheets) {
      try {
        const sheetId = ENV.GOOGLE_SHEETS_ID || process.env.GOOGLE_SHEETS_ID;
        await this.sheets.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: `${sheetName}!A:Z`,
          valueInputOption: 'USER_ENTERED',
          insertDataOption: 'INSERT_ROWS',
          requestBody: {
            values: [values],
          },
        });
        logger.info({ sheetName }, 'Row successfully synced to Google Sheet');
        return true;
      } catch (err) {
        logger.warn({ err: err.message, sheetName }, 'Notice: Google Sheet row sync failed (check sheet permissions). Stored in operational memory.');
        return false;
      }
    }
    return false;
  }

  async createBooking(booking) {
    const timestamp = new Date().toISOString();
    const row = [
      booking.bookingId,
      timestamp,
      booking.name,
      booking.phone,
      booking.whatsapp || booking.phone,
      booking.email || '',
      booking.pickup,
      booking.destination,
      booking.tripType,
      booking.date,
      booking.time,
      booking.passengers || 1,
      booking.vehiclePreference || 'Any',
      booking.specialRequirements || '',
      booking.status || BOOKING_STATUS.NEW,
      'Pending',
      'Unassigned',
      '',
      '',
      '',
      '',
      booking.customerNotes || '',
      '',
      timestamp,
    ];

    this.memoryStore.bookings.unshift({
      ...booking,
      createdAt: timestamp,
      status: booking.status || BOOKING_STATUS.NEW,
    });

    await this.appendRow(SHEET_NAMES.BOOKINGS, row);
    return booking;
  }

  async getBooking(bookingId) {
    const booking = this.memoryStore.bookings.find(
      (b) => b.bookingId.toLowerCase() === bookingId.toLowerCase()
    );
    return booking || null;
  }

  async createEnquiry(enquiry) {
    const timestamp = new Date().toISOString();
    const row = [
      enquiry.enquiryId,
      timestamp,
      enquiry.name,
      enquiry.phone,
      enquiry.whatsapp || enquiry.phone,
      enquiry.email || '',
      enquiry.service || 'General',
      enquiry.pickup || '',
      enquiry.destination || '',
      enquiry.date || '',
      enquiry.tripType || '',
      enquiry.message || '',
      enquiry.source || 'Website',
      'New',
      '',
      '',
      '',
      enquiry.notes || '',
    ];

    this.memoryStore.enquiries.unshift({
      ...enquiry,
      createdAt: timestamp,
      status: 'New',
    });

    await this.appendRow(SHEET_NAMES.ENQUIRIES, row);
    return enquiry;
  }

  async logNotification(data) {
    const timestamp = new Date().toISOString();
    const notificationId = `NOTIF-${Date.now()}`;
    const row = [
      notificationId,
      data.bookingId || '',
      data.recipientType,
      data.recipient,
      data.channel,
      data.messageType,
      timestamp,
      data.status || 'SENT',
      data.error || '',
    ];

    this.memoryStore.notifications.push({
      notificationId,
      ...data,
      sentAt: timestamp,
    });

    await this.appendRow(SHEET_NAMES.NOTIFICATIONS, row);
    return { notificationId, success: true };
  }
}

export const googleSheetsService = new GoogleSheetsService();
