import { Router } from 'express';
import {
  createBooking,
  getUserBookings,
  getLawyerBookings,
  updateBookingStatus,
  getAllBookings,
} from '../controllers/booking.controller';
import { verifyToken, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(verifyToken);

router.post('/', authorize(['user']), createBooking);
router.get('/user/my-bookings', authorize(['user']), getUserBookings);
router.get('/lawyer/my-bookings', authorize(['lawyer']), getLawyerBookings);
router.patch('/:bookingId/status', authorize(['lawyer']), updateBookingStatus);
router.get('/admin/all', authorize(['admin']), getAllBookings);

export default router;
