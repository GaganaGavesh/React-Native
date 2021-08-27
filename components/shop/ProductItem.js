import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

import Colors from "../../constants/Colors";
// toFixed(2) numbers with 2 decimal places

const ProductItem = (props) => {
  return (
    <View style={styles.product}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.image }} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="View Details"
          onPress={props.onViewDetail}
        />
        <Button
          color={Colors.primary}
          title="To Cart"
          onPress={props.onAddToCart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  imageContainer: {
    height: "60%",
    width: "100%",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  product: {
    shadowColor: "black",
    shadowOffset: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
});
export default ProductItem;