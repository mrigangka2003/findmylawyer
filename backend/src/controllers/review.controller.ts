import { Request, Response } from 'express';

import { Review } from '../models/review.model';

export const createReview = async (req: Request, res: Response) => {
  const { lawyerId, userId, rating, comment } = req.body;

  try {
    if (!lawyerId || !userId || !rating) {
      return res.status(400).json({ message: 'Missing required review fields' });
    }

    const newReview = await Review.create({
      lawyerId,
      userId,
      rating,
      comment,
    });

    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getLawyerReviews = async (req: Request, res: Response) => {
  const { lawyerId } = req.params;
  try {
    const lawyerReviews = await Review.find({ lawyerId: lawyerId as string }).populate('userId', 'name email');
    res.status(200).json({ reviews: lawyerReviews });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  try {
    const review = await Review.findByIdAndDelete(reviewId as string);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
