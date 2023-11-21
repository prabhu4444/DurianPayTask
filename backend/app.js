const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4500;
const DatasetModel = require("./models/datasetModel.js");
const { connectToDatabase } = require("./config/db.js");
const mongoose = require("mongoose");

app.use(cors({
    origin : ["https://durian-pay-task-frontend.vercel.app"],
    methods : ["POST","GET"],
    credential : true
  }
));

//These lines of code were used once only to enter the data into the db.
/*
const { readAndSaveCSV } = require('./services/uploadcsv.js');
const filePath = './kaggle_ecommerce_dataset.csv';
readAndSaveCSV(filePath);
*/
app.use(express.json());

db = connectToDatabase();
db.once("open", () => {
  console.log("Connected to MongoDB");
});
// For testing purpose
app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

// I used to find max number in a String(To extract the price)
const extractMaxPrice = (priceString) => {
  const matches = priceString.match(/\d+(\.\d+)?/g);

  if (matches) {
    const numericValues = matches.map(parseFloat);
    return Math.max(...numericValues);
  }

  return 0;
};

app.post("/api/search", async (req, res) => {
  const { searchTerm, filter, numberOfResults, comparisonList } = req.body;

  try {
    const regex = new RegExp(searchTerm, "i");

    const query = { query: regex };

    let sortedResults;

    //This is the Sort by Price filter Logic
    if (filter === "highestPrice" || filter === "lowestPrice") {
      const sortKey = "product_price";
      const sortDirection = filter === "highestPrice" ? -1 : 1;

      sortedResults = await DatasetModel.find(query)
        .limit(Number(numberOfResults))
        .exec();

      sortedResults.sort((a, b) => {
        const maxPriceA = extractMaxPrice(a[sortKey]);
        const maxPriceB = extractMaxPrice(b[sortKey]);

        return (maxPriceA - maxPriceB) * sortDirection;
      });
      //This is the Sort by Rating filter Logic
    } else if (filter === "highestRating") {
      sortedResults = await DatasetModel.find(query)
        .limit(Number(numberOfResults))
        .sort({ relevance: -1 })
        .exec();
    } else if (filter === "lowestRating") {
      sortedResults = await DatasetModel.find(query)
        .limit(Number(numberOfResults))
        .sort({ relevance: 1 })
        .exec();
    } else {
      sortedResults = await DatasetModel.find(query)
        .limit(Number(numberOfResults))
        .exec();
    }
    //This is the Listed in selected sites given filter Logic
    const filteredResults = sortedResults.filter((result) =>
      comparisonList.includes(result.source)
    );

    res.json({
      searchTerm,
      filter,
      numberOfResults,
      comparisonList,
      searchResults: filteredResults,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
