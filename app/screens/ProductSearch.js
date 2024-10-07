// ProductSearch.js
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, Image, Button, SafeAreaView, StyleSheet } from 'react-native';
import products from './Products';


const ProductSearch = ({ addToCart, navigation }) => {

  const [searchQuery, setSearchQuery] = useState('');

  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredProducts([]);
    } else {
      const formattedQuery = text.toLowerCase();
      const filtered = products.filter(
        product => product.name.toLowerCase().includes(formattedQuery) ||
                   product.category.toLowerCase().includes(formattedQuery)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = (product) => {
      addToCart(product);
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.imageUrl} style={styles.productImage} />
      <View style={styles.infoContainer}>
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productCategory}>{item.category}</Text>
        </View>
        <View>
          <Text style={styles.price}>Price: ${item.price}</Text>
          <Button title="Add to Cart" color="#0275d8" onPress={() => handleAddToCart(item) } />
          <Text style={styles.stockStatus}>Stock Status: {item.inventory > 0 ? 'In Stock' : 'Out of Stock'}</Text>
        </View>
      </View>
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleSearch}
        value={searchQuery}
        placeholder="Search by name or category"
        autoCapitalize="none"
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        // keyExtractor={item => item.id.toString()}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  productDetails: {
    flexDirection: 'column'
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  productCategory: {
    fontSize: 12,
    color: 'grey',
  },
  list: {
    flex: 1,
  },
  cart: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  swiper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
});

export default ProductSearch;
