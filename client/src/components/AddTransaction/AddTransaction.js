import React, { useState } from "react";

const AddTransaction = ({ onClick }) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div>
      <form>
        <div>
          <label>Description: </label>
          <input
            type="text"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <label>Amount: </label>
          <input
            type="number"
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </form>
      <button
        className="btn"
        onClick={() => {
          onClick({
            description: text,
            amount: parseFloat(amount).toFixed(2), // Ensure two decimal places
            date: new Date().toLocaleString(),
          });
          setText("");
          setAmount("");
        }}
      >
        Add transaction
      </button>
    </div>
  );
};

export default AddTransaction;
