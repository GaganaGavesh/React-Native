import React, { useState } from "react";
import { useSelector } from "react-redux"; //helps to select slice of our state and use it in this compoenent
//class compoenent ekak nam connect eka thama use karanne sfc wla meka gaththama lesi

import { CATEGORIES } from "../data/dummy-data";
import MealsList from "../components/MealsList";
import { StyleSheet, Text, View } from "react-native";

const CategoryMealScreen = (props) => {
  //console.log('category meal props', props)
  //getParams allow us to extract the data using the keys of the params we have sent from the previous component

  //useSelector eka function ekak gannawa eka redux eken execute karanawa
  //methenta danne rootReducer eke tyna key identifier eka, ethakota e reducer eka responsible state eka apata ewanawa
  //dan api reducer ekee dapu state eke key eka danna ona
  const availableaMeals = useSelector((state) => state.meals.filteredMeals);

  const catId = props.navigation.getParam("categoryId");

  //const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  const displayedMeals = availableaMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0 //category id eka his nam -1 thama enne
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <Text>No meals found, maybe check your filters !</Text>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealScreen;
