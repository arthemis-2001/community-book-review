import { supabase } from "@/utils/supabaseClient";

export const getBooks = async ({
  sortBy = "created_at",
  ascending = false,
  search = "",
} = {}) => {
  let query = supabase.from("books").select("*");

  if (search) {
    query = query.or(`title.ilike.%${search}%,author.ilike.%${search}%`);
  }

  const { data, error } = await query.order(sortBy, { ascending });

  return { data, error };
};

export const getBookById = async (id) => {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
};
