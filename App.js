import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  TextInput,
  Text,
  View
} from "react-native";
import GoalItem from './components/GoalItem';
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGaols] = useState([]);

  const addGoalHandler = (goalTitle) => {
    setCourseGaols((currentGoals) => [...currentGoals, {id: Math.random().toString(), value: goalTitle}]); //get the latest snapshot of the goals
    //setEnteredGoal('');
  };

  return (
    <View style={styles.screen}>
      {/* <View style={styles.container}>
        <TextInput
          placeholder="Course Goal"
          style={styles.inputContainer}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <Button title="ADD" onPress={addGoalHandler} />
      </View> */}
      <GoalInput
        addGoalHandler={addGoalHandler}
        />
      <FlatList
        keyExtractor={(item, index) => item.id}//meken pluwan api khmada key eka ganne kiyala Flat list ekata kiyanna
        data={courseGoals}
        renderItem={itemData => <GoalItem title={itemData.item.value}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
  },
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
  listItem: {
    padding: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 10,
  },
});
