import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import React from "react";
import Reasoning from "./pages/Reasoning";

const AppRoutes = ({ toggleTheme, darkMode }) => {
  const [selectedSuggestion, setSelectedSuggestion] = React.useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/reasoning"
          element={<Reasoning selectedSuggestion={selectedSuggestion} />}
        />
        <Route
          path="/"
          element={
            <Home
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
