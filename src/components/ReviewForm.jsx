import {
  Alert,
  Button,
  Card,
  Field,
  RatingGroup,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { toaster } from "@/components/ui/toaster";
import { useAuth } from "@/context/AuthContext";
import { useCreateReview } from "@/hooks/useCreateReview";

export default function ReviewForm({ bookId, onReviewCreated }) {
  const { user } = useAuth();
  const { submitReview, loading } = useCreateReview();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
      rating: 0,
    },
  });

  const onSubmit = async (values) => {
    const { error } = await submitReview({
      bookId,
      userId: user.id,
      content: values.content,
      rating: values.rating,
    });

    if (error) {
      toaster.create({
        title: "Failed to submit review",
        description: error.message,
        type: "error",
      });

      return;
    }

    toaster.create({
      title: "Review submitted!",
      type: "success",
    });

    reset();
    
    await onReviewCreated();
  };

  if (!user) {
    return (
      <Alert.Root status="info">
        <Alert.Indicator />

        <Alert.Content>
          <Alert.Title>Sign in required</Alert.Title>

          <Alert.Description>
            You must be logged in to leave a review.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  return (
    <Card.Root>
      <Card.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={5} align="stretch">
            <Field.Root>
              <Field.Label>Rating</Field.Label>

              <Controller
                name="rating"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <RatingGroup.Root
                    count={5}
                    value={field.value}
                    onValueChange={(e) => field.onChange(e.value)}
                  >
                    <RatingGroup.HiddenInput />

                    <RatingGroup.Control />
                  </RatingGroup.Root>
                )}
              />

              <Field.ErrorText>
                {errors.rating && "Please select a rating"}
              </Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.content}>
              <Field.Label>Review</Field.Label>

              <Textarea
                placeholder="Write your thoughts about this book..."
                {...register("content", {
                  required: "Review content is required",
                  minLength: {
                    value: 10,
                    message: "Review must be at least 10 characters",
                  },
                })}
              />

              <Field.ErrorText>{errors.content?.message}</Field.ErrorText>
            </Field.Root>

            <Button type="submit" loading={loading}>
              Submit Review
            </Button>
          </VStack>
        </form>
      </Card.Body>
    </Card.Root>
  );
}
