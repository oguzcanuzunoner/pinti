import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePageStack from './Home/HomePageStack';
import Profile from './Profile';
import Favorite from './Favorite';
import Notification from './Notification';
import Barcode from './Barcode';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const WelcomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: '#53E88B',
        inactiveBackgroundColor: 'transparent',
        tabBarStyle: {
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          paddingVertical: 3,
        },
        tabBarItemStyle: {
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: () => <Icon name="home" size={30} color="#1FCC79" />,
        }}
        component={HomePageStack}
      />
      <Tab.Screen
        name="ProfileScreen"
        options={{
          tabBarIcon: () => <Icon name="account" size={30} color="#1FCC79" />,
        }}
        component={Profile}
      />
      <Tab.Screen
        name="FavoriteScreen"
        options={{
          tabBarIcon: () => (
            <Icon name="cards-heart" size={30} color="#1FCC79" />
          ),
        }}
        component={Favorite}
      />
      <Tab.Screen
        name="NotificationScreen"
        options={{
          tabBarIcon: () => <Icon name="inbox" size={30} color="#1FCC79" />,
        }}
        component={Notification}
      />
      <Tab.Screen
        name="BarcodeScreen"
        options={{
          tabBarIcon: () => (
            <Icon name="barcode-scan" size={30} color="#1FCC79" />
          ),
        }}
        component={Barcode}
      />
    </Tab.Navigator>
  );
};

export default WelcomeTab;
