import { Router } from 'express';
import { getLawyerProfile, updateLawyerProfile } from '../controllers/lawyer.controller';
import { verifyToken, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(verifyToken, authorize(['lawyer']));

router.get('/profile', getLawyerProfile);
router.put('/profile', updateLawyerProfile);

export default router;