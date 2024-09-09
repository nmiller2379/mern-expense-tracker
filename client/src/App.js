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
        setTransactions(res.data);
        calculateAmounts(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const calculateAmounts = (transactions) => {
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = parseFloat(
      amounts.reduce((acc, curr) => acc + curr, 0).toFixed(2)
    );
    const income = parseFloat(
      amounts
        .filter((amount) => amount > 0)
        .reduce((acc, curr) => acc + curr, 0)
        .toFixed(2)
    );
    const expense = parseFloat(
      amounts
        .filter((amount) => amount < 0)
        .reduce((acc, curr) => acc + curr, 0)
        .toFixed(2)
    );

    setBalance(total);
    setIncome(income);
    setExpense(expense);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction._id !== id
    );
    setTransactions(updatedTransactions);
    calculateAmounts(updatedTransactions);

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
    const tempId = Date.now().toString();
    const updatedTransaction = {
      ...transaction,
      amount: parseFloat(transaction.amount),
      _id: tempId,
    };
    const updatedTransactions = [...transactions, updatedTransaction];
    setTransactions(updatedTransactions);
    const balance = updatedTransactions.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    setBalance(balance);
    const income = updatedTransactions
      .filter((item) => item.amount > 0)
      .reduce((acc, curr) => acc + curr.amount, 0);
    setIncome(income);
    setExpense(balance - income);

    // Perform the POST request to save the transaction to the server
    axios
      .post("http://localhost:8080/api/transactions", transaction)
      .then((res) => {
        const permanentId = res.data._id;
        const updatedTransaction = {
          ...transaction,
          amount: parseFloat(transaction.amount),
          _id: permanentId,
        };
        setTransactions((prevTransactions) => prevTransactions.filter(t => t._id !== tempId).concat(updatedTransaction));
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
        <Balance balanceAmount={balance.toFixed(2)} />
        <IncomeExpense
          amount={expense.toFixed(2)}
          text="Expense"
        />
        <IncomeExpense
          amount={income.toFixed(2)}
          text="Income"
        />
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
