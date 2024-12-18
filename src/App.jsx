import { Avatar, Box, Card, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

import Chat from "./components/Chat/Chat";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Suggestions from "./components/Suggestions/Suggestions";
import { useNavigate } from "react-router-dom";

function App({ setSelectedSuggestion, toggleTheme, darkMode }) {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const handleClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setIsTransitioning(true);
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        navigate("/reasoning");
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, navigate]);

  return (
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
          className={isTransitioning ? "fade-out" : "fade-in"}
          src="../../public/centaur_logo.png"
          sx={{
            width: 120,
            height: 120,
            transition: "transform 2s ease-in-out",
            "&:hover": {
              transform: "rotateY(360deg)",
            },
          }}
        />
        <Card
          className={isTransitioning ? "fade-out" : "fade-in"}
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
              <Suggestions
                key={suggestion.id}
                suggestion={suggestion}
                handleClick={handleClick}
              />
            ))}
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

export default App;
