import { useEffect, useState } from "react";
import { getBookById } from "@/services/booksService";

export const useBookById = (id) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const { data, error } = await getBookById(id);

      if (error) {
        setError(error.message);
      } else {
        setBook(data);
      }

      setLoading(false);
    };

    fetchBook();
  }, [id]);

  return { book, loading, error };
};
