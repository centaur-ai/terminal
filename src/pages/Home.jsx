import App from "../App";
import React from "react";

const Home = ({
  selectedSuggestion,
  toggleTheme,
  darkMode,
  text,
  setText,
  handleClick,
  isTransitioning,
  setSelectedSuggestion,
  postFile,
  postMessage,
}) => {
  return (
    <>
      <App
        selectedSuggestion={selectedSuggestion}
        setSelectedSuggestion={setSelectedSuggestion}
        text={text}
        setText={setText}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
        isTransitioning={isTransitioning}
        handleClick={handleClick}
        postFile={postFile}
        postMessage={postMessage}
      />
    </>
  );
};

export default Home;
