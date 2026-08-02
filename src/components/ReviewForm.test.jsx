import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "../test-utils";
import ReviewForm from "./ReviewForm";

var mockedUseAuth = {
  current: () => ({
    user: { id: 42 },
    profile: null,
    loading: false,
    logout: vi.fn(),
  }),
};

var mockedUseCreateReview = {
  current: () => ({
    submitReview: vi.fn().mockResolvedValue({ data: {}, error: null }),
    loading: false,
  }),
};

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => mockedUseAuth.current(),
}));

vi.mock("@/hooks/useCreateReview", () => ({
  useCreateReview: () => mockedUseCreateReview.current(),
}));

describe("ReviewForm", () => {
  it("submits a review when rating and content are filled", async () => {
    const submitReview = vi.fn().mockResolvedValue({ data: {}, error: null });
    mockedUseCreateReview.current = () => ({ submitReview, loading: false });
    const onReviewCreated = vi.fn();

    const { container } = render(
      <ReviewForm bookId={123} onReviewCreated={onReviewCreated} />,
    );

    const textarea = screen.getByPlaceholderText(
      "Write your thoughts about this book...",
    );
    fireEvent.change(textarea, {
      target: { value: "This is a great book! I loved the characters." },
    });

    const ratingInput = container.querySelector('input[name="rating"]');
    if (ratingInput) {
      fireEvent.change(ratingInput, { target: { value: "5" } });
    }

    const ratingOptions = await screen.findAllByRole("radio");
    fireEvent.click(ratingOptions[4]);
    await waitFor(() =>
      expect(ratingOptions[4]).toHaveAttribute("aria-checked", "true"),
    );

    fireEvent.click(screen.getByRole("button", { name: /submit review/i }));

    await waitFor(() => {
      expect(submitReview).toHaveBeenCalledWith({
        bookId: 123,
        userId: 42,
        content: "This is a great book! I loved the characters.",
        rating: 5,
      });
    });

    expect(onReviewCreated).toHaveBeenCalled();
  });
});
