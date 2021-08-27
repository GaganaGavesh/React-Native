import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";

import Colors from "../constants/Colors";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductOverviewScreen from "../screens/shop/ProductsOverviewScreen";

const productNavigator = createStackNavigator({
    ProductOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    }
})

export default createAppContainer(productNavigator)