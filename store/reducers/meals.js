import { ActionSheetIOS } from "react-native";
import { MEALS } from "../../data/dummy-data";
import { SET_FILTERS, TOGGLE_FAVOURITE } from "../actions/meals";
//reducer function eka execute karanawa redux wlain, when ever a new action is dispatced
//
//meken return karana stete eka thama redux eka store eke store karala tyaganne

//First execution ekedi ganna api initial state ekak hadala tynnath onaa

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favouriteMeals: [],
};

//state eka danata initialise wela nathnam initialState ekaa gannawa, meka palaweni para witharai wenne
//state eka undefined welawedi witharai wenne
//Initialy action ekak dispatch wela reducer eka eka parak run wenawa eken thama me initialState eka store ekata gahanne
//ACTUALLY, DEFAULT CASE WILL BE REACHED WHEN THE APP STTARTS AND THE REDUX STORE IS INITIALIZED
const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      const existingIndex = state.favouriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        //meal is in the favMeals
        const updatedFavMeals = [...state.favouriteMeals];
        updatedFavMeals.splice(existingIndex, 1); //remove the meal from the above array
        return { ...state, favouriteMeals: updatedFavMeals };
      } else {
        const meal = state.meals.find((meal) => meal.id === action.mealId); //meal eka find karagena favMeals ekata concat //karanawa
        return { ...state, favouriteMeals: state.favouriteMeals.concat(meal) };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.isVegetarian && !meal.isVegetarian) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        return true;
      }); //filter gives new array, we no need to copy items to a new array
      return { ...state, filteredMeals: updatedFilteredMeals };

    default:
      return state;
  }
};

export default mealsReducer;
