# Expense Tracker

This is a simple expense tracker that allows you to add and remove transactions and see your balance, income, and expenses. It is built with React.js on the front end and uses Express.js and MongoDB on the back end.

## Table of contents

- [Expense Tracker](#expense-tracker)
- [Table of contents](#table-of-contents)
- [User stories](#user-stories)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [Plans](#plans)
- [License](#license)

## User stories

## Technologies

## Setup

## Usage

## Plans
**Component Tree**
```bash
App
├── Header
├── Balance
├── IncomeExpenses
├── TransactionList
│   └── Transaction
└── AddTransaction
```
- Header: Contains the title of the app in an h2 tag.
- Balance: Contains an h4 tag with the text "Your balance" and an h1 tag with the balance amount.
- IncomeExpenses: Contains an h4 tag with the text "Income" and an h4 tag with the text "Expense". Each of these tags contains a p tag with the amount of income or expenses.
- TransactionList: Contains an h3 tag with the text "History" and a list of Transaction components.
- Transaction: Contains a list item with the transaction text and amount. The amount is displayed in red if it is a negative number.
- AddTransaction: Contains an h3 tag with the text "Add new transaction:" and a form with two inputs and a button. The first input is for the transaction text and the second input is for the amount. The amount input has a placeholder text of "Enter amount..." and a value of 0. The button has the text "Add transaction".

**State**
Manage state with useState.
- balance: A number representing the user's balance.
- transactions: An array of objects representing each transaction. Each object has a text property and an amount property.
- text: A string representing the text input in the AddTransaction component.
- amount: A number representing the amount input in the AddTransaction component.

**Actions**
- getTransactions: Fetches the transactions from the database and sets the transactions state.
- postTransaction: Adds a new transaction to the database and updates the transactions state.
- deleteTransaction: Deletes a transaction from the database and updates the transactions state.

**Reducers**
- transactionReducer: Handles the state changes for the transactions state.

**Context**
- TransactionContext: Provides the state and actions to the components that need them.

**Server-side API**
- GET /api/transactions: Returns an array of transactions from the database.
- POST /api/transactions/add: Adds a new transaction to the database.
- DELETE /api/transactions/:id: Deletes a transaction from the database.


