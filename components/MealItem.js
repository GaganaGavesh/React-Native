import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MealItem = (props) => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectMeal}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground
              source={{ uri: props.image }}
              style={styles.bgImage}
            >
              {/* Text eke aulak enawa nam styles dammata passe api eka wrap karanawa View ekakin */}
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={2}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            <Text>{props.duration}m</Text>
            <Text>{props.complexity.toUpperCase()}</Text>
            <Text>{props.affordability.toUpperCase()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end", //background image eka automatically act karanawa flex box ekak widiyata
  },
  mealDetail: {
    height: "15%",
    paddingHorizontal: 10,
    justifyContent: "space-between", //meka row ekak athule tynne, e nisa meka justify wenne LR walata thama
    alignItems: 'center',
  },
  mealHeader: {
    height: "85%",
  },
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#DCDCDC",
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  mealRow: {
    flexDirection: "row",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
  },
});

export default MealItem;
