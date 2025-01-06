import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Divider,
  Fab,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const ReasoningBox = ({
  evaluate,
  setSelectedSuggestion,
  setText,
  description,
  bestTheory,
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
            {description}
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
              sx={{
                width: "100%",
                mb: -2,
              }}
            >
              <AccordionSummary
                expandIcon={item.type === "query" ? <ExpandMoreIcon /> : null}
                sx={{
                  bgcolor: "grey.800",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "16px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "gray",
                      color: "white",
                      borderRadius: "10px",
                      padding: "0px 0px",
                      textTransform: "none",
                    }}
                    disableElevation
                    disableRipple
                  >
                    {item.type}
                  </Button>
                  <br/>
                  {item.axiom}
                </Typography>
              </AccordionSummary>
              {
                item.type === "query" ? (
                  <AccordionDetails
                    sx={{
                      mb: -6,
                      pb: 4,
                      bgcolor: "grey.800",
                    }}
                  >
                    <hr />
                    <Typography>
                      Best Theory:
                      <br/>
                      {bestTheory}
                    </Typography>
                  </AccordionDetails>
                ) : null
              }
            </Accordion>
            <Accordion
              expanded={true}
              sx={{
                width: "100%",
                borderRadius: "30px",
              }}
            >
              <Divider sx={{ bgcolor: "grey.600" }} />
              <AccordionSummary
                sx={{
                  bgcolor: "grey.800",
                }}
              >
                <Typography
                  variant="h7"
                >
                  {item.description}
                </Typography>
              </AccordionSummary>
            </Accordion>
            <AccordionDetails
              sx={{
                height: "35px",
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
                Probability: {item.rate && parseFloat(item.rate).toFixed(2)}
              </Typography>
            </AccordionDetails>
            <br/>
          </React.Fragment>
        ))}
      </Card>
    </Box>
  );
};

export default ReasoningBox;
