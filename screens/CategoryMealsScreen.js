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
import MealsList from "../components/MealsList";

const CategoryMealScreen = (props) => {
  //console.log('category meal props', props)
  //getParams allow us to extract the data using the keys of the params we have sent from the previous component

  const catId = props.navigation.getParam("categoryId");

  //const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0 //category id eka his nam -1 thama enne
  );

  return <MealsList listData={displayedMeals} navigation={props.navigation} />;
  // navigation props nestes component walata enne ne navigation eke dapu main component walata witharai enne, so api use karana
  //nested ewata navigation prop eka chain karaganna ona api
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

export default CategoryMealScreen;
