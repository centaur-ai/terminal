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
import React, { useEffect, useRef } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const ReasoningBox = ({
  evaluate,
  setSelectedSuggestion,
  setText,
  description,
  query,
  reasoning
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollTo({
        top: cardRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [evaluate]);

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
          top: "20px",
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
        ref={cardRef}
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
            <br/>
            <hr width={100}/>
            Query: {query}
            <Box>
              <br />
              {reasoning && <AutoAwesomeIcon
                sx={{
                  animation: "flash 2s infinite",
                  "@keyframes flash": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0 },
                    "100%": { opacity: 1 },
                  },
                }}
              />
              }
            </Box>
          </Typography>
          <Divider sx={{ mt: 2, mb: 2 }} />
        </Box>
        {evaluate.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((item) => (
          <React.Fragment key={item.id}>
            <Accordion
              TransitionProps={{ timeout: 50 }}
              sx={{
                width: "100%",
                mb: -2,
              }}
            >
              <AccordionSummary
                expandIcon={item.type === "logical_form" ? <ExpandMoreIcon
                  titleAccess="Display this best theory"
                  sx={{
                  pointerEvents: "auto"
                    }}
                /> : null}
                sx={{
                  bgcolor: "grey.800",
                  pointerEvents: "none",
                  userSelect: "text",
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
                      padding: "0px 2px",
                      textTransform: "none",
                      mb: 1,
                    }}
                    disableElevation
                    disableRipple
                  >
                    {item.theory_log_probability === null ? "query" : item.type === "logical_form" ? "logical form" : item.type}
                  </Button>
                  <br/>
                  <Typography
                  sx={{fontStyle: "italic"}}>
                    {item.type !== "answer" && item.axiom}
                    {item.type === "answer" && query}
                  </Typography>
                </Typography>
              </AccordionSummary>
              {
                item.type === "logical_form" &&
                  <AccordionDetails
                    sx={{
                      mb: -6,
                      pb: 4,
                      bgcolor: "grey.800",
                    }}
                  >
                    <hr />
                    <Typography sx={{
                      fontStyle: "italic",
                      fontSize: 13,
                    }}>
                      Proof:
                      <br/>
                      {item.proof.steps.map(({step, formula, justification, theory_objects}) =>(
                        <>
                          Step: {step}
                          <br/>
                          Formula: {formula}
                          <br/>
                          Justification: {justification}
                          <br/>
                          Theory Objects: {theory_objects.join(", ")}
                          <hr/>
                        </>))}
                    </Typography>
                  </AccordionDetails>
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
                  userSelect: "text",
                  pointerEvents: "none",
                }}
              >
                <Typography
                  variant="h7"
                  sx={{
                    fontWeight: item.type === "answer" ? "bold": "normal",
                  }}
                >
                  {item.type !== "answer" && item.description}
                  {item.type === "answer" && `Answer: ${item.result}`}
                </Typography>
              </AccordionSummary>
            </Accordion>
            {item.theory_log_probability !== null && <AccordionDetails
              sx={{
                height: "35px",
                width: "95%",
                mt: -2,
                bgcolor: "grey.600",
                color: "white",
              }}
            >
              <Typography
                textAlign={"center"}
              >
                {item.type !== "answer" && `Log Probability: ${parseFloat(item.theory_log_probability).toFixed(2)}`}
                {item.type === "answer" && `True Probability: ${parseFloat(item.true_rate).toFixed(2)}`}
              </Typography>
            </AccordionDetails>}
            <br/>
          </React.Fragment>
        ))}
      </Card>
    </Box>
  );
};

export default ReasoningBox;
