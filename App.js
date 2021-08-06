import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";

const fetchFonts = () => {
  //this returns a promise where we can use this to conditionally add things for the completion and Error states
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    //we tell react where our fonts live and names to map them for use inside the app
  });
};

export default function App() {
  const [userNumber, setUserNUmber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNUmber(null);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNUmber(selectedNumber);
    setGuessRounds(0); //set setGuessRounds to 0 if we start again
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;
  // content = (
  //   <GameOverScreen
  //     guessRounds={12}
  //     userChoice={45}
  //     onRestart={configureNewGameHandler}
  //   />
  // );

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        guessRounds={guessRounds}
        userChoice={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
