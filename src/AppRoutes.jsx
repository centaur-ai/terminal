import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import React from "react";
import Reasoning from "./pages/Reasoning";
import useEvaluate from "./hooks/useEvaluate";

const AppRoutes = ({ toggleTheme, darkMode }) => {
  const [selectedSuggestion, setSelectedSuggestion] = React.useState(null);
  const [text, setText] = React.useState("");

  const { postFile, postMessage } = useEvaluate();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              postMessage={postMessage}
              postFile={postFile}
              text={text}
              setText={setText}
              selectedSuggestion={selectedSuggestion}
              setSelectedSuggestion={setSelectedSuggestion}
              toggleTheme={toggleTheme}
              darkMode={darkMode}
            />
          }
        />
        <Route
          path="/reasoning/:id"
          element={
            <Reasoning
              setText={setText}
              setSelectedSuggestion={setSelectedSuggestion}
              selectedSuggestion={selectedSuggestion}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
