import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import 'express-async-errors';
import { config } from './config/config.js';
import connectDB from './utils/db.js';
import errorHandler from './middleware/errorHandler.js';
import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';
import jobRoutes from './routes/job.routes.js';
import applicationRoutes from './routes/application.routes.js';

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json({ limit: '10kb' })); // Body size limit for security
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cors({
  origin: config.CORS_ORIGIN,
  credentials: true
}));
app.use(helmet());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Logging middleware in development
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API Routes
app.use(`${config.API_PREFIX}/health`, healthRoutes);
app.use(`${config.API_PREFIX}/auth`, authRoutes);
app.use(`${config.API_PREFIX}/jobs`, jobRoutes);
app.use(`${config.API_PREFIX}/applications`, applicationRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = config.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${config.NODE_ENV} mode on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}${config.API_PREFIX}/docs`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

export default app;
