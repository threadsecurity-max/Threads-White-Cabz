import { Resend } from 'resend';
import { ENV } from '../config/env.js';
import { logger } from '../utils/logger.js';

class EmailService {
  constructor() {
    this.resend = ENV.RESEND_API_KEY ? new Resend(ENV.RESEND_API_KEY) : null;
  }

  /**
   * Generates a luxury HTML template for WhiteCabz customer emails
   */
  generateCustomerThankYouHtml(booking) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Choosing WhiteCabz</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FAF8F5; margin: 0; padding: 0; color: #1e293b; }
    .container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #EADDC4; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 32px 24px; text-align: center; border-bottom: 3px solid #D4B36A; }
    .logo-text { font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: 1px; margin: 0; }
    .gold { color: #D4B36A; }
    .subtitle { font-size: 11px; color: #94A3B8; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px; font-weight: 600; }
    .content { padding: 36px 30px; }
    .badge { display: inline-block; background-color: #FAF6ED; color: #94722D; border: 1px solid #E8D3A7; padding: 6px 14px; border-radius: 9999px; font-size: 12px; font-weight: bold; margin-bottom: 18px; }
    h2 { font-size: 22px; color: #0F172A; margin: 0 0 12px 0; }
    p { font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 20px 0; }
    .card { background-color: #FAF8F5; border: 1px solid #EADDC4; border-radius: 14px; padding: 20px; margin-bottom: 24px; }
    .table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .table td { padding: 8px 4px; border-bottom: 1px solid #EDE6D8; }
    .table tr:last-child td { border-bottom: none; }
    .table td.label { font-weight: 600; color: #64748B; width: 40%; }
    .table td.value { font-weight: 700; color: #0F172A; }
    .btn { display: inline-block; background: linear-gradient(135deg, #E0C58A 0%, #B89344 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: bold; font-size: 14px; text-align: center; margin-top: 10px; }
    .footer { background-color: #F5EFEB; padding: 24px 30px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid #EADDC4; }
    .footer a { color: #B89344; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-text">WHITE<span class="gold">CABZ</span></div>
      <div class="subtitle">Premium Chauffeured Mobility • North India</div>
    </div>
    
    <div class="content">
      <div class="badge">Booking Enquiry Received</div>
      <h2>Thank You for Choosing WhiteCabz, ${booking.name || 'Valued Guest'}!</h2>
      <p>We have successfully received your cab booking request. Our dedicated coordinator is currently reviewing route availability to assign the best vehicle and driver for your journey.</p>
      
      <div class="card">
        <table class="table">
          <tr>
            <td class="label">Reference ID</td>
            <td class="value"><span class="gold">${booking.bookingId || 'New Enquiry'}</span></td>
          </tr>
          <tr>
            <td class="label">Pickup Location</td>
            <td class="value">${booking.pickup || 'Jalandhar'}</td>
          </tr>
          <tr>
            <td class="label">Drop Location</td>
            <td class="value">${booking.destination || 'Destination'}</td>
          </tr>
          <tr>
            <td class="label">Travel Date & Time</td>
            <td class="value">${booking.date || 'Scheduled'} at ${booking.time || 'TBD'}</td>
          </tr>
          <tr>
            <td class="label">Trip Type</td>
            <td class="value">${booking.tripType || 'One Way'}</td>
          </tr>
          <tr>
            <td class="label">Preferred Vehicle</td>
            <td class="value">${booking.vehiclePreference || 'Executive Sedan'}</td>
          </tr>
          <tr>
            <td class="label">Passengers</td>
            <td class="value">${booking.passengers || '1'} Person(s)</td>
          </tr>
          ${booking.specialRequirements ? `
          <tr>
            <td class="label">Special Notes</td>
            <td class="value">${booking.specialRequirements}</td>
          </tr>` : ''}
        </table>
      </div>

      <p>Our dispatch team will connect with you shortly via Call or WhatsApp at <strong>${booking.phone || ''}</strong> with your chauffeur details and lowest all-inclusive fare quote.</p>

      <center>
        <a href="https://wa.me/919478613001" class="btn">Connect on WhatsApp for Quick Confirmation</a>
      </center>
    </div>

    <div class="footer">
      <p style="margin:0 0 6px 0;"><strong>WhiteCabz 24×7 Dispatch Desk:</strong> <a href="tel:+919478613001">+91 94786 13001</a></p>
      <p style="margin:0 0 6px 0;">Official Inquiries: <a href="mailto:info@whitecabz.com">info@whitecabz.com</a></p>
      <p style="margin:0; font-size:11px; color:#94A3B8;">Jalandhar • Amritsar • Delhi NCR • Chandigarh • Pan-India</p>
    </div>
  </div>
</body>
</html>
    `;
  }

  /**
   * Send Customer Thank You email and Admin Alert email via Resend
   */
  async sendBookingConfirmationEmail(booking) {
    if (!this.resend) {
      logger.warn('Resend API key not configured. Skipping email dispatch.');
      return { success: false, reason: 'NO_RESEND_KEY' };
    }

    try {
      const tasks = [];

      // 1. If customer provided email, send Thank You email
      if (booking.email && booking.email.includes('@')) {
        tasks.push(
          this.resend.emails.send({
            from: ENV.EMAIL_FROM,
            to: booking.email,
            subject: `Thank You for Choosing WhiteCabz — Booking Request #${booking.bookingId}`,
            html: this.generateCustomerThankYouHtml(booking),
          }).then(res => {
            logger.info({ email: booking.email, resId: res.data?.id }, 'Customer Thank You email sent via Resend');
            return res;
          }).catch(err => {
            logger.error({ err, email: booking.email }, 'Failed to send customer email via Resend');
          })
        );
      }

      // 2. Send Admin Notification Email to info@whitecabz.com
      if (ENV.ADMIN_EMAIL) {
        const adminHtml = `
          <h2>New WhiteCabz Booking Received</h2>
          <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
          <p><strong>Customer:</strong> ${booking.name} (${booking.phone})</p>
          <p><strong>Email:</strong> ${booking.email || 'Not provided'}</p>
          <p><strong>Route:</strong> ${booking.pickup} &rarr; ${booking.destination}</p>
          <p><strong>Date & Time:</strong> ${booking.date} at ${booking.time}</p>
          <p><strong>Trip:</strong> ${booking.tripType} | <strong>Vehicle:</strong> ${booking.vehiclePreference || 'Standard'} | <strong>Passengers:</strong> ${booking.passengers}</p>
          ${booking.specialRequirements ? `<p><strong>Notes:</strong> ${booking.specialRequirements}</p>` : ''}
          <hr />
          <p><a href="https://wa.me/${(booking.phone || '').replace(/[^0-9]/g, '')}">Click to Chat with Customer on WhatsApp</a></p>
        `;

        tasks.push(
          this.resend.emails.send({
            from: ENV.EMAIL_FROM,
            to: ENV.ADMIN_EMAIL,
            subject: `🚕 New Booking: #${booking.bookingId} - ${booking.name} (${booking.pickup} to ${booking.destination})`,
            html: adminHtml,
          }).then(res => {
            logger.info({ admin: ENV.ADMIN_EMAIL, resId: res.data?.id }, 'Admin booking alert email sent via Resend');
            return res;
          }).catch(err => {
            logger.error({ err, admin: ENV.ADMIN_EMAIL }, 'Failed to send admin email alert via Resend');
          })
        );
      }

      await Promise.allSettled(tasks);
      return { success: true };
    } catch (error) {
      logger.error({ error }, 'Error in EmailService.sendBookingConfirmationEmail');
      return { success: false, error: error.message };
    }
  }
}

export const emailService = new EmailService();
