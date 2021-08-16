import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";

const FiltersScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available FIlters / Restrictions</Text>
      <View style={styles.filterContainer}>
        <Text>Gluten-Free</Text>
        <Switch/>
      </View>
    </View>
  );
};

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filter Meals",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',//content eka justify wenna nam api justify karana ekata width ekak set karanna onaa
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  screen: {
    //justifyContent: "center", //along with the main axis
    alignItems: "center", //along with the cross axis
    flex: 1,
  },
});

export default FiltersScreen;
