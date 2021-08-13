import React from "react";
import {
  FlatList,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Colors from "../constatns/Colors";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";
import HeaderButton from "../components/HeaderButton";

const CategoriesScreen = (props) => {
  console.log(props);

  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          //params is a object we pass as props to the next screen we about to navigate
          props.navigation.navigate({
            routeName: "CategoryMeals",
            params: {
              categoryId: itemData.item.id, //category id name is totalu up to you since it is like a prop
            },
          });
        }}
      />
    );
  };

  return (
    // <View style={styles.screen}>
    //   <Text>Categories Screen</Text>
    //   <Button
    //     title="Go to Meals !"
    //     onPress={() => {
    //       props.navigation.navigate({ routeName: "CategoryMeals" });

    //       //We can use this to replace the stsck with the key
    //       //so kalin ewata apata yanna be, mokada ewa ape stack ekee nee
    //       //props.navigation.replace("CategoryMeals")
    //     }}
    //   />
    // </View>
    <FlatList
      keyExtractor={(item, index) => item.id}
      numColumns={2}
      data={CATEGORIES}
      renderItem={renderGridItem}
    />
    // methana renderItem eke athulata dana function ekata default ma itemData eka pass wenawa, so apata manually parameter eka
    //pass karanna ona ne, but ehema kalat aulakuth ne, ethakkota thawa line eka diga wadi wenawa, mko api function eka call
    //karanna ona nisa
  );
};

//ReactNavigation eken balanawa me property eka navigation ekata dapu component wala tyeda kiyala
//me property ekata apata object assign karanna pluwan, ethakota apata navigation eka override karaganna ahaki
CategoriesScreen.navigationOptions = (navData) => {
  //console.log('Nav data from Category Screen', navData);
  return {
    headerTitle: "Meal Categories",
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
    },
    //Goto official docs to read more about the navigation properties
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
    //Header button eka side drawer ekata ganna
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
  screen: {
    justifyContent: "center", //along with the main axis
    alignItems: "center", //along with the cross axis
    flex: 1,
  },
});

export default CategoriesScreen;
