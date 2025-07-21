require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const xss = require('xss-clean');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { logger, httpLogger } = require('./utils/logger');

// Create Express app
const app = express();

// Create logs directory if it doesn't exist
const logDirectory = path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000 // 5 second timeout
})
.then(() => logger.info('Connected to local MongoDB'))
.catch(err => {
  logger.error(`Local MongoDB connection error: ${err.message}`);
  process.exit(1);
});

// Trust proxy (important when behind load balancers)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api', limiter);

// HTTP request logging
app.use(morgan('combined', { 
  stream: { 
    write: (message) => httpLogger.http(message.trim()) 
  } 
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  logger.info('Health check endpoint accessed');
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date(),
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API routes
app.use('/api/bugs', require('./routes/bugRoutes'));

// Test endpoint
app.get('/api/test', (req, res) => {
  logger.info('Test route accessed');
  res.status(200).json({ 
    status: 'success',
    message: 'Test endpoint working'
  });
});

// Error handling for undefined routes
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 404;
  logger.warn(`Route not found: ${req.originalUrl}`);
  next(err);
});

// Error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  logger.error(`${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  logger.error(err.stack);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  logger.info(`Server running on port ${port} in ${process.env.NODE_ENV} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
  logger.error(`UNHANDLED REJECTION: ${err.name} - ${err.message}`);
  logger.error(err.stack);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', err => {
  logger.error(`UNCAUGHT EXCEPTION: ${err.name} - ${err.message}`);
  logger.error(err.stack);
  server.close(() => process.exit(1));
});

module.exports = app;