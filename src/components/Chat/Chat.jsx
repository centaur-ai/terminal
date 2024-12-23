import {
  Box,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import SendIcon from "@mui/icons-material/Send";

function Chat() {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");


  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };


  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <TextField
        multiline
        rows={11}
        fullWidth
        placeholder="Ask me a question"
        variant="outlined"
        value={text}
        onChange={handleTextChange}
        sx={{
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />
      <IconButton
        color="primary"
        disabled={!text}
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
            color: toggle ? "white" : "grey.700",
          }}
        >
          PWL
        </Typography>
      </Box>
    </Box>
  );
}

export default Chat;
