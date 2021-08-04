import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState("");

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const onPressAddGoal = () => {
    props.addGoalHandler(enteredGoal);
    setEnteredGoal('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Course Goal"
        style={styles.inputContainer}
        onChangeText={goalInputHandler}
        value={enteredGoal}
      />
      <Button title="ADD" onPress={onPressAddGoal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
});

export default GoalInput;
