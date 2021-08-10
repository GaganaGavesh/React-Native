import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const MealDeteilScreen = (props) => {
    return ( 
        <View style={styles.screen}> 
            <Text>MealDeteil Screen</Text>
            <Button title="Go Back to Categories" onPress={() => {props.navigation.popToTop()}}/>
        </View>
     );
}
 
const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',//along with the main axis
        alignItems: 'center',//along with the cross axis
        flex: 1,
    },
});

export default MealDeteilScreen;