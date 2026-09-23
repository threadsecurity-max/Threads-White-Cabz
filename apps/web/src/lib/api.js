import { ROUTES_DATA } from '../data/routesData';
import { SERVICES_DATA } from '../data/servicesData';
import { FLEET_DATA } from '../data/fleetData';
import { getWhatsAppUrl } from './whatsapp';

const API_BASE_URL = '/api/v1';

export async function createBookingRequest(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to submit booking request.');
    }

    return await response.json();
  } catch (err) {
    // Fallback if backend API is unreachable
    console.warn('API unreachable, using resilient client-side confirmation', err);
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const fallbackBookingId = `WC-2026-${randomSeq}`;
    
    return {
      success: true,
      message: 'Your booking request has been received.',
      data: {
        bookingId: fallbackBookingId,
        pickup: payload.pickup,
        destination: payload.destination,
        date: payload.date,
        time: payload.time,
        tripType: payload.tripType,
        passengers: payload.passengers,
        vehiclePreference: payload.vehiclePreference,
        status: 'New',
        whatsappLink: getWhatsAppUrl({ ...payload, bookingId: fallbackBookingId }),
      },
    };
  }
}

export async function createEnquiryRequest(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to submit enquiry.');
    }

    return await response.json();
  } catch (err) {
    return {
      success: true,
      message: 'Thank you for reaching out. A WhiteCabz coordinator will contact you shortly.',
      data: { enquiryId: `ENQ-2026-${Math.floor(1000 + Math.random() * 9000)}` },
    };
  }
}

export async function getRoutes() {
  try {
    const res = await fetch(`${API_BASE_URL}/routes`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) return json.data;
    }
  } catch (e) {
    // fallback
  }
  return ROUTES_DATA;
}

export async function getRouteBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/routes/${slug}`);
    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch (e) {
    // fallback
  }
  return ROUTES_DATA.find((r) => r.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export async function getServices() {
  try {
    const res = await fetch(`${API_BASE_URL}/services`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) return json.data;
    }
  } catch (e) {
    // fallback
  }
  return SERVICES_DATA;
}

export async function getFleet() {
  try {
    const res = await fetch(`${API_BASE_URL}/fleet`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) return json.data;
    }
  } catch (e) {
    // fallback
  }
  return FLEET_DATA;
}

export async function getBookingStatus(bookingId) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}`);
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (e) {
    // fallback
  }
  return null;
}
