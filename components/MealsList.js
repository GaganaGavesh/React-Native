import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import MealItem from "./MealItem";

const MealsList = (props) => {
  const renderMealItem = (itemData) => {
    return (
      <MealItem
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: { mealId: itemData.item.id },
          });
        }}
        title={itemData.item.title}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        duration={itemData.item.duration}
        image={itemData.item.imageUrl}
      />
    );
  };
  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    justifyContent: "center", //along with the main axis
    alignItems: "center", //along with the cross axis
    flex: 1,
    margin: 10,
  },
});

export default MealsList;
