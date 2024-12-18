import React from "react";
import ReasoningDetails from "../components/Reasoning/ReasoningDetails";
import useEvaluate from "../hooks/useEvaluate";

const Reasoning = ({ selectedSuggestion }) => {
  const { evaluate } = useEvaluate();

  return (
    <>
      <ReasoningDetails
        evaluate={evaluate}
        selectedSuggestion={selectedSuggestion}
      />
    </>
  );
};

export default Reasoning;
