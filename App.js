import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGaols] = useState([]);
  const [isAddMode, setAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setCourseGaols((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle },
    ]); //get the latest snapshot of the goals
    //setEnteredGoal('');
    setAddMode(false);
  };

  const removeGoalHandler = (goalId) => {
    setCourseGaols((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId); //return the filtered object
    });
  };

  const cancelGoalAdditionHandler = () => {
    setAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setAddMode(true)}/>
      <GoalInput visibleModal={isAddMode} addGoalHandler={addGoalHandler} cancelModal={cancelGoalAdditionHandler}/>
      <FlatList
        keyExtractor={(item, index) => item.id} //meken pluwan api khmada key eka ganne kiyala Flat list ekata kiyanna
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.id}
            title={itemData.item.value}
            onDelete={removeGoalHandler}
          />
        )}
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
