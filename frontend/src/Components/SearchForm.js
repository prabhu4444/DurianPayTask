import '../StyleSheets/searchform.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('none');
  const [numberOfResults, setNumberOfResults] = useState('30');
  const [comparisonList, setComparisonList] = useState(['eBay', 'Target', 'Shop.com', 'Overstock', 'walmart']);
  const [searchResults, setSearchResults] = useState(null);
  const navigate = useNavigate();


  const handleSearchTermChange = (e) => {
    const value = e.target.value.slice(0, 20); // Limit to 20 characters
    setSearchTerm(value);
  };
  
  const handleSubmit = async (e) => {

    e.preventDefault();
    // Updated apiUrl to match the backend URL
    const apiUrl = 'https://durian-pay-task.vercel.app//api/search';

    const searchData = {
      searchTerm,
      filter,
      numberOfResults,
      comparisonList,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Allow requests from any origin (for development)
        },
        body: JSON.stringify(searchData),
      });

      if (response.ok) {
        const result = await response.json(); // Handle the result as needed in your component
        console.log(result)
        console.log('Search results:', result.searchResults);
        setSearchResults(result.searchResults);

      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      //console.error('Error:', error.message);
    }
  };
  useEffect(() => {
    console.log('Search results in useEffect:', searchResults);
    // Redirect to the ResultsPage if there are search results
    if (searchResults !== null && searchResults.length > 0) {
      console.log('Redirecting to /results');
      navigate('/results',{state: { searchResults }});
    }
  }, [searchResults, navigate]);

//onSubmit(searchData);
  return (
    <div class="div-container">
    <form class="form-container" onSubmit={handleSubmit}>
      <h2 class="h2-container">Durianpay Tech Assignment</h2>
      <label class="label-container">
        Search Term:
        <input
        class="input-container"
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Enter Search Item here..."
        />
      </label>
      <label class="label-container">
        Filter:
        <select class="select-container" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="highestPrice">Highest Price</option>
          <option value="lowestPrice">Lowest Price</option>
          <option value="highestRating">Highest Rating</option>
          <option value="lowestRating">Lowest Rating</option>
          <option value="none">None of the above</option>
        </select>
      </label>
      <label class="label-container">
        Number of Results:
        <input
          class="input-container"
          type="number"
          value={numberOfResults}
          onChange={(e) => setNumberOfResults(e.target.value)}
        />
      </label>
      <label class="label-container">
        Comparison site:
        <select class="input-container comparison-select" multiple value={comparisonList} onChange={(e) => setComparisonList(Array.from(e.target.selectedOptions, option => option.value))}>
          <option value="eBay">ebay</option>
          <option value="Target">target</option>
          <option value="Shop.com">shop.com</option>
          <option value="Overstock">Overstock</option>
          <option value="walmart">walmart</option>
        </select>
      </label>
      
      <button class="button-container" type="submit" >Search</button>
    </form>
    </div>
  );
}

export default SearchForm;
