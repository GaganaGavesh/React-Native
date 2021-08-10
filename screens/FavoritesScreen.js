import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FavouritesScreen = (props) => {
    return ( 
        <View style={styles.screen}> 
            <Text>Favourites Screen</Text>
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

export default FavouritesScreen;