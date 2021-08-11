import React from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Platform,
  Text,
  View,
} from "react-native";

import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealItem from "../components/MealItem";

const CategoryMealScreen = (props) => {
  //console.log('category meal props', props)
  //getParams allow us to extract the data using the keys of the params we have sent from the previous component

  const catId = props.navigation.getParam("categoryId");

  //const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0 //category id eka his nam -1 thama enne
  );

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
    <View style={styles.screen}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

//meka object property ekak neeh
//mekata harcoded object ekak set karannath ahaki
//dynamic values ganna pluwan widiyata function ekak set karagannath ahaki ona nam
//habai e function eka awasanedi return ekak denna onaa apata dynamic values ekkama
CategoryMealScreen.navigationOptions = (navigationData) => {
  //console.log('Navigation data', navigationData);
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center", //along with the main axis
    alignItems: "center", //along with the cross axis
    flex: 1,
    margin: 10,
  },
});

export default CategoryMealScreen;
