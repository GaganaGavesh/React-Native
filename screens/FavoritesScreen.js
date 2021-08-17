import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import MealsList from "../components/MealsList";

const FavouritesScreen = (props) => {
  const favMeals = useSelector((state) => state.meals.favouriteMeals);

  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.content}>
        <Text>No favourite meals found, Start adding some!</Text>
      </View>
    );
  }

  return <MealsList listData={favMeals} navigation={props.navigation} />;
};

FavouritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Faviurites",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer(); //side drawer eka toggle karanawa, meka built in function ekak
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default FavouritesScreen;
