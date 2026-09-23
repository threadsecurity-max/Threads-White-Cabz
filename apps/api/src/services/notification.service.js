import { googleSheetsService } from './googleSheets.service.js';
import { emailService } from './email.service.js';
import { logger } from '../utils/logger.js';
import { ENV } from '../config/env.js';

class NotificationService {
  async notifyNewBooking(booking) {
    logger.info({ bookingId: booking.bookingId }, 'Dispatching new booking notifications');

    // Dispatch Resend Email Notifications (Thank You to Customer + Alert to Admin)
    try {
      await emailService.sendBookingConfirmationEmail(booking);
    } catch (emailErr) {
      logger.error({ emailErr, bookingId: booking.bookingId }, 'Failed to dispatch booking emails via Resend');
    }

    // 1. Admin/Coordinator notification payload
    const adminMessage = `🚕 NEW WHITECABZ BOOKING\n\nBooking ID: ${booking.bookingId}\n\nCustomer: ${booking.name}\nPhone: ${booking.phone}\nRoute: ${booking.pickup} → ${booking.destination}\nDate: ${booking.date}\nTime: ${booking.time}\nTrip: ${booking.tripType}\nPassengers: ${booking.passengers}\nVehicle: ${booking.vehiclePreference || 'Standard'}\nStatus: NEW`;
    
    // Log Admin Notification
    await googleSheetsService.logNotification({
      bookingId: booking.bookingId,
      recipientType: 'Admin',
      recipient: ENV.ADMIN_NOTIFICATION_NUMBER,
      channel: 'WhatsApp',
      messageType: 'NEW_BOOKING_ALERT',
      status: 'SENT',
    });

    // 2. Traveller Notification payload
    const travellerMessage = `Hello ${booking.name},\n\nYour WhiteCabz booking request has been received.\n\nBooking ID: ${booking.bookingId}\nRoute: ${booking.pickup} → ${booking.destination}\nDate: ${booking.date}\nPickup: ${booking.time}\n\nOur coordinator will contact you shortly to confirm the booking and vehicle details.\n\nThank you,\nWhiteCabz`;

    // Log Traveller Notification
    await googleSheetsService.logNotification({
      bookingId: booking.bookingId,
      recipientType: 'Traveller',
      recipient: booking.phone,
      channel: 'WhatsApp',
      messageType: 'BOOKING_REQUEST_RECEIVED',
      status: 'SENT',
    });

    return {
      adminMessage,
      travellerMessage,
      status: 'DISPATCHED',
    };
  }

  async notifyStatusChange(booking, newStatus) {
    logger.info({ bookingId: booking.bookingId, newStatus }, 'Booking status updated notification');

    let travellerMessage = '';
    if (newStatus === 'Confirmed') {
      travellerMessage = `Hello ${booking.name},\n\nYour WhiteCabz booking (${booking.bookingId}) has been confirmed! Our coordinator will assign your driver shortly.\n\nRoute: ${booking.pickup} → ${booking.destination}\nDate: ${booking.date}\nTime: ${booking.time}\n\nThank you for choosing WhiteCabz.`;
    } else if (newStatus === 'Driver Assigned') {
      travellerMessage = `Hello ${booking.name},\n\nYour driver for WhiteCabz booking (${booking.bookingId}) has been assigned.\n\nDriver: ${booking.driver || 'Assigned Chauffeur'}\nVehicle: ${booking.vehicle || booking.vehiclePreference}\nDriver Contact: ${booking.driverPhone || 'Shared via coordinator'}\n\nHave a safe journey!`;
    }

    if (travellerMessage) {
      await googleSheetsService.logNotification({
        bookingId: booking.bookingId,
        recipientType: 'Traveller',
        recipient: booking.phone,
        channel: 'WhatsApp',
        messageType: `STATUS_${newStatus.toUpperCase().replace(/\s+/g, '_')}`,
        status: 'SENT',
      });
    }

    return { success: true };
  }
}

export const notificationService = new NotificationService();
