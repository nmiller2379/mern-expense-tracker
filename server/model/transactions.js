const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);
