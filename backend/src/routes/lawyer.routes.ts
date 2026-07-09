import { Router } from 'express';
import { getAllLawyers, getLawyerById, getLawyerProfile, updateLawyerProfile } from '../controllers/lawyer.controller';
import { getLawyerAvailability, updateAvailability } from '../controllers/availability.controller';
import { verifyToken, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/all', getAllLawyers);
router.get('/:lawyerId/availability', getLawyerAvailability);
router.get('/:lawyerId', getLawyerById);

// Protected routes
router.use(verifyToken);
router.get('/me/profile', authorize(['lawyer']), getLawyerProfile);
router.put('/me/profile', authorize(['lawyer']), updateLawyerProfile);
router.put('/me/availability', authorize(['lawyer']), updateAvailability);

export default router;
