import React from "react";

export default function Balance({ balanceAmount }) {
  return (
    <div id="balance">
      <h4>Balance Amount:</h4>
      <h1>${balanceAmount}</h1>
    </div>
  );
}
