import { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  RatingGroup,
  useRatingGroup,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useAuth } from "@/context/AuthContext";
import { useVoteReview } from "@/hooks/useVoteReview";

export default function ReviewCard({ review }) {
  const { user } = useAuth();
  const { submitVote, removeVote, loading } = useVoteReview();
  const [voteScore, setVoteScore] = useState(review.voteScore);
  const [hasVoted, setHasVoted] = useState(review.hasVoted);
  const rating = useRatingGroup({
    count: 5,
    value: review.rating,
    readOnly: true,
  });

  const handleVote = async () => {
    if (!user) {
      toaster.create({
        title: "You must be logged in to vote",
        type: "info",
      });

      return;
    }

    if (hasVoted) {
      setVoteScore((prev) => prev - 1);
      setHasVoted(false);

      const { error } = await removeVote({
        reviewId: review.id,
        userId: user.id,
      });

      if (error) {
        toaster.create({
          title: "Unvote failed",
          description: error.message,
          type: "error",
        });
        setVoteScore((prev) => prev + 1);
        setHasVoted(true);
      }

      toaster.create({
        title: "Successfully unvoted",
        type: "success",
      });

      return;
    }

    setVoteScore((prev) => prev + 1);
    setHasVoted(true);

    const { error } = await submitVote({
      reviewId: review.id,
      userId: user.id,
      voteValue: 1,
    });

    if (error) {
      toaster.create({
        title: "Vote failed",
        description: error.message,
        type: "error",
      });
      setVoteScore((prev) => prev - 1);
      setHasVoted(false);
    }

    toaster.create({
      title: "Successfully voted",
      type: "success",
    });
  };

  return (
    <Card.Root width="100%">
      <Card.Body gap="4">
        <HStack justify="space-between" align="start">
          <HStack>
            <Avatar.Root>
              <Avatar.Fallback name={review.profiles?.username} />

              <Avatar.Image src={review.profiles?.avatar_url} />
            </Avatar.Root>

            <VStack align="start" gap="0">
              <Card.Title>{review.profiles?.username}</Card.Title>

              <RatingGroup.RootProvider value={rating} size="sm">
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
              </RatingGroup.RootProvider>
            </VStack>
          </HStack>
        </HStack>

        <Card.Description>{review.content}</Card.Description>
        <HStack mt={3}>
          <Button size="xs" loading={loading} onClick={handleVote}>
            {hasVoted ? "Unvote" : "👍 Helpful"}
          </Button>
          <Text fontSize="sm">{voteScore} votes</Text>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
