import { Router } from 'express';
import { getAllLawyers, getLawyerProfile, updateLawyerProfile } from '../controllers/lawyer.controller';
import { getLawyerAvailability, updateAvailability } from '../controllers/availability.controller';
import { verifyToken, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get('/all', getAllLawyers);
router.get('/:lawyerId/availability', getLawyerAvailability);

router.use(verifyToken);

router.get('/profile', authorize(['lawyer']), getLawyerProfile);
router.put('/profile', authorize(['lawyer']), updateLawyerProfile);
router.put('/availability', authorize(['lawyer']), updateAvailability);

export default router;