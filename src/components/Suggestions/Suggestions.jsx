import { Button, Stack, Typography } from "@mui/material";

import React from "react";

function Suggestions({ suggestion, handleClick }) {
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
        }}
        onClick={() => handleClick(suggestion)}
      >
        <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>
          {suggestion.summary}
        </Typography>
        <Typography sx={{ textAlign: "left", fontSize: "14px" }}>
          {suggestion.description}
        </Typography>
      </Stack>
    </Button>
  );
}

export default Suggestions;
