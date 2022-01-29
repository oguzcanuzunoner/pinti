import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import AddProduct from '../AddProduct';
import ProductDetail from '../ProductDetail';

const Stack = createNativeStackNavigator();

const WelcomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomePageScreen" component={Home} />
      <Stack.Screen name="AddProductScreen" component={AddProduct} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetail} />
    </Stack.Navigator>
  );
};

export default WelcomeStack;
