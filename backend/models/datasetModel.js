const mongoose = require("mongoose");

const datasetSchema = new mongoose.Schema({
  _unit_id: Number,
  relevance: Number,
  "relevance:variance": Number,
  product_image: String,
  product_link: String,
  product_price: String,
  product_title: String,
  query: String,
  rank: Number,
  source: String,
  url: String,
  product_description: String,
});

datasetSchema.index({ query: 1 }, { name: "SearchTermIndex" });

const DatasetModel = mongoose.model("Dataset", datasetSchema);

module.exports = DatasetModel;
