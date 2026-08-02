import { VStack } from "@chakra-ui/react";
import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews, loading, error }) {
  if (loading) {
    return <VStack>Loading reviews...</VStack>;
  }

  if (error) {
    return <VStack>Error loading reviews: {error}</VStack>;
  }

  if (reviews.length === 0) {
    return <VStack>No reviews found</VStack>;
  }

  return (
    <VStack spacing={4} align="stretch">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </VStack>
  );
}
