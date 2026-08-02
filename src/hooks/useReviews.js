import { useEffect, useState } from "react";
import { getReviewsByBookId } from "@/services/reviewsService";
import { useAuth } from "@/context/AuthContext";

export const useReviews = (bookId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchReviews = async () => {
    setLoading(true);

    const { data, error } = await getReviewsByBookId(bookId, user?.id);

    if (error) {
      setError(error.message);
    } else {
      setReviews(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (bookId) {
      fetchReviews();
    }
  }, [bookId]);

  return {
    reviews,
    loading,
    error,
    refetchReviews: fetchReviews,
  };
};
