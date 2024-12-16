import { Avatar, Box, Card, IconButton } from "@mui/material";

import Chat from "./components/Chat/Chat";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import React from "react";
import Suggestions from "./components/Suggestions/Suggestions";

function App({ toggleTheme, darkMode }) {
  const suggestions = [
    {
      id: 1,
      summary: "Socrates",
      description: "All humans are mortal, and Socrates is human",
    },
    {
      id: 2,
      summary: "Agatha",
      description:
        "The butler claims he was polishing the silver in the dining room when the shot was fired.",
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          height: "100vh",
          backgroundColor: "background.default",
          padding: "20px",
        }}
      >
        <IconButton
          color="primary"
          onClick={toggleTheme}
          sx={{
            borderRadius: "50px",
            backgroundColor: darkMode ? "#424242" : "#e0e0e0",
          }}
        >
          <DarkModeIcon
            sx={{
              color: darkMode ? "#ffffff" : "#000000",
            }}
          />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            backgroundColor: "background.default",
          }}
        >
          <Avatar
            src="../../public/Logo_v1.png"
            sx={{
              width: 120,
              height: 120,
              transition: "transform 2s ease-in-out, box-shadow 0.5s ease-in-out",
              boxShadow: "0 0 10px #a0a0a0, 0 0 20px #a0a0a0, 0 0 30px #a0a0a0",
            }}
          />
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
              height: "60vh",
              width: "50vw",
              padding: "25px",
              borderRadius: "20px",
              backgroundColor: "background.paper",
            }}
          >
            <Chat />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                gap: "10px",
              }}
            >
              {suggestions.map((suggestion) => (
                <Suggestions key={suggestion.id} suggestion={suggestion} />
              ))}
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default App;
