import React from "react";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import Balance from "./components/Balance/Balance";
import Header from "./components/Header/Header";
import IncomeExpense from "./components/IncomeExpense/IncomeExpense";
import TransactionList from "./components/TransactionList/TransactionList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpense text="Expense" amount={0} />
        <IncomeExpense text="Income" amount={0} />
        <TransactionList />
        <AddTransaction />
      </div>
    </div>
  );
}

export default App;
