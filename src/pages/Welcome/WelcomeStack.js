import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Introduction from './Introduction';
import Login from './Login';
import SignUp from './SignUp';

const Stack = createNativeStackNavigator();

const WelcomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="IntroductionScreen" component={Introduction} />
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="SignUpScreen" component={SignUp} />
    </Stack.Navigator>
  );
};

export default WelcomeStack;
