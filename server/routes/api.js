const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Transaction = require("../model/transactions");

router.get("/transactions", (req, res) => {
  Transaction.find()
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/transactions", (req, res) => {
  const newTransaction = new Transaction(req.body);
  newTransaction
    .save()
    .then((transaction) => {
      console.log(transaction);
      res.json(transaction);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/transactions/:id", (req, res) => {
    Transaction.findByIdAndDelete(req.params.id)
        .then(() => {
        res.send("Transaction deleted");
        })
        .catch((err) => {
        res.status(400).json(err);
        });
    });

module.exports = router;
