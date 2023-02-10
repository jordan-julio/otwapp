import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import storage from '@react-native-firebase/storage';
import {auth} from '@react-native-firebase/auth';

const EditProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = async () => {
    if (displayName) {
      const user = auth().currentUser;
      await user.updateProfile({displayName});
    }
    if (image) {
      const user = auth().currentUser;
      const storageRef = storage().ref(`images/${user.uid}`);
      await storageRef.putFile(image);
      storageRef.getDownloadURL().then((url) => {
        user.updateProfile({photoURL: url});
        setImageUrl(url);
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={displayName}
        placeholder="Display Name"
        onChangeText={(text) => setDisplayName(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      {imageUrl && <Image style={styles.image} source={{uri: imageUrl}} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
});

export default EditProfile;
