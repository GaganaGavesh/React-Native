import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, StyleSheet, View, Text } from "react-native";

import Card from "../components/Card";
import DefaultStyles from "../constants/default-style";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";

const generateRandomBetween = (min, max, exclude) => {
  //App should never guess the number in the first guess
  min = Math.ceil(min); //1 => 1
  max = Math.floor(max); //99.9 => 99

  const rndNum = Math.floor(Math.random() * (max - min)) + min; //100-1=99

  if (rndNum === exclude) {
    return generateRandomBetween(max, min, exclude); //recursively call this
  }
  return rndNum;
};

const GameScreen = (props) => {
  const { userChoice, onGameOver } = props;
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice)
  );
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1); //not regenerate for the reRenders of the component
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    //possible wrong clicks of LOWER and GREATER
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie", "You know that is wrong", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds((currentRounds) => currentRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        {/* <Button
          title="LOWER"
          onPress={() => {
            nextGuessHandler("lower");
          }}
        />
        <Button
          title="GREATER"
          onPress={() => {
            nextGuessHandler("greater");
          }}
        /> */}
        <MainButton
          onPress={() => {
            nextGuessHandler("lower");
          }}
        >
          LOWER
        </MainButton>
        <MainButton
          onPress={() => {
            nextGuessHandler("greater");
          }}
        >
          GREATER
        </MainButton>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1, //take the available space in the screen
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row", //here we can use FlexDirection since Card component uses a View wrapper
    justifyContent: "space-around",
    marginTop: 20,
    width: 350,
    maxWidth: "90%",
  },
});

export default GameScreen;
