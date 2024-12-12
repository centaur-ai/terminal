import { createTheme } from "@mui/material/styles";

const getTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
      primary: {
        main: darkMode ? "#bdbdbd" : "#757575",
      },
      text: {
        primary: darkMode ? "#e0e0e0" : "#212121",
      },
    },
  });

export default getTheme;
