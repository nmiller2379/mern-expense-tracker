import React from "react";

export default function Transaction({ id, date, text, amount, onClick }) {
  return (
    <div>
      <li key={id}>
        <strong>{date}:</strong> {text}{" "}
        <span className={parseFloat(amount) < 0 ? "red" : "green"}>
          {amount}
        </span>{" "}
        <button onClick={() => onClick(id)} className="delete-btn">
          x
        </button>
      </li>
      <hr />
    </div>
  );
}
