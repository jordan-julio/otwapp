/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {TouchableOpacity, Button, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';

import HomeScreen from './components/Home';
import HistoryScreen from './components/History';
import MapScreen from './components/Map';
import ProfileScreen from './components/Profile';

const Tab = createMaterialBottomTabNavigator();
const {width, height} = Dimensions.get('window');
const iconSize = Math.min(width, height) / 16;

function MyTabs() {
  return (
    <Tab.Navigator
      activeColor="#ffffff"
      inactiveColor="#999999"
      barStyle={{
        backgroundColor: '#333333',
      }}
      shifting={true}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? '#000' : '#fff'}
              size={iconSize}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Maps"
        component={MapScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="map-marker-radius"
              color={focused ? '#000' : '#fff'}
              size={iconSize}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={HistoryScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="history"
              color={focused ? '#000' : '#fff'}
              size={iconSize}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="account"
              color={focused ? '#000' : '#fff'}
              size={iconSize}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

export default App;
