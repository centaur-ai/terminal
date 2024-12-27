import {
  Avatar,
  Box,
  Card,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import Chat from "./components/Chat/Chat";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SpotlightEffect from "./components/SpotlightEffect";
import Suggestions from "./components/Suggestions/Suggestions";
import suggestions from "./utils/suggestions";
import { useNavigate } from "react-router-dom";

function App({
  setSelectedSuggestion,
  toggleTheme,
  darkMode,
  text,
  setText,
  postFile,
  postMessage,
}) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm")); // 0 - 600
  const smAndMd = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600 - 900
  const mdAndLg = useMediaQuery(theme.breakpoints.between("md", "lg")); // 900 - 1200

  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = async (suggestion) => {
    setSelectedSuggestion(suggestion);
    setIsTransitioning(true);
    const { id } = await postFile(suggestion);
    navigate(`/reasoning/${id}`);
  };

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
      <SpotlightEffect />
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
          src="/Logo_v1.png"
          sx={{
            width: 120,
            height: 120,
            transition: "transform 2s ease-in-out, box-shadow 0.5s ease-in-out",
            boxShadow: "0 0 10px #a0a0a0, 0 0 20px #a0a0a0, 0 0 30px #a0a0a0",
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
            width: mdAndLg
              ? "70vw"
              : smAndMd
              ? "90vw"
              : smDown
              ? "none"
              : "50vw",
            padding: "25px",
            borderRadius: "20px",
            backgroundColor: "background.paper",
          }}
        >
          <Box
            sx={{
              width: "100%",
              flex: 1,
              marginBottom: 2,
            }}
          >
            <Chat text={text} setText={setText} postMessage={postMessage} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: smDown ? "350px" : "100%",
              gap: "10px",
            }}
          >
            {suggestions.map((suggestion) => (
              <Suggestions
                smDown={smDown}
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
