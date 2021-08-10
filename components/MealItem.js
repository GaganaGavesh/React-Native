import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MealItem = (props) => {
  return (
    <View styles={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectMeal}>
        <View>
          <View style={styles.mealRow}>
            <Text>{props.title}</Text>
          </View>
          <View style={styles.mealRow}/>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
      height: 300,
      width: '100%',
      backgroundColor: '#ccc',
  },
  mealRow: {
    flexDirection: "row",
  },
});

export default MealItem;
