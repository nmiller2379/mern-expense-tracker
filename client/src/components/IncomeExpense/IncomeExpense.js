import React from "react";

export default function IncomeExpense({ text, amount }) {
  return (
    <div>
      <h4>{text}</h4>
      <p>${amount}</p>
    </div>
  );
}
