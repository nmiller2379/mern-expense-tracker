import React from "react";
import Transaction from "../Transaction/Transaction";

export default function TransactionList({ transactions, onClick }) {
  return (
    <div>
      <h3>History</h3>
      <ul id="list" className="list">
        {transactions.map((transaction) => (
          <Transaction
            key={transaction._id}
            id={transaction._id}
            date={transaction.date}
            text={transaction.description}
            amount={transaction.amount.toFixed(2)}
            onClick={onClick}
          />
        ))}
      </ul>
    </div>
  );
}
