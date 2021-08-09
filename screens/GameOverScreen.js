import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView, //we can mark the safe area view
  Text,
  View,
} from "react-native";

import BodyText from "../components/BodyText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";
import TitleText from "../components/TitleText";

const GameOverScreen = (props) => {
  return (
    //SafeAreaView should wrap your topmost view
    //topMost view eka tynne app.js ekee neh ekata thama danna ona mekata dala wadak ne
    //podi effect ekak tynawa but hariyatama hari yan nee
    // <SafeAreaView>
      <ScrollView>
        <View style={styles.screen}>
          <TitleText>The Game is Over!</TitleText>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/success.png")}
              //source={{uri: 'https://img.etimg.com/thumb/msid-55513126,width-640,resizemode-4,imgsize-86815/want-early-success-in-life-follow-these-tips.jpg'}}
              fadeDuration={1000}
              style={styles.image}
              resizeMode="cover" //default is cover
            />
          </View>
          <View style={styles.resultContainer}>
            <BodyText style={styles.resultText}>
              Your phone needed{" "}
              <Text style={styles.highlight}>{props.guessRounds}</Text> rounds
              to guess the number{" "}
              <Text style={styles.highlight}>{props.userChoice}</Text>
            </BodyText>
          </View>
          {/* <Button title="NEW GAME" onPress={props.onRestart} /> */}
          <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
      </ScrollView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10, //Top and bottom
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
  imageContainer: {
    //width: 300, // 80% from  the parent component
    width: Dimensions.get("window").width * 0.7,
    //height: 300,
    height: Dimensions.get("window").width * 0.7,
    //borderRadius: 150,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    //marginVertical: 20,
    marginVertical: Dimensions.get("window").height / 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    marginHorizontal: 30,
    //marginVertical: 20
    marginVertical: Dimensions.get("window").height / 60,
  },
  resultText: {
    textAlign: "center", //this should applied to the root text component to center all the text
    //fontSize: 18,
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
});

export default GameOverScreen;
