import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeStack from './pages/Welcome/WelcomeStack';
import MainStack from './pages/Main/MainStack';
import Loading from './components/Loading';

import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const Router = () => {
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen
            name="MainStack"
            component={MainStack}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="WelcomeStack"
            component={WelcomeStack}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
