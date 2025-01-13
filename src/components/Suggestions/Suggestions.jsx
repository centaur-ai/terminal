import { Button, Stack, Typography } from "@mui/material";

import React from "react";

function Suggestions({ suggestion, handleClick, smDown }) {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        textTransform: "none",
      }}
    >
      <Stack
        direction={"column"}
        alignItems="flex-start"
        sx={{
          height: "80px",
          width: "100%",
        }}
        onClick={() => handleClick(suggestion)}
      >
        <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>
          {suggestion.summary}
        </Typography>
        <Typography
          sx={{ textAlign: "left", fontSize: smDown ? "10px" : "14px" }}
        >
          {suggestion.description.length > 100 ? suggestion.description.slice(0, 122) + " ..." :suggestion.description }
        </Typography>
      </Stack>
    </Button>
  );
}

export default Suggestions;
