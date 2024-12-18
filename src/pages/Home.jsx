import App from "../App";
import React from "react";

const Home = ({ setSelectedSuggestion, toggleTheme, darkMode }) => {
  return (
    <>
      <App
        setSelectedSuggestion={setSelectedSuggestion}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
      />
    </>
  );
};

export default Home;
