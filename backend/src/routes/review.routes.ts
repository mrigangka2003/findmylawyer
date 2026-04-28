import { Router } from 'express';
import { createReview, getLawyerReviews, deleteReview } from '../controllers/review.controller';

const router = Router();

router.post('/', createReview);
router.get('/lawyer/:lawyerId', getLawyerReviews);
router.delete('/:reviewId', deleteReview);

export default router;
