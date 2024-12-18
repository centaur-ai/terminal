import React from "react";
import ReasoningDetails from "../components/Reasoning/ReasoningDetails";

const Reasoning = ({ selectedSuggestion }) => {
  return (
    <>
      <ReasoningDetails selectedSuggestion={selectedSuggestion} />
    </>
  );
};

export default Reasoning;
