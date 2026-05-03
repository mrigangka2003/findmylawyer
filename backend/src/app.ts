import express, { Request, Response } from 'express';
import cors from 'cors';
import { PORT } from './constants';
import userRoutes from './routes/user.routes';
import lawyerRoutes from './routes/lawyer.routes';
import adminRoutes from './routes/admin.routes';
import aiRoutes from './routes/ai.routes';
import bookingRoutes from './routes/booking.routes';
import reviewRoutes from './routes/review.routes';
import paymentRoutes from './routes/payment.routes';
import authRoutes from './routes/auth.routes';
import { verifyToken } from './middlewares/auth.middleware';  
import connectDb from './config/db';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/lawyers', lawyerRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/payments', paymentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Find My Lawyer API is running');
});

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.log(`MONGODB connection FAILED `, err);
});