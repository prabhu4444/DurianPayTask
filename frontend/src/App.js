import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchForm from "./Components/SearchForm";
import ResultsPage from "./Components/ResultsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchForm />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
