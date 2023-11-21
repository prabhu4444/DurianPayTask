const fs = require("fs");
const csv = require("csv-parser");
const DatasetModel = require("../models/datasetModel");
const { connectToDatabase } = require("../config/db");

async function readAndSaveCSV(filePath) {
  connectToDatabase();
  const data = [];

  try {
    const stream = fs
      .createReadStream(filePath)
      .pipe(csv())
      .on("data", async (row) => {
        data.push(row);

        const datasetEntry = new DatasetModel(row);
        await datasetEntry.save();
      });

    await new Promise((resolve) => stream.on("end", resolve));
    console.log("CSV file data successfully saved to MongoDB");
  } catch (error) {
    console.error("Error reading or saving CSV file:", error);
  }
}

module.exports = { readAndSaveCSV };
