import "./index.css";

import { StrictMode, useState } from "react";

import AppRoutes from "./AppRoutes.jsx";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createRoot } from "react-dom/client";
import getTheme from "./theme.js";

function Container() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={getTheme(darkMode)}>
      <CssBaseline />
      <AppRoutes toggleTheme={toggleTheme} darkMode={darkMode} />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Container />
  </StrictMode>
);
