import { ENV } from '../config/env.js';

export class WhatsAppService {
  static generateCustomerBookingLink(booking) {
    const phone = ENV.WHATSAPP_PHONE.replace(/[^0-9]/g, '');
    let message = `Hello WhiteCabz, I would like to book a cab with your service.\n\n`;

    if (booking.name) message += `*Name:* ${booking.name}\n`;
    if (booking.phone) message += `*Phone:* ${booking.phone}\n`;
    if (booking.pickup) message += `*Pickup Location:* ${booking.pickup}\n`;
    if (booking.destination) message += `*Drop Location:* ${booking.destination}\n`;
    if (booking.tripType) message += `*Trip Type:* ${booking.tripType}\n`;
    if (booking.vehiclePreference) message += `*Preferred Vehicle:* ${booking.vehiclePreference}\n`;
    if (booking.date) message += `*Date:* ${booking.date}\n`;
    if (booking.time) message += `*Time:* ${booking.time}\n`;
    if (booking.passengers) message += `*Passengers:* ${booking.passengers}\n`;
    if (booking.bookingId) message += `*Reference ID:* ${booking.bookingId}\n`;
    if (booking.specialRequirements) message += `*Requirements / Notes:* ${booking.specialRequirements}\n`;

    message += `\nPlease confirm vehicle availability and the best fare quote. Thank you!`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encoded}`;
  }

  static generateDirectChatLink(customText) {
    const phone = ENV.WHATSAPP_PHONE.replace(/[^0-9]/g, '');
    const defaultText = customText || 'Hello WhiteCabz, I would like to enquire about your premium cab and taxi services.';
    return `https://wa.me/${phone}?text=${encodeURIComponent(defaultText)}`;
  }
}
