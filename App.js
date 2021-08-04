import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View
      style={{
        padding: 50,
        flexDirection: "row", 
        height: 300,
        justifyContent: "space-between",
        alignItems: "stretch",
      }}
    >
      <View
        style={{
          backgroundColor: "red",
          justifyContent: "center",
          flex: 1, 
          alignItems: "flex-start ",
        }}
      >
        <Text>1</Text>
      </View>
      <View
        style={{
          backgroundColor: "blue",
          justifyContent: "center",
          flex: 2,
          alignItems: "center",
        }}
      >
        <Text>2</Text>
      </View>
      <View
        style={{
          backgroundColor: "green",
          justifyContent: "center",
          flex: 3,
          alignItems: "center",
        }}
      >
        <Text>3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
