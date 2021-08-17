import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Colors from "../constatns/Colors";
import HeaderButton from "../components/HeaderButton";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      {/* onValueChange fires when the user change the switch */}
      <Switch
        trackColor={{ true: Colors.primaryColor }} //button eka athule pata
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  const [isGlutesFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  //useCallback eka apata apita ona welawata witharak me function eka recreate karala denawa
  //so un necessary re creation eka nawaththanawa, cached karagena innawa parana function eka
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutesFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      isVegetarian: isVegetarian,
    }

    console.log(appliedFilters);
  }, [isGlutesFree, isLactoseFree, isVegan, isVegetarian]);

  //we can use setParams to update the params values of the currently loaded screen
  //IF YOU HAD EXISTING PARAMS, YOU CAN STILL USE setParams(0 LIKE THIS, YOUR NEW PARAMS GET MERGED WITH THE EXISTING PARAMS
  //Existing params kiyanne api mekata ena screen eken me screen ekata ewana params thama
  useEffect(() => {
    props.navigation.setParams({save: saveFilters});
    //save variable store the reference of the saveFilters function, meka ganna thanakin call karanna pluwn dan
  }, [saveFilters]);
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available FIlters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-Free"
        onChange={(newValue) => setIsGlutenFree(newValue)}
        state={isGlutesFree}
      />
      <FilterSwitch
        label="Lactose-Free"
        onChange={(newValue) => setIsLactoseFree(newValue)}
        state={isLactoseFree}
      />
      <FilterSwitch
        label="Vegan"
        onChange={(newValue) => setIsVegan(newValue)}
        state={isVegan}
      />
      <FilterSwitch
        label="Vegetarian"
        onChange={(newValue) => setIsVegetarian(newValue)}
        state={isVegetarian}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filter Meals",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={() => {
            //dan filter values tika methenta ganna wela tynwa, so ewa uda component eken ganna onaa
            //api ape component eke data navigationOptions walin change karanna balanawa nam, setParam thama karana widiya
            navData.navigation.getParam('save')();//meken set kala params ganna pluwn 
            //function eka nathuwa navData.navigation.getParam('save') meka dammathn athi, ethakota automa call wenawa
            //execute wenawa
          }} 
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%", //content eka justify wenna nam api justify karana ekata width ekak set karanna onaa
    marginVertical: 15,//ekakata eka gane render wena nisa mekata margin eka danna pluwan
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 20,
    textAlign: "center",
  },
  screen: {
    //justifyContent: "center", //along with the main axis
    alignItems: "center", //along with the cross axis
    flex: 1,
  },
});

export default FiltersScreen;
