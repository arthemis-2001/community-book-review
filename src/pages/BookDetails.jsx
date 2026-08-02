import { useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Center,
  Heading,
  Image,
  Link,
  Spinner,
  Text,
  VStack,
  Card,
  Separator,
} from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";
import { useBookById } from "@/hooks/useBookById";
import ReviewList from "@/components/ReviewList";
import ReviewForm from "@/components/ReviewForm";
import { useReviews } from "@/hooks/useReviews";

export default function BookDetails() {
  const { id } = useParams();
  const { book, bookLoading, bookError } = useBookById(id);
  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
    refetchReviews,
  } = useReviews(id);

  if (bookLoading) {
    return (
      <Center mt="100px">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (bookError) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        {bookError}
      </Alert.Root>
    );
  }

  if (!book) {
    return (
      <Center mt="100px">
        <Text>Book not found.</Text>
      </Center>
    );
  }

  const coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;
  const googleBooksUrl = `https://books.google.com/books?vid=ISBN${book.isbn}`;

  return (
    <Box width="container.lg" mx="auto" py={10} px={5}>
      <VStack align="stretch" gap={8}>
        <Card.Root>
          <Card.Body gap={4}>
            <Image
              src={coverUrl}
              alt={book.title}
              maxH="600px"
              w="100%"
              objectFit="contain"
              mb={4}
              borderRadius="md"
              fallbackSrc="https://via.placeholder.com/300x450?text=No+Cover"
            />
            <VStack align="start" gap={3}>
              <Heading size="2xl" color="fg">
                {book.title}
              </Heading>
              <Text fontSize="lg" fontWeight="medium">
                by {book.author}
              </Text>
              <Text color="gray.600">Published: {book.year}</Text>
              <Link href={googleBooksUrl} isExternal>
                <Button
                  as="span"
                  rightIcon={<FiExternalLink />}
                  colorScheme="gray.600"
                  size="sm"
                  variant="outline"
                >
                  View on Google Books
                </Button>
              </Link>
              <Separator />
              <Text lineHeight="tall">{book.description}</Text>
            </VStack>
          </Card.Body>
        </Card.Root>
        <Box>
          <Heading size="lg" mb={4}>
            Write a Review
          </Heading>
          <ReviewForm bookId={id} onReviewCreated={refetchReviews} />
        </Box>
        <Box>
          <Heading size="lg" mb={4} color="fg">
            Reviews
          </Heading>
          <ReviewList
            reviews={reviews}
            loading={reviewsLoading}
            error={reviewsError}
          />
        </Box>
      </VStack>
    </Box>
  );
}
