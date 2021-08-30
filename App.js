import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { composeWithDevTools } from "redux-devtools-extension"; // meka deve ekedi dala prod waladi ain karanna ona
//meken thama redux store eka enable karanene redux dev tool app ekata

import cartReducer from "./store/reducers/cart";
import productsReducer from "./store/reducers/products";
import ShopNavigator from "./navigation/shopNavigator";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

// remove composeWithDevTools() before the deployment of the app
const store = createStore(rootReducer, composeWithDevTools());

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
