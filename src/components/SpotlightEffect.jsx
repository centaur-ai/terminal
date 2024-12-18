import React from "react";

const SpotlightEffect = () => {
  const spotlightStyle = {
    position: "fixed",
    top: "-40%",
    left: "-40%",
    width: "60%",
    height: "100%",
    background: "radial-gradient(ellipse at 20% 20%, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1) 40%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  };

  return <div style={spotlightStyle}></div>;
};

export default SpotlightEffect;
