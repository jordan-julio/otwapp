import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ScrollView} from 'react-native';
import HomeScreen from './Home';
import HistoryScreen from './History';
import auth from "@react-native-firebase/auth";

function ProfileScreen({navigation}) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (!initializing && !user) {
      navigation.navigate('Auth');
    }
  }, [initializing, user]);
  // views:
  // 1. profile
  // 2. Buttons
  // 3. buttons go to other screens
  return (
    <View style={{flex: 1, alignItems: 'stretch', backgroundColor: '#ccc'}}>
      {/** Profile, and basic information */}
      <View style={styles.container}>
        <View style={styles.profileInfo}>
          <Image
            source={{
              uri: 'https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg',
            }}
            style={styles.profilePicture}
          />
          <View style={styles.profileText}>
            <Text style={styles.name}>Your Name</Text>
            <Text style={styles.username}>@username</Text>
          </View>
        </View>
      </View>
      {/** Scrollable view that contains buttons to go to other views */}
      <View style={{flex: 1}}>
        <ScrollView horizontal={false}>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.buttonStyle}>
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.menuItemText}>Statistics</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.menuItemText}>About</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.menuItemText}>Contact Us</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={() => auth().signOut()} style={styles.buttonStyle}>
            <Text style={styles.menuItemText}>Log Out</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.menuItemText}>...Anything Else</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.menuItemText}>...Anything Else</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.menuItemText}>...Anything Else</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    padding: 10,
    marginVertical: 1,
    backgroundColor: '#ccc',
    flex: 1,
  },
  menuItemText: {
    fontSize: 40,
  },
  container: {
    marginBottom: 30,
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    color: 'grey',
  },
  separator: {
    height: 1,
    backgroundColor: '#5A5A5A',
    borderRadius: 10,
    shadowColor: '#265B5F',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonStyle: {
    backgroundColor: '#aaa',
    height: 70,
  },
});

export default ProfileScreen;
