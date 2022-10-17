import { useContext } from "react";
import { Text } from "react-native";
import ExpensesOutPut from "../components/Expenses/ExpensesOutPut";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const expenseCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutPut
      periodName="Total"
      expenses={expenseCtx.expenses}
      fallbackText="No expenses found"
    />
  );
};

export default AllExpenses;
