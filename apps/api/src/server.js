import app from './app.js';
import { ENV } from './config/env.js';
import { logger } from './utils/logger.js';

const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`🚕 WhiteCabz API Server running on port ${PORT} [${ENV.NODE_ENV}]`);
  logger.info(`📡 Health check accessible at http://localhost:${PORT}/api/health`);
});
