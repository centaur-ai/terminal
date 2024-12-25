import React from "react";
import ReasoningBox from "../components/Reasoning/ReasoningBox";
import useEvaluate from "../hooks/useEvaluate";

const Reasoning = ({
  selectedSuggestion,
  setSelectedSuggestion,
  setText,
  file,
  message,
}) => {
  const { evaluate } = useEvaluate();

  return (
    <>
      <ReasoningBox
        file={file}
        message={message}
        setText={setText}
        evaluate={evaluate}
        selectedSuggestion={selectedSuggestion}
        setSelectedSuggestion={setSelectedSuggestion}
      />
    </>
  );
};

export default Reasoning;
