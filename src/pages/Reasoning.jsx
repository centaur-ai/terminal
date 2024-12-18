import React from "react";
import ReasoningBox from "../components/Reasoning/ReasoningBox";
import useEvaluate from "../hooks/useEvaluate";

const Reasoning = ({ selectedSuggestion }) => {
  const { evaluate } = useEvaluate();

  return (
    <>
      <ReasoningBox
        evaluate={evaluate}
        selectedSuggestion={selectedSuggestion}
      />
    </>
  );
};

export default Reasoning;
