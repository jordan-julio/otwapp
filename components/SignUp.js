import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Navigation } from '@mui/icons-material';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

/**import otpGenerator from 'otp-generator';
import * as firebase from 'firebase';**/

const SignUp = ({navigation}) => {
  const [Username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  const handleSignUp = async() => {
    // validate the form inputs
    if (!Username || !password || !confirmPassword || !phoneNumber) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      // check if email already exists in the database
      const emailExists = await firestore()
        .collection('Users')
        .where('Username', '==', Username)
        .get();
      if (!emailExists.empty) {
        Alert.alert('Error', 'Email already exists');
        return;
      }

      // insert the signup data in the firebase database
      await firestore()
        .collection('Users')
        .doc().set({ Username, password, phoneNumber });
      Alert.alert('Success', 'Your account has been created successfully');
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSendCode = async() => {
    // generate a new OTP
    //const newOtp = otpGenerator.generate(6, { specialChars: false });
    //setGeneratedOtp(newOtp);
    // send an email with the OTP
    // ...
    //Alert.alert('Success', 'The OTP has been sent to your email');
  };

  return (
    <View style={{ flex:1}}>
        <KeyboardAwareScrollView
            style={{ backgroundColor: '#effeff', flex: 1}}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
        >
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                value={Username}
                onChangeText={text => setUsername(text)}
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
            <Text>Confirm Password</Text>
            <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                secureTextEntry={true}
                placeholder="Confirm your password"
            />
            <Text>Phone Number</Text>
            <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
                placeholder="Enter your phone number"
            />
            {/**<Text>Confirmation Code</Text>
             <TextInput
                style={styles.input}
                value={code}
                onChangeText={text => setCode(text)}
                placeholder="Enter the code sent to your email"
        />**/}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSendCode} style={styles.sendCodeButton}>
                <Text style={styles.buttonText}>Send Code</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#000',
        alignItems:'center',
        alignSelf: 'auto',
        borderRadius: 20,
        backgroundColor: '#ccc',
        paddingLeft: 20,
        paddingRight: 20,
        width: '70%',
        margin: 10,
        fontSize:16,
    },
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      borderColor: 'black',
      backgroundColor: '#effeff',
      paddingTop: 200,
      justifyContent: 'center',
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
    sendCodeButton: {
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

export default SignUp;
