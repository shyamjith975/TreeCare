import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes';
import customerRoutes from './routes/customer.routes';
import workerRoutes from './routes/worker.routes';
import bookingRoutes from './routes/booking.routes';
import serviceRoutes from './routes/service.routes';
import subscriptionRoutes from './routes/subscription.routes';
import paymentRoutes from './routes/payment.routes';
import transportRoutes from './routes/transport.routes';

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// Middleware
// ============================================

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [process.env.WEB_URL || 'http://localhost:3000', process.env.MOBILE_URL || 'exp://localhost:8081'],
  credentials: true
}));

// Body parser middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// ============================================
// Routes
// ============================================

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/transport', transportRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
  console.log(`🌳 TreeCare Backend running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;