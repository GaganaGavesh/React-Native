import React, { useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  ProgressViewIOSComponent,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import BodyText from "../components/BodyText";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, "")); //number ekak nowana ) 0  9 athara nowana hama ekakma '' replace weno
  };

  const resetInputHandler = () => {
    setEnteredValue("");
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        {/* <Button title="START GAME" onPress={()=> {props.onStartGame(selectedNumber)}}/> */}
        <MainButton
          onPress={() => {
            props.onStartGame(selectedNumber);
          }}
        >
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game</Text>
        <Card style={styles.inputContainer}>
          {/* Send the custom card styles as a prop to the Card component */}
          <BodyText>Select a Number</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                color={Colors.accent}
                onPress={resetInputHandler}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    //we can use same names since js files are independently managed
    flex: 1,
    padding: 10,
    alignItems: "center", //left to right
    //justifyContent: 'center'// items are centered along the flex direction
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%", //devices which are small than 300 will get 80% of screen width
    alignItems: "center", //along the cross axis
  },
  title: {
    fontSize: 20,
    marginVertical: 10, //override margin top and bottom
    fontFamily: "open-sans-bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between", //buttons are placed sides and distribute all free space in between
    paddingHorizontal: 15,
  },
  button: {
    width: 85,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center", //Default anignItems tynne stretch ethakota flex direction ekata
    // wirudda paththara adila thama tynne container eka
  },
});
export default StartGameScreen;
