import { Box, IconButton, TextField } from "@mui/material";

import React from "react";
import SendIcon from "@mui/icons-material/Send";

function Chat() {
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
        sx={{
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />
      <IconButton
        color="primary"
        sx={{
          position: "absolute",
          bottom: 15,
          right: 8,
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
}

export default Chat;
