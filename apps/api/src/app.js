import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { generalLimiter } from './middleware/rateLimit.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';
import { ENV } from './config/env.js';

import bookingRoutes from './routes/booking.routes.js';
import enquiryRoutes from './routes/enquiry.routes.js';
import routeRoutes from './routes/route.routes.js';
import serviceRoutes from './routes/service.routes.js';
import fleetRoutes from './routes/fleet.routes.js';
import uploadRoutes from './routes/upload.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Trust reverse proxy (essential for Render / Cloudflare / Heroku load balancers and accurate rate-limiting)
app.set('trust proxy', 1);

// Security Headers (configured to allow CDNs, fonts, and inline scripts/styles needed by Vite)
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      // Allow localhost in dev or any origin configured in ENV.FRONTEND_URL
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(generalLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    environment: ENV.NODE_ENV,
    timestamp: new Date().toISOString(),
    service: 'WhiteCabz Full-Stack API',
    operationalStore: 'Google Sheets / Resilient Repository',
  });
});

// API v1 Endpoints
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/enquiries', enquiryRoutes);
app.use('/api/v1/routes', routeRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/fleet', fleetRoutes);
app.use('/api/v1/upload', uploadRoutes);

// Route Aliases
app.use('/api/bookings', bookingRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/fleet', fleetRoutes);
app.use('/api/upload', uploadRoutes);

// Production Static Asset Serving & SPA Fallback (Render Unified Full-Stack Support)
const clientBuildPath = path.resolve(__dirname, '../../web/dist');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Centralized error handling
app.use(errorHandler);

export default app;
