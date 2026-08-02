import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../test-utils";
import ReviewCard from "./ReviewCard";

var mockedUseAuth = {
  current: () => ({
    user: null,
    profile: null,
    loading: false,
    logout: vi.fn(),
  }),
};

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => mockedUseAuth.current(),
}));

describe("ReviewCard", () => {
  const mockReview = {
    id: 1,
    rating: 4,
    voteScore: 0,
    hasVoted: false,
    content: "Great book!",
    profiles: {
      id: 1,
      username: "booklover",
    },
    book: {
      id: 1,
      title: "1984",
    },
  };

  const renderReviewCard = () => render(<ReviewCard review={mockReview} />);

  it("renders reviewer username", async () => {
    renderReviewCard();
    expect(await screen.findByText("booklover")).toBeInTheDocument();
  });

  it("renders vote score", async () => {
    renderReviewCard();
    expect(await screen.findByText("0 votes")).toBeInTheDocument();
  });

  it("renders review comment", async () => {
    renderReviewCard();
    expect(await screen.findByText("Great book!")).toBeInTheDocument();
  });
});
