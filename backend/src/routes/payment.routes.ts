import { Router } from 'express';
import { processPayment } from '../controllers/payment.controller';

const router = Router();

router.post('/process', processPayment);

export default router;
