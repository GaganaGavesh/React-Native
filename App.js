import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from 'react-native-screens';

import MealsNavigator from "./navigator/MealsNavigator";

enableScreens();//Ensure react navigation uses native optimized screen components behind the scenes
//behind the scenes unlock karanawa native screens tika, performance tikak wadi wenawa e nisa

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
    <MealsNavigator/>
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
