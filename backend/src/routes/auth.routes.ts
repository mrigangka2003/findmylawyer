import { Router } from 'express';
import { login, register, changePassword, forgotPassword, resetPassword } from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.put('/change-password', verifyToken, changePassword);

export default router;
