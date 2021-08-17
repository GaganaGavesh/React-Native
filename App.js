import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from 'react-native-screens';
import { combineReducers, createStore} from 'redux';
import { Provider } from "react-redux";

import MealsNavigator from "./navigator/MealsNavigator";
import mealsReducer from './store/reducers/meals';

enableScreens();//Ensure react navigation uses native optimized screen components behind the scenes
//behind the scenes unlock karanawa native screens tika, performance tikak wadi wenawa e nisa

//map the single reducers with the keys
//merge mealsReducer with the reducers, dan me meals kiyana eken apita meka access karanna ahaki(state eka)
const rootReducer = combineReducers({meals: mealsReducer})

//now we need to provide the store to our app
const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require('./assets/fontsForNavigation/OpenSans-Regular.ttf'),
    "open-sans-bold": require('./assets/fontsForNavigation/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  //Take care of the app untill assets are loaded
  if (!fontLoaded) {
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
    />
  }

  return (
    //Wrap the top most component that holds all the screens
    //dan ape onama component ekakata me store eka access karanna pluwan
    <Provider store={store}>
    <MealsNavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
