import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RentalProvider } from "./contexts/RentalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RentalProvider>
      <App />
    </RentalProvider>
  </StrictMode>
);
