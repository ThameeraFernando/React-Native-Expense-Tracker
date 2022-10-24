import { useState } from "react";
import Input from "./Input";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";
const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValue,
}) => {
  const [inputValue, setInputValue] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValue ? defaultValue.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description.toString() : "",
      isValid: true,
    },
  });
  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputValue((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };
  const submitHandler = () => {
    const expenseData = {
      amount: +inputValue.amount.value,
      description: inputValue.description.value,
      date: new Date(inputValue["date"]["value"]),
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData["date"].toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid input", "Please check your input values!");
      setInputValue((curIn) => {
        return {
          amount: { value: curIn.amount.value, isValid: amountIsValid },
          date: { value: curIn.date.value, isValid: dateIsValid },
          description: {
            value: curIn.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  };
  const formIsInvalid =
    !inputValue.amount.isValid ||
    !inputValue.date.isValid ||
    !inputValue.description.isValid;
  return (
    <View style={styles.formStyles}>
      <Text style={styles.title}>Your Expenses</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!inputValue.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValue.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!inputValue.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValue.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          //   autoCorrect: false, //default is true
          //   autoCapitalize: "words",
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValue.description.value,
        }}
        invalid={!inputValue.description.isValid}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  formStyles: {
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
