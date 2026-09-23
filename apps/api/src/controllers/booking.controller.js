import { generateBookingId } from '../utils/bookingId.js';
import { googleSheetsService } from '../services/googleSheets.service.js';
import { notificationService } from '../services/notification.service.js';
import { WhatsAppService } from '../services/whatsapp.service.js';
import { BOOKING_STATUS } from '../config/constants.js';
import { logger } from '../utils/logger.js';

export const createBooking = async (req, res, next) => {
  try {
    const bookingId = generateBookingId();
    const bookingData = {
      ...req.body,
      bookingId,
      status: BOOKING_STATUS.NEW,
    };

    // 1. Record in Google Sheets (or fallback store)
    const savedBooking = await googleSheetsService.createBooking(bookingData);

    // 2. Dispatch notifications
    await notificationService.notifyNewBooking(savedBooking);

    // 3. Generate prefilled WhatsApp deep link for traveller
    const whatsappLink = WhatsAppService.generateCustomerBookingLink(savedBooking);

    logger.info({ bookingId }, 'Booking successfully created and recorded');

    res.status(201).json({
      success: true,
      message: 'Your booking request has been received.',
      data: {
        bookingId: savedBooking.bookingId,
        pickup: savedBooking.pickup,
        destination: savedBooking.destination,
        date: savedBooking.date,
        time: savedBooking.time,
        tripType: savedBooking.tripType,
        passengers: savedBooking.passengers,
        vehiclePreference: savedBooking.vehiclePreference,
        status: savedBooking.status,
        whatsappLink,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await googleSheetsService.getBooking(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID ${id} not found. Please contact WhiteCabz support.`,
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};
