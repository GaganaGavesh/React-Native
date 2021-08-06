import React from 'react';
import { StyleSheet, View} from 'react-native';

const Card = (props) => {
    console.log(props);
    return ( 
        <View style={{...styles.card, ...props.style}}>{props.children}</View>//render the any thing inside the card
        //distribute default styles in the card and distribute custom styles as props
     );
}

const styles = StyleSheet.create({
    card: {
        // width: 300,
        // maxWidth: '80%',//devices which are small than 300 will get 80% of screen width
        // alignItems: 'center',//along the cross axis
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.6,
        elevation: 7,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    }
});
export default Card;