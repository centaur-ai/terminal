import { Box, IconButton, Switch, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

function Chat({ text, setText, postMessage }) {
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSend = async () => {
    try {
      const { id } = await postMessage(text, toggle ? "true" : undefined);

      navigate(`/reasoning/${id}`);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        multiline
        fullWidth
        placeholder="Ask me a question"
        variant="outlined"
        value={text}
        onChange={handleTextChange}
        sx={{
          borderRadius: "8px",
          marginBottom: "10px",
          flex: 1,
          "& .MuiInputBase-root": {
            height: "100%",
          },
          "& .MuiInputBase-input": {
            height: "100% !important",
            overflowY: "auto",
          },
        }}
      />
      <IconButton
        color="primary"
        disabled={!text}
        onClick={handleSend}
        sx={{
          position: "absolute",
          bottom: 15,
          right: 8,
        }}
      >
        <SendIcon />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          bottom: 15,
          right: 50,
        }}
      >
        <Switch
          checked={toggle}
          onChange={handleToggle}
          name="pwlSwitch"
          color="primary"
        />
        <Typography
          sx={{
            position: "absolute",
            right: 60,
            bottom: 7,
            color: toggle ? "primary.main" : "grey.700",
          }}
        >
          PWL
        </Typography>
      </Box>
    </Box>
  );
}

export default Chat;
