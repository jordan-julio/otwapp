/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {TouchableOpacity, Button, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './components/Home';
import HistoryScreen from './components/History';
import MapScreen from './components/Map';
import ProfileScreen from './components/Profile';

const Tab = createBottomTabNavigator();
const CustomTabButton = props => (
  <TouchableOpacity
    {...props}
    style={
      props.accessibilityState.selected
        ? [props.style, {borderTopColor: 'red', borderTopWidth: 2}]
        : props.style
    }
  />
);

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        barStyle: {
          borderWidth: 0.5,
          borderBottomWidth: 1,
          backgroundColor: 'black',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderTopColor: '#000',
          borderBottomColor: '#000',
          borderLeftColor: '#000',
          borderRightColor: '#000',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          tabBarButton: CustomTabButton,
        }}
      />
      <Tab.Screen
        name="Maps"
        component={MapScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="map-marker-radius"
              color={color}
              size={size}
            />
          ),
          tabBarButton: CustomTabButton,
        }}
      />
      <Tab.Screen
        name="Order"
        component={HistoryScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
          tabBarButton: CustomTabButton,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          tabBarButton: CustomTabButton,
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
