"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Review } from "../../types";

interface ReviewFormProps {
  listingId: string;
  onReviewAdded: (review: Review) => void;
}

export default function ReviewForm({ listingId, onReviewAdded }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      setError("Please select a star rating.");
      return;
    }
    if (!comment.trim()) {
      setError("Please write a review.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, rating, comment }),
      });

      if (!res.ok) {
        throw new Error("Failed to add review.");
      }

      const newReview: Review = await res.json();
      onReviewAdded(newReview);
      setRating(0);
      setComment("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
    >
      <h3 className="font-medium">Add a review</h3>

      <div className="mt-2 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="p-1"
            aria-label={`Rate ${star} stars`}
          >
            <Star
              className={`h-6 w-6 transition ${
                star <= (hoverRating || rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-zinc-300 dark:text-zinc-600"
              }`}
            />
          </button>
        ))}
      </div>

      <textarea
        rows={3}
        placeholder="Share your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="mt-3 w-full rounded-lg border border-zinc-200 bg-transparent p-3 text-sm outline-none focus:border-rose-500 dark:border-zinc-700"
      />

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-3 rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit review"}
      </button>
    </form>
  );
}
