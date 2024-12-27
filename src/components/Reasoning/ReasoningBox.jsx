import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Divider,
  Fab,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const ReasoningBox = ({
  selectedSuggestion,
  evaluate,
  setSelectedSuggestion,
  setText,
  file,
  message,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "background.default",
        padding: "20px",
        position: "relative",
      }}
    >
      <Fab
        sx={{
          position: "absolute",
          top: "15px",
          left: "20px",
        }}
        size="small"
        onClick={() => {
          window.history.back();
          setSelectedSuggestion(null);
          setText("");
        }}
      >
        <KeyboardBackspaceIcon />
      </Fab>

      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "90vh",
          width: "80vw",
          padding: "25px",
          borderRadius: "20px",
          backgroundColor: "background.paper",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Typography sx={{ textAlign: "center", fontSize: "18px" }}>
            {selectedSuggestion ? file.description : message.content}
            <Box>
              <br />
              <AutoAwesomeIcon
                sx={{
                  animation: "flash 2s infinite",
                  "@keyframes flash": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0 },
                    "100%": { opacity: 1 },
                  },
                }}
              />
            </Box>
          </Typography>
          <Divider sx={{ mt: 2, mb: 2 }} />
        </Box>
        {evaluate.map((item, index) => (
          <React.Fragment key={index}>
            <Accordion
              expanded={true}
              sx={{
                width: "100%",
                borderRadius: "10px",
              }}
            >
              <AccordionSummary
                sx={{
                  height: "65px",
                  bgcolor: "grey.800",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "18px",
                  }}
                >
                  {item.axiom}
                </Typography>
              </AccordionSummary>
              <Divider sx={{ bgcolor: "grey.600" }} />
              <AccordionSummary
                sx={{
                  height: "65px",
                  bgcolor: "grey.800",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "18px",
                  }}
                >
                  {item.description}
                </Typography>
              </AccordionSummary>
            </Accordion>
            <AccordionDetails
              sx={{
                height: "40px",
                width: "95%",
                mt: -2,
                bgcolor: "grey.400",
                color: "black",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
                textAlign={"center"}
              >
                {item.rate}
              </Typography>
            </AccordionDetails>
          </React.Fragment>
        ))}
      </Card>
    </Box>
  );
};

export default ReasoningBox;
