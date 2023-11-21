import React from "react";
import ResultsTable from "./ResultsTable";
import { useLocation } from "react-router-dom";

function ResultsPage() {
  const location = useLocation();
  const { searchResults } = location.state || {};

  return (
    <div>
      <ResultsTable searchResults={searchResults} />
    </div>
  );
}

export default ResultsPage;
