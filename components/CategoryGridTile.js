import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  View,
  TouchableNativeFeedback,
} from "react-native";

const CategoryGridTile = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    //meka api view ekak athule render karanawa android ekee styles tika break wena nisa
    <View style={styles.gridItem}>
      {/* TouchableOpacity kiyana eka invisible component ekak,so api color eka
      view ekata witharak danawa */}
      <TouchableComponent
        style={styles.touchableComponent}
        onPress={props.onSelect}
      >
        <View style={{ ...styles.container, backgroundColor: props.color }}>
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //grid item eke serama ida ganna kiyala thama me kiyanne, kalin default widiyata color eka watune
    //content ekata witharai, cross axis eka dihawata streach wela thama thibbe
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 4,
    padding: 15,
    justifyContent: "flex-end", //meka column ekak nisa main axis eka dige flexdirection eka balanne,
    //so Top to Bottom, end means Bottom
    alignItems: "flex-end", //meka cross axis eka dige yanne Left to Right, co End means Right
  },
  //kelinma grid ekata column deka dammata hariyata enne ne grid eka
  //so api ekata styles dala ganna ona
  gridItem: {
    flex: 1, //IMPORTANT meken thama gridItem eken available full ida pramanayama gannawa, 
    //ita ihala component eken dena sampurna ida gannawa
    margin: 15,
    height: 150,
  },
  title: {
    fontSize: 25,
    fontFamily: "open-sans-bold",
    textAlign: "right",
  },
  touchableComponent: {
    flex: 1,
  },
});

export default CategoryGridTile;
