import { useState } from "react";
import { voteReview, unvoteReview } from "@/services/votesService";

export const useVoteReview = () => {
  const [loading, setLoading] = useState(false);

  const submitVote = async (voteData) => {
    setLoading(true);
    const { data, error } = await voteReview(voteData);
    setLoading(false);

    return { data, error };
  };

  const removeVote = async (voteData) => {
    setLoading(true);
    const { data, error } = await unvoteReview(voteData);
    setLoading(false);

    return { data, error };
  };

  return {
    submitVote,
    removeVote,
    loading,
  };
};