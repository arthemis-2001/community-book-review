import {
  Box,
  Heading,
  HStack,
  Input,
  NativeSelect,
  SimpleGrid,
  Spinner,
  Text,
  Center,
} from "@chakra-ui/react";
import { useBooks } from "@/hooks/useBooks";
import BookCard from "@/components/BookCard";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort") || "newest";

  const search = searchParams.get("search") || "";
  const SORT_OPTIONS = {
    newest: {
      sortBy: "created_at",
      ascending: false,
    },
    oldest: {
      sortBy: "created_at",
      ascending: true,
    },
    "title-asc": {
      sortBy: "title",
      ascending: true,
    },
    "title-desc": {
      sortBy: "title",
      ascending: false,
    },
    "year-desc": {
      sortBy: "year",
      ascending: false,
    },
    "year-asc": {
      sortBy: "year",
      ascending: true,
    },
  };

  const { books, loading, error } = useBooks({
    ...SORT_OPTIONS[sort],
    search,
  });

  if (loading) {
    return (
      <Center mt="100px">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center mt="100px">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Box maxW="1200px" mx="auto" mt="40px" px={4}>
      <Heading mb={6} color="fg">
        📚 Books
      </Heading>
      <HStack w="100%" maxW="700px" mx="auto" mb={6} gap={4}>
        <Input
          flex={1}
          placeholder="Search books..."
          value={search}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams);
            params.set("search", e.target.value);
            setSearchParams(params);
          }}
        />
        <NativeSelect.Root maxW="220px">
          <NativeSelect.Field
            value={sort}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams);
              params.set("sort", e.target.value);
              setSearchParams(params);
            }}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="year-desc">Newest Published</option>
            <option value="year-asc">Oldest Published</option>
          </NativeSelect.Field>

          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </HStack>
      {books.length === 0 ? (
        <Text>No books found.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
