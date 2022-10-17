import { View, FlatList, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "Chair",
    amount: 199.99,
    date: new Date("2022-2-19"),
  },
  {
    id: "e3",
    description: "Bananas",
    amount: 69.99,
    date: new Date("2022-10-16"),
  },
  {
    id: "e4",
    description: "Book",
    amount: 19.99,
    date: new Date("2022-3-16"),
  },
  {
    id: "e5",
    description: "Laptop",
    amount: 1999.99,
    date: new Date("2021-6 -16"),
  },
];
const ExpensesOutPut = ({ expenses, periodName }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={periodName} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutPut;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
});
