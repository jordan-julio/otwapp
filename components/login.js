import React, { useState } from 'react';
import { Dimensions, ImageBackground, Image, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import nike from './images/sampleNike.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
  
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    firestore()
      .collection('Users')
      .where('Username', '==', email)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          Alert.alert('Error', 'Invalid email or password');
          return;
        }
        querySnapshot.forEach(async documentSnapshot => {
          if (documentSnapshot.data().password === password) {
            console.log("success");
            await AsyncStorage.setItem('userToken', password);
            navigation.navigate("MyTabs");
          } else {
            console.log("here");
            Alert.alert('Error', 'Invalid email or password');
          }
        });
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };
  
  return (
        <KeyboardAwareScrollView 
        style={{ backgroundColor: '#effeff', flex: 1}}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        >
            <Image style={styles.productImage} source={require('./images/sampleNike.png')} />
            <Text style={{marginTop: 10}}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder="Enter your email"
            />
            <Text>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                placeholder="Enter your password"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                  <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
                  <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  img: {
    height: screenHeight,
    width: screenWidth,
    alignItems: 'center',
    flex: 1,
  },
  input: {
      borderWidth: 1,
      borderColor: '#000',
      alignItems:'center',
      alignSelf: 'auto',
      borderRadius: 20,
      backgroundColor: '#ccc',
      paddingLeft: 20,
      paddingRight: 20,
      width: '80%',
      margin: 10,
      fontSize:16,
  },
  container: {
    paddingBottom: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    height: 400,
    borderRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 200,
    borderColor: 'black',
    borderWidth: 2,
    alignContent: 'center',
    backgroundColor: '#effeee',
    shadowColor: '#1f1f1f',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  productImage: {
      width: '35%',
      height: '35%',
  },
  text:{
    fontSize: 20,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  loginButton: {
      backgroundColor: '#4c4c4c',
      borderRadius: 10,
      padding: 15,
      marginRight: 10,
      width: '40%',
  },
  signUpButton: {
    backgroundColor: '#4c4c4c',
    borderRadius: 10,
    padding: 15,
    width: '40%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Login;
