/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';

import HomeScreen from './components/Home';
import HistoryScreen from './components/History';
import MapScreen from './components/Map';
import ProfileScreen from './components/Profile';
import ItemDetails from './components/ItemDetails';

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
        {/* This is the new screen that is not accessible from the bottom tab navigator */}
        <Stack.Screen name="ItemDetails" component={ItemDetails} />
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
