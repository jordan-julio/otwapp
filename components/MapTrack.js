import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
//import {process} from 'react-native-dotenv';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function MapTrack({route, navigation}) {
  const {item} = route.params;
  const lat = item.latitude;
  const long = item.longitude;

  return (
    <View style={styles.container}>
      <View style={styles.topLeftContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" color="#000" size={30} />
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: item.latitude,
          longitude: item.longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.04,
        }}
        apiKey={process.env.API_KEY}>
        <Marker
          coordinate={{latitude: lat, longitude: long}}
          title={item.product}
          description={item.status}
        />
      </MapView>
    </View>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  topLeftContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  map: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
});

export default MapTrack;
