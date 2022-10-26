import axios from "axios";
const BACKEND_URL =
  "https://react-native-expense-tra-f3f7c-default-rtdb.firebaseio.com";
//add expense
export const storeExpense = async (expenseData) => {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
};

export const fetchExpense = async () => {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  const expense = [];
  for (const Key in response.data) {
    const expenseObj = {
      id: Key,
      amount: response.data[Key].amount,
      date: new Date(response.data[Key]["date"]),
      description: response.data[Key].description,
    };
    expense.push(expenseObj);
  }
  console.log(expense);
  return expense;
};

export const updateExpense = (id, expenseData) => {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id) => {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
};
