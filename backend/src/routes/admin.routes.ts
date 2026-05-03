import { Router } from 'express';
import { getAllUsers, deleteUser, getAllLawyers, allBookings, getBookingDetails, addLawyer, getLawyerbyid } from '../controllers/admin.controller';
import { verifyToken, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(verifyToken, authorize(['admin']));

router.get('/users', getAllUsers);
router.get('/lawyers', getAllLawyers);
router.get('/lawyers/:id', getLawyerbyid);
router.get('/bookings', allBookings);
router.get('/bookings/:id', getBookingDetails);
router.post('/lawyers/add', addLawyer);
router.delete('/users/:id', deleteUser);

export default router;
