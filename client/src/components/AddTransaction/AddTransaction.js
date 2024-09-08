import React, { useState } from "react";

export default function AddTransaction({ onClick }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  return (
    <div id="add-transaction">
      <h3>Add new transaction</h3>
      <form>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            placeholder="Enter text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <br />
          <label htmlFor="amount">
            Amount (negative = expense, positive = income)
          </label>
          <input
            type="number"
            id="amount"
            placeholder="Enter amount..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </form>
      <button
        className="btn"
        onClick={() =>
          onClick({
            description: text,
            amount: parseFloat(amount),
            date: new Date().toLocaleString(),
          })
        }
      >
        Add transaction
      </button>
    </div>
  );
}
