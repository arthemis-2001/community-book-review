import { supabase } from "@/utils/supabaseClient";

export const voteReview = async ({
  reviewId,
  userId,
  voteValue,
}) => {
  return await supabase
    .from("review_votes")
    .upsert(
      {
        review_id: reviewId,
        user_id: userId,
        vote_value: voteValue,
      },
      {
        onConflict: "review_id,user_id",
      },
    );
};

export const unvoteReview = async ({
  reviewId,
  userId,
}) => {
  return await supabase
    .from("review_votes")
    .delete()
    .eq("review_id", reviewId)
    .eq("user_id", userId);
};
