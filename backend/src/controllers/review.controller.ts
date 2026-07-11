import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { Review } from '../models/review.model';
import { LawyerProfile } from '../models/lawyer.model';

export const createReview = async (req: AuthRequest, res: Response) => {
  const { lawyerId, rating, comment } = req.body;

  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!lawyerId || !rating) {
      return res.status(400).json({ message: 'lawyerId and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if user already reviewed this lawyer
    const existingReview = await Review.findOne({ lawyerId, userId: req.user.id });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this lawyer' });
    }

    const newReview = await Review.create({
      lawyerId,
      userId: req.user.id,
      rating,
      comment: comment || '',
    });

    // Recalculate lawyer's average rating
    const allReviews = await Review.find({ lawyerId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await LawyerProfile.findOneAndUpdate({ userId: lawyerId }, { rating: Math.round(avgRating * 10) / 10 });

    const populatedReview = await Review.findById(newReview._id).populate('userId', 'name');

    res.status(201).json({ message: 'Review added successfully', review: populatedReview });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getLawyerReviews = async (req: Request, res: Response) => {
  const { lawyerId } = req.params;
  try {
    if (!lawyerId) return res.status(400).json({ message: 'lawyerId required' });
    const reviews = await Review.find({ lawyerId: lawyerId }).populate('userId', 'name').sort({ createdAt: -1 });
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;
    res.status(200).json({ reviews, avgRating: Math.round(avgRating * 10) / 10, totalReviews: reviews.length });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const deleteReview = async (req: AuthRequest, res: Response) => {
  const { reviewId } = req.params;
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Only the author or admin can delete
    if (review.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await Review.findByIdAndDelete(reviewId);

    // Recalculate rating
    const allReviews = await Review.find({ lawyerId: review.lawyerId });
    const avgRating = allReviews.length > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
      : 0;
    await LawyerProfile.findOneAndUpdate({ userId: review.lawyerId }, { rating: Math.round(avgRating * 10) / 10 });

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
