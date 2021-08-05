import React, { useState } from "react";
import { Button, Modal, StyleSheet, TextInput, View } from "react-native";

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState("");

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const onPressAddGoal = () => {
    props.addGoalHandler(enteredGoal);
    setEnteredGoal("");
  };

  const onPressCancel = () => {
    props.cancelModal();
    setEnteredGoal("");
  };

  return (
    <Modal visible={props.visibleModal} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goal"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonsContainer}>
          <Button
            title="CANCEL"
            color="red"
            onPress={onPressCancel}
          />
          <Button title="ADD" onPress={onPressAddGoal} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    //flexDirection: "row",//default column
    flex: 1, //takes the full height and flex the input container
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    width: "80%",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",//if container has no width we can not spread items
    //so add a width to the container
    width: "35%"
  }
});

export default GoalInput;
