const mongoose = require("mongoose");

function connectToDatabase() {
  const uri =
    "mongodb+srv://prabhusatyam44:QNeWXKuBoMFklkCg@durianpay-db.csy1q1v.mongodb.net/?retryWrites=true&w=majority";

  mongoose.connect(uri);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  return db;
}

module.exports = { connectToDatabase };
