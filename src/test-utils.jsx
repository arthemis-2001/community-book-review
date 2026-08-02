import { render } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { MemoryRouter } from "react-router-dom";

function Providers({ children }) {
  return (
    <Provider>
      <ColorModeProvider>{children}</ColorModeProvider>
    </Provider>
  );
}

function RouterProviders({ children, initialEntries = ["/"] }) {
  return (
    <Provider>
      <ColorModeProvider>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </ColorModeProvider>
    </Provider>
  );
}

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

const renderWithRouter = (ui, options = {}) =>
  render(ui, { wrapper: RouterProviders, ...options });

export * from "@testing-library/react";
export { customRender as render, renderWithRouter };
