export const DEFAULT_PHONE = '+919478613001';
export const DISPLAY_PHONE = '+91 94786 13001';
export const DISPLAY_EMAIL = 'info@whitecabz.com';

export function getWhatsAppUrl(params = {}) {
  const cleanPhone = DEFAULT_PHONE.replace(/[^0-9]/g, '');

  if (typeof params === 'string') {
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(params)}`;
  }

  const {
    bookingId,
    pickup,
    destination,
    date,
    time,
    passengers,
    tripType,
    vehiclePreference,
    notes,
    name,
    phone,
  } = params;

  let message = `Hello WhiteCabz, I would like to book a cab with your service.\n\n`;

  if (name) message += `*Name:* ${name}\n`;
  if (phone) message += `*Phone:* ${phone}\n`;
  if (pickup) message += `*Pickup Location:* ${pickup}\n`;
  if (destination) message += `*Drop Location:* ${destination}\n`;
  if (tripType) message += `*Trip Type:* ${tripType}\n`;
  if (vehiclePreference) message += `*Preferred Vehicle:* ${vehiclePreference}\n`;
  if (date) message += `*Date:* ${date}\n`;
  if (time) message += `*Time:* ${time}\n`;
  if (passengers) message += `*Passengers:* ${passengers}\n`;
  if (bookingId) message += `*Reference ID:* ${bookingId}\n`;
  if (notes) message += `*Requirements / Notes:* ${notes}\n`;

  message += `\nPlease confirm vehicle availability and the best fare quote. Thank you!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function getCallUrl() {
  return `tel:${DEFAULT_PHONE}`;
}

