import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, SafeAreaView } from "react-native"


const MyCart = ({ cartItems }) => {


    const calculateTotal = () => {
      let totalPrice = 0;
      cartItems.forEach(item => {
        totalPrice += item.price;
      });
      return totalPrice;
  };
  
    const renderCartItem = ({ item }) => (
        <SafeAreaView style={styles.cartItem}>
          <Text>{item.name}</Text>
          <Text>${item.price}</Text>
          <Button title="Remove" onPress={() => removeFromCart(item.id)} />
        </SafeAreaView>
    );
    
    return (
        <View style={styles.container}> 
          <Text style={styles.title}>Purchased Products</Text>
          {cartItems.length === 0 ? (
          <Text>Your cart is empty</Text>
      ) : (
            
            <FlatList
              // data={products}
              // renderItem={renderCartItem}
              data={cartItems}
              renderItem={({ item }) => (
                <View style={styles.item}>
                <Text>{item.name}</Text>
                <Text>${item.price}</Text>
                </View>
              )}
              keyExtractor={item => item.id}
              // keyExtractor={item => item.id.toString()}
            />
        )}
            {/* <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={item => item.id}
            />
            // keyExtractor={item => item.id} */}
          <View>
            <Text>Total: ${calculateTotal()}</Text>
              <Button title="Checkout" onPress={() => alert('Implement payment functionality')} />
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

})
export default MyCart;