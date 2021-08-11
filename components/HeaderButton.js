import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constatns/Colors";

const CustomHeaderButton = (props) => {
  return (
    //{...props} meka super useful feature ekak mokada apata tyna props serama me component ekata denna pluwn
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
    />
  );
};

export default CustomHeaderButton;
