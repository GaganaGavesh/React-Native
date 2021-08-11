import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/HeaderButton";
import { MEALS } from "../data/dummy-data";

const MealDeteilScreen = (props) => {
  //console.log('MealDetail Screen', props);
  const mealId = props.navigation.getParam("mealId");
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  return (
    <View style={styles.screen}>
      <Text>{selectedMeal.title}</Text>
      <Button
        title="Go Back to Categories"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </View>
  );
};

//api dynamic deyak me page eke header ekata wage set karanawa nam eka me function eke thama danna ona
//nikamma mekata object ekak assign karannath pluwn, eth eken dynamic ewa ganna amarui, so dynamic data waalata api
//me special function scene eka yodagannawa
//React eken internaly me function eka call karanawa
MealDeteilScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam("mealId");
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  return {
    headerTitle: selectedMeal.title,
    //headerRight: <Text>FAV!</Text>,//meke styling ehama apata thaniyama manage karaganna amarui so api
    //react-navigation-header-buttons liyana package eka gannawa
    headerRight: (
        //methana prop ekak widiyaata danawa aita meka render karaganna ona wena component eka HeaderButton eka.
        //e component eke thama me item eka render wenneeh
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        {/* methanin thema header ekata icon add karanne so apata ona tjharamak Item tag eka yatate add karaganna pluwn */}
        {/* title eka thama key eka, so wenas title tikak dagemna yamma ona api icon godak danawa nam */}
        <Item
          title="Favourite"
          iconName="ios-star"
          onPress={() => {
            console.log("Mark as Favourite!");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center", //along with the main axis
    alignItems: "center", //along with the cross axis
    flex: 1,
  },
});

export default MealDeteilScreen;
