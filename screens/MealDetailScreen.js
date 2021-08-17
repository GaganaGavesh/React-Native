import React, { useEffect } from "react";
import { useCallback } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import CustomHeaderButton from "../components/HeaderButton";
import { toggleFavourite } from "../store/actions/meals";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const MealDeteilScreen = (props) => {
  const availableMeals = useSelector((state) => state.meals.meals);
  //console.log('MealDetail Screen', props);
  const mealId = props.navigation.getParam("mealId");
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);
  const currentMealIsFavourite = useSelector(
    (state) => state.meals.favouriteMeals.some((meal) => meal.id === mealId) //some ekem =n balanawa me meal eka favMeals array eke
    //tynawada kiyla, tyenam true return karanawa
  );

  //,e widiyata eliye tynne be me wage ewa, mokada ape component prop snd state change walata thama re render wenne
  //so api meka useEfect ekak athulata dnawa, ethakota apata pluwn meke infinite loop eka nawaththaganna
  //props.navigation.setParams({mealTitle: selectedMeal.title});
  //this approach is bit slow because meke title eka set wenne ascreen eka load unata passe nisa
  //e nisa api meka ewanawa me component eka load wena thaninma (MealList ekenma title eka ewanawa)
  // useEffect(() => {
  //   props.navigation.setParams({ mealTitle: selectedMeal.title });
  // }, [selectedMeal]);

  //useDispatch is a function we can call to dispatch an action
  const dispatch = useDispatch();

  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(mealId)); //dan api action eka di=spatch karanna yana functionekata adala parameters dunna
    //then api me toggleFavouriteHandler kiyana eka execute karanna ona
    //eka tynne navigation eke nisa api eke reference ekak yawanna ona setParams walin
  }, [dispatch, mealId]); //dispatch kiyana eka change wenne ne lu
  //mealid ekath danna ona

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavouriteHandler });
  }, [toggleFavouriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavourite });
  }, [currentMealIsFavourite]);

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
  //const mealId = navigationData.navigation.getParam("mealId");
  const mealTitle = navigationData.navigation.getParam("mealTitle"); //meka me component ekenma gannath pluwn
  const toggleFavourite = navigationData.navigation.getParam("toggleFav"); //meke enne function pointer ekak, meka wada karawanna
  //nam meka execute karanna ona
  //nathnam mealList ekan apata ewana mealTitle eka gannath pluwn
  //const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const isFavourite = navigationData.navigation.getParam("isFav");

  return {
    headerTitle: mealTitle,
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
          iconName={isFavourite ? 'ios-star' : 'ios-star-outline'}
          onPress={() => {
            toggleFavourite(); //meka execute weno api favourite button eka press kalama
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
    borderColor: "#CCC",
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
