import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Button = ({ children, onPress, mode, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttontext, mode === "flat" && styles.flatText]}>
            {" "}
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttontext: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});