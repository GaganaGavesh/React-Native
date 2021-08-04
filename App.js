import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function App() {
  return (
    <View style={styles.screen}>
      <View
        style={styles.container}
      >
        <TextInput placeholder="Course Goal" style={styles.inputContainer} />
        <Button title="ADD" />
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
});
