import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import Balance from "./components/Balance/Balance";
import Header from "./components/Header/Header";
import IncomeExpense from "./components/IncomeExpense/IncomeExpense";
import TransactionList from "./components/TransactionList/TransactionList";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/transactions")
      .then((res) => {
        console.log(res.data);
        const balance = res.data.reduce((acc, curr) => acc + curr.amount, 0);
        const income = res.data
          .filter((item) => item.amount > 0)
          .reduce((acc, curr) => acc + curr.amount, 0);
        setTransactions(res.data);
        setExpense(balance - income);
        setBalance(balance);
        setIncome(income);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const deleteTransaction = (id) => {
    axios
      .delete(`http://localhost:8080/api/transactions/${id}`)
      .then((res) => {
        console.log(res.data);
        const updatedTransactions = transactions.filter(
          (transaction) => transaction._id !== id
        );
        const balance = updatedTransactions.reduce(
          (acc, curr) => acc + curr.amount,
          0
        );
        const income = updatedTransactions
          .filter((item) => item.amount > 0)
          .reduce((acc, curr) => acc + curr.amount, 0);
        setTransactions(updatedTransactions);
        setExpense(balance - income);
        setBalance(balance);
        setIncome(income);
      })
      .catch((err) => console.log(err));
  };

  const addTransaction = (transaction) => {
    // Update the state immediately
    const updatedTransaction = {
      ...transaction,
      _id: Date.now().toString(),
    };
    const updatedTransactions = [...transactions, updatedTransaction];
    setTransactions(updatedTransactions);
    const balance = updatedTransactions.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    setBalance(balance);

    // Perform the POST request to save the transaction to the server
    axios
      .post("http://localhost:8080/api/transactions", transaction)
      .then((res) => {
        console.log("Transaction saved to server:", res.data);
      })
      .catch((err) => {
        console.log(err);
        // Icebox: handle the error by reverting the state update or showing an error message
      });
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="App">
      <Header />
      <div className="container">
        <Balance balanceAmount={balance} />
        <IncomeExpense amount={expense} text="Expense" />
        <IncomeExpense amount={income} text="Income" />
        <TransactionList
          transactions={transactions}
          onClick={deleteTransaction}
        />
        <AddTransaction transactions={transactions} onClick={addTransaction} />
      </div>
    </div>
  );
}

export default App;
