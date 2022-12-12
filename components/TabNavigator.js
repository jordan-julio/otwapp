import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './Home';
import HistoryScreen from './History';
import MapScreen from './Map';
import ProfileScreen from './Profile';

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({focused}) => (
          <MaterialCommunityIcons
            name="home"
            color={focused ? '#fff' : '#ccc'}
          />
        ),
      },
    },
    Maps: {
      screen: MapScreen,
      navigationOptions: {
        tabBarLabel: 'Maps',
        tabBarIcon: ({focused}) => (
          <MaterialCommunityIcons
            name="map-marker-radius"
            color={focused ? '#fff' : '#ccc'}
          />
        ),
      },
    },
    OrderHistory: {
      screen: HistoryScreen,
      navigationOptions: {
        tabBarLabel: 'Order History',
        tabBarIcon: ({focused}) => (
          <MaterialCommunityIcons
            name="history"
            color={focused ? '#fff' : '#ccc'}
          />
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({focused}) => (
          <MaterialCommunityIcons
            name="account"
            color={focused ? '#fff' : '#ccc'}
          />
        ),
      },
    },
  },
  {
    activeTintColor: '#fff',
    inactiveTintColor: '#ccc',
    barStyle: {
      backgroundColor: '#000',
    },
  },
);

export default TabNavigator;
