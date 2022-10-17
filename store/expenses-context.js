import { createContext, useReducer, useState } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2022-10-17"),
  },
  {
    id: "e2",
    description: "Chair",
    amount: 199.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e3",
    description: "Bananas",
    amount: 69.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e4",
    description: "Book",
    amount: 19.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e5",
    description: "Laptop",
    amount: 1999.99,
    date: new Date("2021-12-19"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {},
});

const reducer = (state, action) => {
  if (action.type === "ADD") {
    const id = new Date().toString().toString() + Math.random().toString();
    return [...state, { ...action.payload, id: id }];
  } else if (action.type === "UPDATE") {
    const updatableExpenseIndex = state.findIndex(
      (expense) => expense.id === action.payload.id
    );
    const updatableExpense = state[updatableExpenseIndex];
    const updateItem = { ...updatableExpense, ...action.payload.data };
    const updatedExpenses = [...state];
    updatedExpenses[updatableExpenseIndex] = updateItem;
    return updatedExpenses;
  } else if (action.type === "DELETE") {
    return state.filter((expense) => expense.id !== action.payload);
  } else {
    return state;
  }
};

const ExpenseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, DUMMY_EXPENSES);
  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };
  const value = {
    expenses: state,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpenseContextProvider;
