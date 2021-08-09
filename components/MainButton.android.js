import React from "react";
import {
  StyleSheet,
  Text,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

import Colors from "../constants/colors";

const MainButton = (props) => {
    //mehema karanne nathuwa component dekak hadala conditionally render karanna pluwan
    //Thawa apata pluwan sampurnama wenas component file dekak hadala e e adala ewaa render karanna pluwn
  let ButtonComponent = TouchableOpacity;

  //There is wripple effect for android api higher than 21
  //touch kalama button eka poddak kalu patata harenawa touch karaddi
  if (Platform.Version >= 21) {//no need to check the platform, we obviousely run this file in Android 
    ButtonComponent = TouchableNativeFeedback;
    //Dan apata me component eka touchableOpacity eka tyna thanata daganna pluwn
    //mokada Capital character ekakin patanganna variable ekak JSX element ekakata samana karanna pluwan
    //eka apata <> tag athare dala component ekak widiyata yodaganna ahaki
  }
  return (
    <View style={styles.buttonContainer}>
        {/* Touchable eka thama ganne button press eken wena action eka ape custom button ekata daganna */}
        {/* ekata thama danne ape touch action eka, mehema thama custom button eka hadagannee */}
      <ButtonComponent onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
      //meka hoda workaround ekak effect eka kotuwata watenawata
      //meken me dala tyna pramanen pitata yana ewa hidden karanawa
      //🔴 🔴 🔴IMPORTANT🔴 🔴 🔴
    borderRadius: 25,
    overflow: "hidden",
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
});
export default MainButton;
