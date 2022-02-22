import React, { createContext, useContext, useReducer } from "react";
import { initialData } from "../constants/categories";
import { contextReducer } from "./contextReducer";

const initialContext =
  JSON.parse(localStorage.getItem("transaction")) || initialData;

const ExpenseTrackerContext = createContext(initialContext);

export const useExpenseContext = () => {
  return useContext(ExpenseTrackerContext);
};

export const ExpenseProvider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialContext);

  // Action Creators

  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };

  const addTransaction = (transaction, callback) => {
    console.log(" ----- transaction ----- ", transaction);
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
    callback();
  };

  const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);

  const value = {
    deleteTransaction,
    addTransaction,
    transactions,
    balance,
  };

  return (
    <ExpenseTrackerContext.Provider value={value}>
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
