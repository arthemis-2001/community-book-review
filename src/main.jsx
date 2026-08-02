import { StrictMode } from "react";
import { Provider } from "@/components/ui/provider";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Provider>
        <ColorModeProvider>
          <App />
          <Toaster />
        </ColorModeProvider>
      </Provider>
    </AuthProvider>
  </StrictMode>,
);
