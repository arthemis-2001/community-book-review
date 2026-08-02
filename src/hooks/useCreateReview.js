import { useState } from "react";
import { createReview } from "@/services/reviewsService";

export const useCreateReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitReview = async (reviewData) => {
    setLoading(true);
    setError(null);

    const { data, error } = await createReview(reviewData);

    if (error) {
      setError(error.message);
    }

    setLoading(false);

    return { data, error };
  };

  return {
    submitReview,
    loading,
    error,
  };
};