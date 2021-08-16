import React from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/HeaderButton";
import { MEALS } from "../data/dummy-data";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const MealDeteilScreen = (props) => {
  //console.log('MealDetail Screen', props);
  const mealId = props.navigation.getParam("mealId");
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text>{selectedMeal.duration}m</Text>
        <Text>{selectedMeal.complexity.toUpperCase()}</Text>
        <Text>{selectedMeal.affordability.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>Ingrediants</Text>
      {selectedMeal.ingredients.map((ingrediant, index) => (
        <ListItem key={index}>{ingrediant}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step, index) => (
        <ListItem key={index}>{step}</ListItem>
      ))}
    </ScrollView>
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
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  listItem: {
    marginVertical: 10, 
    marginHorizontal: 20,
    borderColor: '#CCC',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
});

export default MealDeteilScreen;
