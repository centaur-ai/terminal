import React from "react";
import ReasoningBox from "../components/Reasoning/ReasoningBox";
import useEvaluate from "../hooks/useEvaluate";

const Reasoning = () => {
  const { evaluate, description } = useEvaluate();

  return (
    <>
      <ReasoningBox
        evaluate={evaluate}
        description={description}
      />
    </>
  );
};

export default Reasoning;
