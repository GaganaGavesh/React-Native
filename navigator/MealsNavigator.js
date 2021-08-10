import { createStackNavigator } from "react-navigation-stack"; //for react navigation 4
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
//we need to install react-navigation-stack
//We tell this
//1. what are the different screens we have
//2. how we manage to visit these different screens
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import Colors from "../constatns/Colors";
import MealDetailsScreen from "../screens/MealDetailScreen";

//createStackNavigator meka return karanawa NavigationNavigator ekak
//eka apata component ekakata samana karaganna pluwan


//screen tynna object eka palamu argument eka
//dewani eka object seramatama adala wena default configurations object eka
const MealsNavigator = createStackNavigator({
  //inform about the acreens we want to add to the stack
  //put them as key value pairs
  //key is the identifire and value is the pointer to the Screen component
  //Categories: CategoriesScreen, //shorter form
  //By default meken render karanne first key value pair eka
  //habai apata configure karanna pluwan initialRouteName eka wena ekakat
  Categories: {
      screen: CategoriesScreen,
  },
  CategoryMeals: {
    //longer form where we can configure more about the screen
    screen: CategoryMealsScreen,
    //methana danna pluwn default navigation options tika
    // navigationOptions: {
    //   headerStyle: {
    //     backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
    //   },
    //   //Goto official docs to read more about the navigation properties
    //   headerTintColor:
    //     Platform.OS === "android" ? "white" : Colors.primaryColor,
    // },
  },
  MealDetail: MealDetailsScreen,
}, {defaultNavigationOptions: {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
      },
      //Goto official docs to read more about the navigation properties
      headerTintColor:
        Platform.OS === "android" ? "white" : Colors.primaryColor,
},
//initialRouteName: 'MealDetail',
mode: 'modal'});

//you want to wrap your root navigator with the createContainer component
//export default MealsNavigator;
export default createAppContainer(MealsNavigator);
