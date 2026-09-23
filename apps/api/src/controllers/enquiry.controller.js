import { generateEnquiryId } from '../utils/bookingId.js';
import { googleSheetsService } from '../services/googleSheets.service.js';
import { notificationService } from '../services/notification.service.js';
import { logger } from '../utils/logger.js';

export const createEnquiry = async (req, res, next) => {
  try {
    const enquiryId = generateEnquiryId();
    const enquiryData = {
      ...req.body,
      enquiryId,
    };

    const savedEnquiry = await googleSheetsService.createEnquiry(enquiryData);

    // If travel details are provided, also dispatch email confirmation
    try {
      await notificationService.notifyNewBooking({
        bookingId: enquiryId,
        name: enquiryData.name,
        phone: enquiryData.phone,
        email: enquiryData.email,
        pickup: enquiryData.pickup || 'Direct Inquiry',
        destination: enquiryData.destination || 'Direct Inquiry',
        date: enquiryData.departureDate || new Date().toISOString().split('T')[0],
        time: enquiryData.departureTime || 'Flexible',
        tripType: enquiryData.tripType || enquiryData.service || 'Outstation Taxi',
        vehiclePreference: enquiryData.vehiclePreference || 'Standard / Executive',
        passengers: enquiryData.passengers || 1,
        specialRequirements: enquiryData.message || `Service: ${enquiryData.service || 'Enquiry'}`,
      });
    } catch (notifErr) {
      logger.error({ notifErr, enquiryId }, 'Failed to dispatch notification for enquiry');
    }

    logger.info({ enquiryId }, 'Enquiry submitted and dispatched successfully');

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. A WhiteCabz coordinator will contact you shortly.',
      data: {
        enquiryId: savedEnquiry.enquiryId,
      },
    });
  } catch (error) {
    next(error);
  }
};
