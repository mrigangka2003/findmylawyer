import { Router } from 'express';
import { searchLawyers } from '../controllers/ai.controller';

const router = Router();

router.post('/search', searchLawyers);

export default router;
