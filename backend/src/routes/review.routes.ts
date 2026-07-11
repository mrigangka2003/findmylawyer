import { Router } from 'express';
import { createReview, getLawyerReviews, deleteReview } from '../controllers/review.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/lawyer/:lawyerId', getLawyerReviews);
router.post('/', verifyToken, createReview);
router.delete('/:reviewId', verifyToken, deleteReview);

export default router;
