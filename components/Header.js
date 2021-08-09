import React from 'react';
import { StyleSheet, Platform, View} from 'react-native';
import Colors from '../constants/colors';
import TitleText from './TitleText';

const Header = (props) => {
    return (
        <View style={styles.header}>
            <TitleText style={styles.headerTitle}>{props.title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        //backgroundColor: Colors.primary,
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '#CCC',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: Platform.OS === 'ios' ? 'black' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    },
    headerTitle: {
        color: 'black',
        fontSize: 18
    }
});

export default Header;