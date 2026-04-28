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

router.post('/', createBooking);
router.get('/user/:userId', getUserBookings);
router.get('/lawyer/:lawyerId', getLawyerBookings);
router.patch('/:bookingId/status', updateBookingStatus);
router.get('/admin/all', authorize(['admin']), getAllBookings);

export default router;
