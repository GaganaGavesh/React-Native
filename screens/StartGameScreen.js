import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
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
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  useEffect(() => {
    const updateLayout = () => {
      //dimensions of the portrait or horizontal mode
      setButtonWidth(Dimensions.get("window").width / 4);
    };

    //Fires whenever dimensions are changed
    Dimensions.addEventListener("change", updateLayout);
    
    return () => {
      //cleans the old listner if there is one
      //then add the new event listner
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

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
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={40}>
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
                {/* configured the button width with the rotation */}
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    color={Colors.accent}
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between", //buttons are placed sides and distribute all free space in between
    paddingHorizontal: 15,
  },
  button: {
    //width: 85,
    width: Dimensions.get("window").width / 4, //Dimensions api eken ganna ewa calculate wenne app eka styart wenakota witharai
    //rotate karanakotat tynne app eka start weddi gaththa initial width height ma thamai, eka lock karagena tyagannaa app eka
    //close wenakamma, runs only once in app cycle
  },
  inputContainer: {
    width: "80%",
    minWidth: 300, //available widdth eka 80% gaththama 300px enne nathnam  width eka 300ta set karanawa
    maxWidth: "95%", //habai available width eken 95% ta wada ganneth neha
    //maxWidth: "80%", //devices which are small than 300 will get 80% of screen width
    alignItems: "center", //along the cross axis
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
  screen: {
    //we can use same names since js files are independently managed
    flex: 1,
    padding: 10,
    alignItems: "center", //left to right
    //justifyContent: 'center'// items are centered along the flex direction
  },
  title: {
    fontSize: 20,
    marginVertical: 10, //override margin top and bottom
    fontFamily: "open-sans-bold",
  },
});
export default StartGameScreen;
