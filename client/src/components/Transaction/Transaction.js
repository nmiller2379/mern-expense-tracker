import React from "react";


export default function Transaction({ id, date, text, amount, onClick }) {
  return (
    <li key={id}>
      {date}: {text} <span>{amount}</span> <button onClick={() => onClick(id)} className="delete-btn">x</button>
    </li>
  );
}
