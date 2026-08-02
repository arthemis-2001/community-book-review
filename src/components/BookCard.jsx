import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function BookCard({ book }) {
  const navigate = useNavigate();
  const coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      cursor="pointer"
      _hover={{ shadow: "lg" }}
      onClick={() => navigate(`/books/${book.id}`)}
    >
      <Image
        src={coverUrl}
        alt={book.title}
        maxH="500px"
        w="100%"
        objectFit="contain"
        mb={4}
        borderRadius="md"
        fallbackSrc="https://via.placeholder.com/300x450?text=No+Cover"
      />
      <Heading fontSize="xl" color="fg">
        {book.title}
      </Heading>
      <Text mt={2}>{book.author}</Text>
    </Box>
  );
}
