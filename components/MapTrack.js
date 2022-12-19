import React from 'react';
import {StyleSheet}  from 'react-native';
import { process } from 'react-native-dotenv';
import MapView from 'react-native-maps';

function MapTrack() {
  return (
    <MapView
    style = {styles.map}
    region={{
      latitude: 51.2538,
      longitude: -85.3233,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    apiKey={process.env.GOOGLE_MAPS_API_KEY}
    />
  );
  // if (route.params != null) {
  //     const {item} = route.params;
  //     return (
  //     <MapView
  //     style = {styles.map}
  //     region={{
  //       latitude: 51.2538,
  //       longitude: 85.3233,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     }}
  //   />);
  //   } else {
  //     return (
  //       <View>
  //         <Text>Unavailable!</Text>
  //       </View>
  //     );
  //   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  map: {
    height: '100%',
  }
});

export default MapTrack;
