import { useContext } from "react";
import { Text } from "react-native";
import ExpensesOutPut from "../components/Expenses/ExpensesOutPut";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDate } from "../utils/date";

const RecentExpenses = () => {
  const expenseCtx = useContext(ExpensesContext);
  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDate(today, 7);
    return expense.date > date7DaysAgo && expense.date <= today;
  });
  return <ExpensesOutPut periodName="last week" expenses={recentExpenses} />;
};

export default RecentExpenses;
