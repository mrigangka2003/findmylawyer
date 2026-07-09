import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Star, MessageSquare, Trash2 } from "lucide-react";

type Review = {
  _id: string;
  userId: { _id: string; name: string };
  rating: number;
  comment: string;
  createdAt: string;
};

type Props = {
  lawyerId: string; // This is the LawyerProfile _id OR userId
};

export default function ReviewSection({ lawyerId }: Props) {
  const { user, isAuthenticated } = useAuthStore();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lawyerId]);

  const fetchReviews = async () => {
    try {
      const { data } = await api.get(`/reviews/lawyer/${lawyerId}`);
      setReviews(data.reviews || []);
      setAvgRating(data.avgRating || 0);
      setTotalReviews(data.totalReviews || 0);
    } catch {
      // silent
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to leave a review");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await api.post("/reviews", {
        lawyerId,
        rating,
        comment: comment.trim(),
      });
      setReviews([data.review, ...reviews]);
      setTotalReviews((t) => t + 1);
      setAvgRating(((avgRating * totalReviews) + rating) / (totalReviews + 1));
      setComment("");
      setRating(5);
      toast.success("Review submitted!");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      await api.delete(`/reviews/${reviewId}`);
      const remaining = reviews.filter((r) => r._id !== reviewId);
      setReviews(remaining);
      setTotalReviews((t) => t - 1);
      if (remaining.length > 0) {
        setAvgRating(remaining.reduce((s, r) => s + r.rating, 0) / remaining.length);
      } else {
        setAvgRating(0);
      }
      toast.success("Review deleted");
    } catch {
      toast.error("Failed to delete review");
    }
  };

  const renderStars = (value: number, interactive = false) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={interactive ? 22 : 14}
          className={`transition-colors ${
            s <= (interactive ? (hoveredStar || value) : value)
              ? "text-yellow-400 fill-yellow-400"
              : "text-zinc-600"
          } ${interactive ? "cursor-pointer" : ""}`}
          onClick={interactive ? () => setRating(s) : undefined}
          onMouseEnter={interactive ? () => setHoveredStar(s) : undefined}
          onMouseLeave={interactive ? () => setHoveredStar(0) : undefined}
        />
      ))}
    </div>
  );

  return (
    <div className="mt-10 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-white rounded-full" />
        <h2 className="text-xl font-semibold">Client Reviews</h2>
        {totalReviews > 0 && (
          <div className="flex items-center gap-2 ml-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  className={s <= Math.round(avgRating) ? "text-yellow-400 fill-yellow-400" : "text-zinc-600"}
                />
              ))}
            </div>
            <span className="text-zinc-300 text-sm">
              {avgRating.toFixed(1)} ({totalReviews} review{totalReviews !== 1 ? "s" : ""})
            </span>
          </div>
        )}
      </div>

      {/* Submit Review Form */}
      {isAuthenticated && user?.role === "user" && (
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 mb-6"
        >
          <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
            <MessageSquare size={15} /> Write a Review
          </h3>
          <div className="mb-3">
            <p className="text-xs text-zinc-500 mb-1">Your Rating</p>
            {renderStars(rating, true)}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this lawyer..."
            rows={3}
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-white/30 focus:outline-none resize-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-3 bg-white text-black px-6 py-2 rounded-xl text-sm font-semibold hover:bg-zinc-200 transition disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      {/* Reviews List */}
      {isLoading ? (
        <p className="text-zinc-500 text-sm">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8 text-zinc-600">
          <Star size={32} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-white text-sm">{review.userId?.name || "Anonymous"}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {renderStars(review.rating)}
                    <span className="text-xs text-zinc-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {(user?.id === review.userId?._id || user?.role === "admin") && (
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-zinc-600 hover:text-red-400 p-1 rounded transition"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
