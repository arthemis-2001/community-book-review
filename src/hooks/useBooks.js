import { useEffect, useState } from "react";
import { getBooks } from "@/services/booksService";

export const useBooks = ({ sortBy, ascending, search }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await getBooks({ sortBy, ascending, search });

      if (error) {
        setError(error.message);
      } else {
        setBooks(data);
      }

      setLoading(false);
    };

    fetchBooks();
  }, [sortBy, ascending, search]);

  return { books, loading, error };
};
