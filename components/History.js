/* eslint-disable react-native/no-inline-styles */
import zIndex from '@mui/material/styles/zIndex';
import { borderRadius, fontFamily, margin } from '@mui/system';
import React, {useState} from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const DATA = [
  {
    key: '1',
    brand: 'Nike',
    product: 'AF1',
    last_update: '11/26/22',
    status: 'In Transit',
    location: 'Toronto, ON, CA',
    progress: 0.6,
    image: require('./images/sampleNike.png'),
  },
  {
    key: '2',
    brand: 'LV',
    product: 'shirt',
    last_update: '11/30/22',
    status: 'Delivered',
    location: 'Toronto, ON, CA',
    progress: 1,
    image: require('./images/sampleLV.png'),
  },
  {
    key: '3',
    brand: 'Adidas',
    product: 'baseball hat',
    last_update: '11/30/22',
    status: 'In Transit',
    location: 'Toronto, ON, CA',
    progress: 0.7,
    image: require('./images/sampleAdidas.png'),
  },
  {
    key: '4',
    brand: 'Jordan',
    product: 'Jordans',
    last_update: '12/12/22',
    status: 'In Transit',
    location: 'Ottawa, ON, CA',
    progress: 0.6,
    image: require('./images/sampleJordan.png'),
  },
  {
    key: '5',
    brand: 'LV',
    product: 'coat',
    last_update: '12/14/22',
    status: 'In Transit',
    location: 'Toronto, ON, CA',
    progress: 0.2,
    image: require('./images/sampleLV.png'),
  },
  {
    key: '6',
    brand: 'Nike',
    product: 'buckethat',
    last_update: '12/16/22',
    status: 'In Transit',
    location: 'Ottawa, ON, CA',
    progress: 0.1,
    image: require('./images/sampleNike.png'),
  },
  {
    key: '7',
    brand: 'Adidas',
    product: 'Ultraboost 5.0',
    last_update: '12/10/22',
    status: 'In Transit',
    location: 'Toronto, ON, CA',
    progress: 0.5,
    image: require('./images/sampleAdidas.png'),
  },
];

function HistoryScreen({navigation}) {
  const [formPosition] = useState(new Animated.Value(-100));
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [overlayOpacity] = useState(new Animated.Value(0));
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    console.log(formData.orderNum);
    fetch(`https://api.trackingmore.com/v2/trackings/get?tracking_number=${formData.orderNum}&carrier_code=dachser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Trackingmore-Api-Key': 'r3vkvim3-fslc-yk6k-4t6j-4vyahipznokc'
        }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const filteredData = data.data.items.filter(item => item.tracking_number === formData.orderNum);
      console.log(filteredData);
      for (let i = 0; i < filteredData.length; i++) {
        console.log(filteredData[i]["origin_info"]);
      }
    })
  
    .catch(error => console.error('Error:', error));
    setIsFormVisible(false);
    setFormData({});
    Animated.timing(formPosition, {
        toValue: -200,
        duration: 500,
        useNativeDriver: true,
    }).start();
    Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
    }).start();
  }



  return (
    <TouchableWithoutFeedback onPress={() => {
      setIsFormVisible(false);
      Animated.timing(formPosition, {
          toValue: -200,
          duration: 500,
          useNativeDriver: true,
      }).start();
      Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
      }).start();
    }}>
      <View style={{flex: 1}}>
        <Animated.View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: overlayOpacity }}></Animated.View>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={DATA}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => 
            <View>
              <View style={styles.header}>
                <Text style={styles.titleText}>Orders</Text>
                <TouchableOpacity
                style={styles.headButton}
                onPress={() => {
                  setIsFormVisible(!isFormVisible);
                  Animated.timing(formPosition, {
                    toValue: isFormVisible ? -200 : 0,
                    duration: 500,
                    useNativeDriver: true,
                  }).start();
                  Animated.timing(overlayOpacity, {
                    toValue: isFormVisible ? 0 : 1,
                    duration: 500,
                    useNativeDriver: true,
                  }).start();
                }}>
                  <MaterialCommunityIcons name="plus" color={'#fff'} size={25} />
                </TouchableOpacity>
              </View>
            </View>
          }
          // ListFooterComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MapTrack', {item})}>
                <View style={styles.item}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={item.image}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.orderText}>
                  {item.brand}, {item.product}
                </Text>
                <Text style={styles.orderText}>
                  {item.last_update}, {item.status}
                </Text>
                <View style={styles.progressBar}>
                  <View
                    style={{
                      flex: item.progress,
                      backgroundColor: 'black',
                      height: 3,
                    }}
                  />
                  <View
                    style={{
                      flex: 1 - item.progress,
                      backgroundColor: 'black',
                      height: 1,
                      marginRight: 10,
                    }}
                  />
                </View>
                <Text style={styles.orderText}>{item.location}</Text>
              </View>
            </View>
          )}
        />
        <Animated.View style={[styles.formContainer, { transform: [{translateY: formPosition}],
          display: isFormVisible ? 'flex' : 'none'}]}>
        <Text style={styles.inputText}>Insert Package/Order Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Order Number"
          value={formData.orderNum || ''}
          onChangeText={text => setFormData({ ...formData, orderNum: text })}
          onSubmitEditing={handleSubmit}
          returnKeyType={'done'}
          blurOnSubmit={true}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#ccc',
    color: 'white',
    borderRadius: 10,
    padding: 12,
    margin: 20,
    fontSize: 18,
    alignSelf: 'flex-end',
    cursor: 'pointer',
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  inputText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    alignItems:'center',
    alignSelf: 'auto',
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    width: '80%',
    marginBottom: 20,
    fontSize:16,
  },
  formContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '80%',
    height: 200,
    borderRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 200,
    transform: [{translateY: 100}],
    borderColor: 'black',
    borderWidth: 2,
    alignContent: 'center',
  },
  headButton: {
    margin: 20,
  },
  header: {
    backgroundColor: '#333',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    elevation: 3,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    flexDirection: 'row',
  },
  listContainer: {
    flexDirection: 'column',
  },
  itemContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#4a4a4a',
    borderRadius: 15,
    marginVertical: 11,
    marginHorizontal: 7,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    padding: 10,
    color: '#ddd',
    marginLeft: 10,
  },
  orderText: {
    fontSize: 12,
    marginVertical: 1,
  },
  item: {
    width: 64,
    height: 64,
    padding: 5,
    margin: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 15,
  },
  separator: {
    height: 19,
    backgroundColor: '#000',
  },
  container: {
    backgroundColor: '#D9D9D9',
    overflow: 'hidden',
  },
});

export default HistoryScreen;
