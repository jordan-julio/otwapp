/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {TouchableOpacity, StyleSheet, Settings} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';

import HomeScreen from './components/Home';
import HistoryScreen from './components/History';
import MarketScreen from './components/Marketplace';
import ProfileScreen from './components/Profile';
import ItemDetails from './components/ItemDetails';
import MapTrack from './components/MapTrack';
import SettingsScreen from './components/Settings';

const Tab = createMaterialBottomTabNavigator();
const {width, height} = Dimensions.get('window');
const iconSize = Math.min(width, height) / 16;

function MyTabs({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        name="Discover"
        component={MarketScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="apple-safari"
              color={focused ? '#000' : '#fff'}
              size={iconSize}
            />
          ),
        }}
      />
      {/** For this icon
       * 1. script-text-outline
       * 2. cart-outline
       * 3. script-text-outline
       * 4. basket-outline
       * (Anything you want to choose from these to represent Orders
       * , if you dont like the current icon)
       */}
      <Tab.Screen
        name="Order"
        component={HistoryScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="cube-send"
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

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* The MyTabs component with the bottom tab navigator goes here */}
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{
            title: 'OTW',
            headerRight: () => (
              <TouchableOpacity
                style={styles.headButton}
                // eslint-disable-next-line no-alert
                onPress={() => alert('Go To Notifications Page!')}>
                <MaterialCommunityIcons name="bell" color={'#000'} size={25} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="MapTrack" component={MapTrack} />
        {/* This is the new screen that is not accessible from the bottom tab navigator */}
        <Stack.Screen name="ItemDetails" component={ItemDetails} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    flex: 1,
    color: '#000',
  },
  headButton: {
    margin: 10,
  },
});

export default App;
