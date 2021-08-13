import React from 'react';
import { createStackNavigator } from "react-navigation-stack"; //for react navigation 4
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from "react-native";
//we need to install react-navigation-stack
//We tell this
//1. what are the different screens we have
//2. how we manage to visit these different screens
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import Colors from "../constatns/Colors";
import FavouritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import MealDetailsScreen from "../screens/MealDetailScreen";

//createStackNavigator meka return karanawa NavigationNavigator ekak
//eka apata component ekakata samana karaganna pluwan


const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  //Goto official docs to read more about the navigation properties
  headerTintColor:
    Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: 'This is test title'
};

//screen tynna object eka palamu argument eka
//dewani eka object seramatama adala wena default configurations object eka
const MealsNavigator = createStackNavigator({
  //inform about the acreens we want to add to the stack
  //put them as key value pairs
  //key is the identifire and value is the pointer to the Screen component
  //Categories: CategoriesScreen, //shorter form
  //By default meken render karanne first key value pair eka
  //habai apata configure karanna pluwan initialRouteName eka wena ekakat
  Categories: {
      screen: CategoriesScreen,
  },
  CategoryMeals: {
    //longer form where we can configure more about the screen
    screen: CategoryMealsScreen,
    //methana danna pluwn default navigation options tika
    // navigationOptions: {
    //   headerStyle: {
    //     backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
    //   },
    //   //Goto official docs to read more about the navigation properties
    //   headerTintColor:
    //     Platform.OS === "android" ? "white" : Colors.primaryColor,
    // },
  },
  MealDetail: MealDetailsScreen,
}, {defaultNavigationOptions: defaultStackNavOptions,
//NAVIGATION OPTIONS IN THE CONFIG (2ND ARGUMENT) OF NAVIGATOR ONLY MATTERS IF THE NAVIGATOR IS USED INSIDE OF ANOTHER NAVIGATOR//
//initialRouteName: 'MealDetail',
mode: 'modal'});

//apata Favourite wala Stack navigator ekak daganna onna, so api tab navigator rkata stack navigator ekak hadalla eka
//set karanawa FavTab ekat
const FavNavigator = createStackNavigator({
  Favourites: FavouritesScreen,
  MealDetail: MealDetailsScreen
},{
  defaultNavigationOptions: defaultStackNavOptions,
});


//Dan ape tab navigator eka Mealsnavogator eka aragena tynne so
//apata tabnavigator eke stack navigator ekak render karanna ahaki\
//so api e dekama tyna navigator eka thama export karanne me page eken
const MealsFavTabNavigator = createBottomTabNavigator({
  //tab bar eke Text ekata ganne Meals & Favourites kiyana key deka
  Meals: {
    screen: MealsNavigator,//mealsNavigator kiyana eken enneth component ekak neh, screen ekata dannath ona component ekak
    //so apata MealsNavigator ekama danna pluwan methanata
    navigationOptions: {
      tabBarIcon: (tabInfo) =>{
        return (<Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor}/>);
      }
    },//me navigationoptions eken kiyanne ape stack navigation ekata tyna option saha Meals tab navigator eka 
    //tyenna ona widiya gana
  },
  Favourites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) =>{
        return (<Ionicons name="ios-star" size={25} color={tabInfo.tintColor}/>);
      },
    tabBarLabel: 'Favourites!',
    
    },
  },
},{
  tabBarOptions: {
    activeTintColor: Colors.accent,
  }
});

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen,
},{
  //Drawer ekee tyna nam wenas karanna ona nam, mekemma nama wenas karala denna pluwn
  //nathnam apata DrawerNavigator eke items long form eken liyala ekata navigation options dennath pluwn
  navigationOptions: {
    drawerLabel: 'Filters !!!'
  },
  defaultNavigationOptions: defaultStackNavOptions,
});

const MainNavigator = createDrawerNavigator({
  MealsFav: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals !!!',
    }
  },//navigator ekata thawa navigator dala tynne
  FiltersScreen: FiltersNavigator
},{
  //meken thama DrawerNavigator eka configure karanne, color ehema wage edit karanna pliuwan, text color edit karaganna pl;uwan
  contentOptions: {
    activeTintColor: Colors.accent,
  }, //drawer items edit karanna ahaki
});

//you want to wrap your root navigator with the createContainer component
//export default MealsNavigator;
//export default createAppContainer(MealsNavigator);
export default createAppContainer(MainNavigator);//meka thama main navigator eka, so anik navigators hama ekama mekata include wela tyenna ona
//meka mehema damma kiyala pennanne ne, side drawer eka enna Button ekak api daganna ona, eken thama meka toggle akaranne
//You should always have one root navigator
//e root navigator ekee nested navigators tyrnna pluwn, methana MealsFavTabNavigator eke
//MealsNavigator eka tynawa wage
