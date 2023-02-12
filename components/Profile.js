import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ScrollView} from 'react-native';
import HomeScreen from './Home';
import HistoryScreen from './History';
import auth from '@react-native-firebase/auth';
import {borderRadius} from '@mui/system';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function ProfileScreen({navigation}) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
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
  let name = '';
  return (
    <View style={styles.outerContainer}>
      <ImageBackground
        source={require('./images/patternedImg.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.container}>
          <View style={styles.profileImage}>
            <Image
              source={{
                uri: 'https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg',
              }}
              style={styles.avatar}
            />
             {user
                ? <Text style={styles.name}>{user.displayName}</Text>
             : 
              <Text style={styles.name}>Nothing</Text>
              }
            <Text style={styles.bio}>Your Bio</Text>
          </View>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
              <View style={styles.menuItemContent}>
                <MaterialCommunityIcons name="account-edit-outline" color="#fff" size={27} />
                <Text style={styles.menuItemText}>Edit Profile</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Settings')}>
              <View style={styles.menuItemContent}>
                <MaterialCommunityIcons style={{marginBottom: 25}} name="settings-helper" color="#fff" size={30} />
                <Text style={styles.menuItemText}>Settings</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItemLast}
              onPress={() => auth().signOut()}>
              <View style={styles.menuItemContent}>
                <MaterialCommunityIcons name="logout-variant" color="#fff" size={27} />
                <Text style={styles.menuItemText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
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
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
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
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    marginTop: 100,
  },
  menuItem: {
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    width: '100%',
  },
  menuItemLast: {
    width: '100%',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
    marginLeft: 30,
  },
  menuItemText: {
    fontSize: 18,
    margin: 20,
    marginLeft: 30,
    color: '#ddd',
  },
  profileImage: {
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ProfileScreen;
