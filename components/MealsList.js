import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import MealItem from "./MealItem";

const MealsList = (props) => {
  const favouriteMeals = useSelector(state => state.meals.favouriteMeals);//hooks wena ewage use karanna bari nisa 
  //meals tika aragena dagannawa

  const renderMealItem = (itemData) => {
    const isFavourite = favouriteMeals.some(meal => meal.id === itemData.item.id);
    return (
      <MealItem
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title,
              isFav: isFavourite,
            },
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
