import { Request, Response } from 'express';

interface Review {
  id: number;
  lawyerId: number;
  userId: number;
  rating: number;
  comment?: string;
  createdAt: Date;
}

// Mock review data
let reviews: Review[] = [];

export const createReview = async (req: Request, res: Response) => {
  const { lawyerId, userId, rating, comment } = req.body;

  if (!lawyerId || !userId || !rating) {
    return res.status(400).json({ message: 'Missing required review fields' });
  }

  const newReview: Review = {
    id: reviews.length + 1,
    lawyerId: parseInt(lawyerId),
    userId: parseInt(userId),
    rating: parseFloat(rating),
    comment,
    createdAt: new Date(),
  };

  reviews.push(newReview);
  res.status(201).json({ message: 'Review added successfully', review: newReview });
};

export const getLawyerReviews = async (req: Request, res: Response) => {
  const { lawyerId } = req.params;
  const lawyerReviews = reviews.filter((r) => r.lawyerId === parseInt(lawyerId));
  res.status(200).json({ reviews: lawyerReviews });
};

export const deleteReview = async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const reviewIndex = reviews.findIndex((r) => r.id === parseInt(reviewId));

  if (reviewIndex === -1) {
    return res.status(404).json({ message: 'Review not found' });
  }

  reviews.splice(reviewIndex, 1);
  res.status(200).json({ message: 'Review deleted successfully' });
};
