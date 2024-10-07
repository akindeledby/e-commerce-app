import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './app/screens/WelcomeScreen';
import HomeTab from './app/screens/HomeTab';
import ProductSearch from './app/screens/ProductSearch';
import MyCart from './app/screens/MyCart';
import UserAccount from './app/screens/UserAccount';
import { useState } from 'react';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      // If the product is already in the cart, update its quantity
      const updatedCart = cartItems.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 & alert(`You have ${item.name} in cart already`)};
        }
        return item;
      });
      setCartItems(updatedCart);
    } else {
      // If the product is not in the cart, add it with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]) & alert(`${product.name} added to cart`);
    }
  };

  const HomeScreen = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen name="Search" > 
        {(props) => <ProductSearch {...props} addToCart={addToCart} />}
            </Tab.Screen>
        <Tab.Screen name="My Cart" >
        {(props) => <MyCart {...props} cartItems={cartItems} />}
            </Tab.Screen>
        <Tab.Screen name="My Account" component={UserAccount} /> 
      </Tab.Navigator>
    );
  }
    
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Store 360" component={WelcomeScreen} />
          <Stack.Screen name="Welcome to Our Store" component={HomeScreen} options={{ title: '' }}/>
          <Stack.Screen name="Search for product" >
          {(props) => <ProductSearch {...props} addToCart={addToCart} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }




export default App;
