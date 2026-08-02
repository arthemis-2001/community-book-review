import { describe, it, expect, vi } from "vitest";
import { render, screen } from "./test-utils";
import App from "./App.jsx";

var mockedUseAuth = vi.fn();

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => mockedUseAuth(),
}));

describe("App", () => {
  it("renders login and signup links when the user is logged out", () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      profile: null,
      loading: false,
      logout: vi.fn(),
    });

    render(<App />);

    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /signup/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
  });

  it("renders loading state while auth is initializing", () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      profile: null,
      loading: true,
      logout: vi.fn(),
    });

    render(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
