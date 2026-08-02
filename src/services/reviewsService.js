import { supabase } from "@/utils/supabaseClient";

export const getReviewsByBookId = async (bookId, currentUserId) => {
  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      *,
        profiles (
          username,
          avatar_url
        ),
        review_votes (
          user_id,
          vote_value
        )
      `,
    )
    .eq("book_id", bookId)
    .order("created_at", { ascending: false });

  if (error) {
    return { data: null, error };
  }

  const reviewsWithVotes = data.map((review) => ({
    ...review,
    voteScore: review.review_votes.reduce(
      (sum, vote) => sum + vote.vote_value,
      0,
    ),
    votesCount: review.review_votes.length,
    hasVoted: review.review_votes.some((vote) => vote.user_id === currentUserId),
  }));

  return {
    data: reviewsWithVotes,
    error: null,
  };
};

export const createReview = async ({ content, rating, bookId, userId }) => {
  const { data, error } = await supabase
    .from("reviews")
    .insert([
      {
        content,
        rating,
        book_id: bookId,
        user_id: userId,
      },
    ])
    .select()
    .single();
  return { data, error };
};
