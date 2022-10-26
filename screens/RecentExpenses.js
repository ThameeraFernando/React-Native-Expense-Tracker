import { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import ExpensesOutPut from "../components/Expenses/ExpensesOutPut";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDate } from "../utils/date";
import { fetchExpense } from "../utils/http";

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expenseCtx = useContext(ExpensesContext);
  useEffect(() => {
    async function getExpense() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpense();
        expenseCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }

      setIsFetching(false);
      // setFetchExpenses(expenses);
    }
    getExpense();
  }, []);
  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDate(today, 7);
    // console.log(date7DaysAgo);
    return expense.date > date7DaysAgo && expense.date <= today;
  });
  const errorHandler = () => {
    setError(null);
  };
  if (isFetching) {
    return <LoadingOverlay />;
  }
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  return (
    <ExpensesOutPut
      periodName="last week"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7 days"
    />
  );
};

export default RecentExpenses;
