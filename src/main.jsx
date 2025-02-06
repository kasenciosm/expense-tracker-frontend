import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalStyles } from "./styles/GlobalStyles.js";
import { GlobalProvider } from "./context/GlobalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyles />
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>
);
