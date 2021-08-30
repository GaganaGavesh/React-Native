import React from 'react';
import { Button, FlatList, StyleSheet, Text, View} from 'react-native'
import { useSelector } from 'react-redux';

const CartScreen = (props) => {

    const cartTotalAmount = useSelector(state => state.cartTotalAmount.totalAmount);

    return ( 
        <View>
            <View>
                <Text>Total: <Text>${19.99}</Text></Text>
                <Button title="Order Now"/> 
            </View>
            <View>
                <Text>CART ITEMS</Text>
            </View>
        </View>
     );
}
 
const styles = StyleSheet.create({

});

export default CartScreen;