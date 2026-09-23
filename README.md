# 🚕 WhiteCabz — Premium Cab & Chauffeur Platform

> High-end Chauffeured Mobility & Taxi Service across Punjab, Delhi NCR, Chandigarh, Himachal Pradesh, Uttarakhand, and Pan-India.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)

---

## 🌟 Key Features

- **Fluid Responsive Architecture**: Continuously adapts across all screens, foldables, tablets, and ultrawides in a champagne warm aesthetic.
- **Pan-India Precision Routing**: Searchable database covering all Indian states, districts, airports (IGI, ATQ, IXC, AIP, DED, IXJ), and pilgrimage hubs (Vrindavan, Haridwar, Rishikesh, Katra, etc.).
- **Dual-Channel High-Accuracy Dispatch**:
  - **Direct WhatsApp Dispatch**: Automatically formats native bold booking messages sent directly to coordinator `+91 94786 13001`.
  - **Automated Email Notifications**: Luxury HTML booking receipt sent to customer & dispatch alert to `info@whitecabz.com` powered by **Resend**.
- **Cloudinary CDN Integration**: Dynamic image optimization (`f_auto, q_auto`) and batch asset synchronization.
- **Enterprise-Grade Form Prevention & Security**:
  - Honeypot bot protection (drops automated spam without executing downstream tasks).
  - Anti-XSS HTML stripping and whitespace normalization.
  - Zod schema validation (date limits, phone number normalization, duplicate route checks).
  - Rate limiting with `express-rate-limit` (general + booking flood protection).
  - Helmet security headers and CORS whitelisting.
- **Resilient Operational CRM**: In-memory operational store with optional Google Sheets sync.

---

## 🏗️ Monorepo Architecture

```
Threads-Cabs/
├── apps/
│   ├── api/                    # Express.js REST API
│   │   ├── src/
│   │   │   ├── config/         # Environment & constant tokens
│   │   │   ├── controllers/    # Route handlers (bookings, enquiries, routes, fleet)
│   │   │   ├── middleware/     # Rate limit, Zod validation, honeypot, error handling
│   │   │   ├── routes/         # Express endpoint definitions
│   │   │   ├── scripts/        # Cloudinary asset sync tool
│   │   │   ├── services/       # Email (Resend), Cloudinary, Sheets, Notifications
│   │   │   └── validators/     # Zod strict schemas
│   │   └── package.json
│   │
│   └── web/                    # React + Vite Client Application
│       ├── public/images/      # High-resolution local brand assets & cars
│       ├── src/
│       │   ├── app/            # Main App container & router
│       │   ├── components/     # UI primitives, sections, and booking modals
│       │   ├── data/           # Indian cities, routes, fleet, destinations data
│       │   ├── lib/            # API client, Cloudinary helper, WhatsApp generator
│       │   ├── pages/          # Home, Routes, Services, Fleet, About, Contact, Track
│       │   └── styles/         # Tailored design system, luxury grid, typography
│       └── package.json
│
├── render.yaml                 # Render Blueprint specification
├── .env.example                # Environment variables template
├── .gitignore                  # Production ignore rules
└── package.json                # Root workspace scripts
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### 2. Installation
```bash
git clone https://github.com/your-username/whitecabz.git
cd whitecabz
npm install
```

### 3. Environment Variables
Copy `.env.example` to `apps/api/.env`:
```bash
cp apps/api/.env.example apps/api/.env
```

### 4. Start Development Servers
```bash
npm run dev
```
- **Web Application**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **API Health Check**: `http://localhost:5000/api/health`

---

## 🌐 Deploying to Render

### Option A: Automatic Blueprint Deployment (Recommended)
1. Push your repository to **GitHub**.
2. Go to [Render Dashboard](https://dashboard.render.com/) -> **New** -> **Blueprint**.
3. Connect your GitHub repository.
4. Render will automatically detect `render.yaml` and configure the web service with all build and start commands!

### Option B: Manual Web Service Setup on Render
1. Create a **New Web Service** connected to your repository.
2. Set the following settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run render:build`
   - **Start Command**: `npm run render:start`
   - **Health Check Path**: `/api/health`
3. Under **Environment Variables**, add:
   ```env
   NODE_ENV=production
   PORT=10000
   RESEND_API_KEY=your_resend_api_key_here
   EMAIL_FROM=WhiteCabz <onboarding@resend.dev>
   ADMIN_EMAIL=info@whitecabz.com
   ADMIN_NOTIFICATION_NUMBER=+919478613001
   WHATSAPP_PHONE=+919478613001
   CLOUDINARY_API_KEY=your_cloudinary_api_key_here
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   ```
4. Click **Deploy Web Service**.

---

## 🔒 Form Validation & Prevention Rules

| Security Layer | Implementation Detail |
|---|---|
| **Bot Honeypot** | Submissions with hidden bot fields (`website`, `hp_field`) are instantly dropped |
| **XSS Injection** | All string fields are stripped of HTML tags and control characters before storage |
| **Phone Format** | Strictly checks for 10-15 digits and rejects repetitive dummy numbers (`0000000000`) |
| **Date Safeguard** | Rejects past dates and enforces proper chronological validation |
| **Anti-Collision** | Ensures pickup location does not match destination location |
| **Rate Limiting** | Strict IP-based threshold on booking/enquiry routes to eliminate spam abuse |

---

## 📞 Support & Dispatch Desk
- **Helpline**: `+91 94786 13001`
- **Email**: `info@whitecabz.com`
- **Headquarters**: Jalandhar, Punjab, India
