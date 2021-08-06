import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = (props) => {
    return ( 
        <TextInput {...props} style={{...styles.input, ...props.style}} />
        // Spread out the all props and style will override by tha available style
        //This TextInput is fully configurable and currently provide basic text input
     );
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default Input;