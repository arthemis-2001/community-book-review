import { useCallback, useEffect, useState } from "react";
import { getReviewsByBookId } from "@/services/reviewsService";
import { useAuth } from "@/context/AuthContext";

export const useReviews = (bookId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await getReviewsByBookId(bookId, user?.id);

    if (error) {
      setError(error.message);
      setReviews([]);
    } else {
      setReviews(data ?? []);
    }

    setLoading(false);
  }, [bookId, user?.id]);

  useEffect(() => {
    if (!bookId) {
      const timeoutId = window.setTimeout(() => {
        setReviews([]);
        setError(null);
        setLoading(false);
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }

    const timeoutId = window.setTimeout(() => {
      void fetchReviews();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [bookId, fetchReviews]);

  return {
    reviews,
    loading,
    error,
    refetchReviews: fetchReviews,
  };
};
