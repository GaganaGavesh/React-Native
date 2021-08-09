import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  ImageComponent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from 'expo-screen-orientation';

import Card from "../components/Card";
import BodyText from "../components/BodyText";
import DefaultStyles from "../constants/default-style";
import MainButton from "../components/MainButton";//.android , ios danna onan ne, react eken behind the scenes pick karagannawa
//platform specific button component file eka
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

//For scrolView
const renderScrolViewItem = (guess, guessNumber) => (
  <View key={guessNumber} style={styles.listItem}>
    <BodyText>#{guessNumber}</BodyText>
    <BodyText>{guess}</BodyText>
  </View>
);

//For FlatList
const renderFlatListItem = (listLength, itemData) => (
  //mekata apata key ekak ona wenne ne FlatList eken keying scene eka balana nisa
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = (props) => {
  //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const { userChoice, onGameOver } = props;
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  //toString kala number eka initial ekath string ekak tyenna ona nisa, mokada FLatList ekata ganne object withara neh
  const [pastGusses, setPastGusses] = useState([initialGuess.toString()]);
  //initially get the available device width
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
  const currentLow = useRef(1); //not regenerate for the reRenders of the component
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGusses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').height);
      setAvailableDeviceWidth(Dimensions.get('window').width);
    };

    //Add event listner
    Dimensions.addEventListener('change', updateLayout);
    
    //Remove the event listner
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

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
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    //setRounds((currentRounds) => currentRounds + 1);

    //Number eka string ekakata convert kala, FlatList ekata ona nisa
    setPastGusses((currentPastGusses) => [
      nextNumber.toString(),
      ...currentPastGusses,
    ]);
  };

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton
            onPress={() => {
              nextGuessHandler("lower");
            }}
          >
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton
            onPress={() => {
              nextGuessHandler("greater");
            }}
          >
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <View style={styles.listContainerBig}>
          <FlatList
            keyExtractor={(item) => item}
            data={pastGusses}
            renderItem={(itemData) =>
              renderFlatListItem(pastGusses.length, itemData)
            }
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

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
          {/* LOWER */}
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton
          onPress={() => {
            nextGuessHandler("greater");
          }}
        >
          {/* GREATER */}
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
        {pastGusses.map((guess, index) => renderScrolViewItem(guess, pastGusses.length - index))}
      </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGusses}
          renderItem={(itemData) =>
            renderFlatListItem(pastGusses.length, itemData)
          }
          contentContainerStyle={styles.list}
          // Api renderItem ekata itemdata eka danne nathuwa this bind ekakin function eka witharak call kalath methana
          // item data eka default api refer kd\arana function ekata pass wenawa, function eke parameters walin awasana eka
          // thama default parameter eka widiyata ganne samanyen, meka pass nokalata aulak nee
        />
        {/* renderItem ekata denna pluen function  ekak eken render karana lement ekka return ekak denna ona  */}
        {/* FlatList ekata object neh ganne so integer array eakaka element mekata map karaganna be
          Kohoma hari object ekak ona wena nisa api array eke string walin ankaya save kala nam hari nee  */}
        {/* By default key Extractor rkak balanne item eke id eka or key eka diha thama, meken api eka override karanawa */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row", //here we can use FlexDirection since Card component uses a View wrapper
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10, // Do not rely on the guesses use turnery operetors
    width: 350,
    maxWidth: "90%",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  listItem: {
    borderColor: "#CCC",
    borderWidth: 2,
    borderRadius: 9,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  listContainerBig: {
    flex: 1,
    width: '62%',
  },
  listContainer: {
    flex: 1,
    width: "80%"
  },
  list: {
    alignItems: "center", // ScrolView eka internaly flexBox use karana nisa apata pluwan
    // alignItems and alignCOntent wage dewal use karala e flexBox eke position eka wenas karaganna
    //e kiyanne ScrolView eka athule tyna content eka eha meha karanna pluwn eka flexBox use karana nisa
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  screen: {
    flex: 1, //take the available space in the screen
    padding: 10,
    alignItems: "center",
  },
});

export default GameScreen;
