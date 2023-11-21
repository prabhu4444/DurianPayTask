import React from "react";
import "../StyleSheets/resultstable.css";

function ResultsTable({ searchResults }) {
  console.log("Search Results in ResultsTable:", searchResults);
  //Cheack if the results
  if (!searchResults || searchResults.length === 0) {
    return <p>No results found.</p>;
  }

  const headers = Object.keys(searchResults[0]);

  //Displaying the result table
  return (
    <div className="table-container">
      <h2 className="h2-container">Search Results :</h2>
      <table className="custom-table" border="1">
        <thead>
          <tr>
            <th className="table-header">Product ID</th>
            <th className="table-header">Product Name</th>
            <th className="table-header">Product Image</th>
            <th className="table-header">Product listing URL</th>
            <th className="table-header">Product Link</th>
            <th className="table-header">Product Price</th>
            <th className="table-header">Rating</th>
            <th className="table-header">Site</th>
            <th className="table-header">Rank in search</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((product, index) => (
            <tr key={index} className="table-row">
              <td className="table-cell">{product._unit_id}</td>
              <td className="table-cell">{product.product_title}</td>
              <td className="table-cell">
                <img
                  className="product-image"
                  src={product.product_image}
                  alt={product.product_title}
                />
              </td>
              <td className="table-cell">
                <a
                  className="link"
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Listing Link
                </a>
              </td>
              <td className="table-cell">
                <a
                  className="link"
                  href={product.product_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Product Link
                </a>
              </td>
              <td className="table-cell">{product.product_price}</td>
              <td className="table-cell">{product.relevance}</td>
              <td className="table-cell">{product.source}</td>
              <td className="table-cell">{product.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ResultsTable;
