import React from "react";
import ReasoningBox from "../components/Reasoning/ReasoningBox";
import useEvaluate from "../hooks/useEvaluate";

const Reasoning = () => {
  const { evaluate, description, query, bestTheory, reasoning } = useEvaluate();

  return (
    <>
      <ReasoningBox
        evaluate={evaluate}
        description={description}
        query={query}
        bestTheory={bestTheory}
        reasoning={reasoning}
      />
    </>
  );
};

export default Reasoning;
