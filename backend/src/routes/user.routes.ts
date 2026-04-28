import { Router } from 'express';
import { getUserProfile, updateProfile } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.use(verifyToken);

router.get('/profile', getUserProfile);
router.put('/profile', updateProfile);

export default router;
