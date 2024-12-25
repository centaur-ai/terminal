import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import React from "react";
import Reasoning from "./pages/Reasoning";
import useEvaluate from "./hooks/useEvaluate";

const AppRoutes = ({ toggleTheme, darkMode }) => {
  const [selectedSuggestion, setSelectedSuggestion] = React.useState(null);
  const [text, setText] = React.useState("");

  const { postFile, file, postMessage, message } = useEvaluate();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/reasoning/:id"
          element={
            <Reasoning
              file={file}
              message={message}
              setText={setText}
              setSelectedSuggestion={setSelectedSuggestion}
              selectedSuggestion={selectedSuggestion}
            />
          }
        />
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
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
