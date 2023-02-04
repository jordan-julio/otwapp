import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ScrollView} from 'react-native';
import HomeScreen from './Home';
import HistoryScreen from './History';
import auth from "@react-native-firebase/auth";
import { borderRadius } from '@mui/system';

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
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.profileImage}>
          <Image
            source={{
              uri: 'https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg',
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Your Name</Text>
          <Text style={styles.bio}>Your Bio</Text>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItemLast} onPress={() => auth().signOut()}>
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    marginTop: 150, 
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: '#111',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    margin: 20,
    marginBottom: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: '#eee',
  },
  bio: {
    fontSize: 16,
    color: '#eee',
    textAlign: 'center',
    margin: 10,
  },
  menuContainer: {
    backgroundColor: '#222',
    alignItems: 'center',
    width: '100%',
    borderRadius: 20,
  },
  menuItem: {
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    width: '100%',
  },
  menuItemLast: {
    width: '100%',
  },
  menuItemText: {
    fontSize: 18,
    margin: 20,
    marginLeft: 30,
    color: '#ddd',
  },
  profileImage: {
    alignItems: 'center',
  }
});

export default ProfileScreen;
