import React from "react";
import Transaction from "../Transaction/Transaction";

export default function TransactionList() {
  return (
    <div>
      <h3>History</h3>
      <ul id="list" className="list">
        <Transaction />
      </ul>
    </div>
  );
}
