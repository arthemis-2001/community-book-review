import { describe, it, expect } from "vitest";
import { renderWithRouter, screen } from "../test-utils";
import BookCard from "./BookCard";

describe("BookCard", () => {
  const mockBook = {
    id: 1,
    title: "1984",
    author: "George Orwell",
    isbn: "153541",
  };

  const renderBookCard = () => renderWithRouter(<BookCard book={mockBook} />);

  it("renders book title", () => {
    renderBookCard();
    expect(screen.getByText("1984")).toBeInTheDocument();
  });

  it("renders book author", () => {
    renderBookCard();
    expect(screen.getByText("George Orwell")).toBeInTheDocument();
  });

  it("renders book cover image", () => {
    renderBookCard();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      "https://covers.openlibrary.org/b/isbn/153541-L.jpg",
    );
  });
});
