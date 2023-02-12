/* eslint-disable react-native/no-inline-styles */
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
  RefreshControl,
  ScrollView,
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
    latitude: 37.78825,
    longitude: -122.4324,
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
    latitude: 57,
    longitude: 2,
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
    latitude: 36.2048,
    longitude: 138.2529,
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
    latitude: 47,
    longitude: 8,
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
    latitude: 41,
    longitude: 12,
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
    latitude: 34,
    longitude: 151,
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
    latitude: 90.78825,
    longitude: 122.4324,
  },
  {
    key: '8',
    brand: 'Adidas',
    product: 'Ultraboost 5.0',
    last_update: '12/10/22',
    status: 'In Transit',
    location: 'Toronto, ON, CA',
    progress: 0.5,
    image: require('./images/sampleAdidas.png'),
    latitude: 90.78825,
    longitude: 122.4324,
  },
];
let dataIds = [];

function HistoryScreen({navigation}) {
  const [formPosition] = useState(new Animated.Value(-100));
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [overlayOpacity] = useState(new Animated.Value(0));
  const [formData, setFormData] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Perform data fetching or other actions to refresh the list
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Example: simulate a 2 second delay for data fetching
  };

  const handleSubmit = async () => {
    //console.log(formData.orderNum);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Tracking-Api-Key': 'uyhewhih-yoj8-3k4p-ejz5-eh84roy26ffw',
      },
      body: `{"tracking_number":"${formData.orderNum}"}`,
    };

    try {
      const response = await fetch(
        'https://api.trackingmore.com/v4/couriers/detect',
        options,
      );
      const result = await response.json();

      const detectedCourier = result.data;
      console.log(detectedCourier);
      const courierCodes = detectedCourier.map(courier => courier.courier_code);
      console.log(courierCodes);
      const promises = courierCodes.map(courierCode =>
        fetch('https://api.trackingmore.com/v4/trackings/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Tracking-Api-Key': 'uyhewhih-yoj8-3k4p-ejz5-eh84roy26ffw',
          },
          body: `{"tracking_number":"${formData.orderNum}","courier_code":"${courierCode}"}`,
        }).then(response => response.json()),
      );
      dataIds.push(formData.orderNum);
    } catch (error) {
      console.error('Error:', error);
    }
    try {
      const promises = dataIds.map(trackingnum =>
        fetch(
          `https://api.trackingmore.com/v4/trackings/get?tracking_numbers=${trackingnum}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Tracking-Api-Key': 'uyhewhih-yoj8-3k4p-ejz5-eh84roy26ffw',
            },
          },
        )
          .then(response => response.json())
          .then(response =>
            response.data.filter(item => item.substatus !== 'notfound002'),
          )
          .catch(err => console.error(err)),
      );

      const newData = await Promise.all(promises);
      console.log(newData);
      let i = 0;
      newData.forEach(tracking => {
        console.log(i);
        console.log(tracking[0].origin_info);
        i++;
      });
    } catch (error) {
      console.error('Error:', error);
    }
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
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
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
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: overlayOpacity,
          }}></Animated.View>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={DATA}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
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
                  <MaterialCommunityIcons
                    name="plus"
                    color={'#fff'}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          // ListFooterComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MapTrack', {item})}
                style={{flexDirection: 'row'}}>
                <View style={styles.item}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={item.image}
                    resizeMode="contain"
                  />
                </View>
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
              </TouchableOpacity>
            </View>
          )}
        />
        <Animated.View
          style={[
            styles.formContainer,
            {
              transform: [{translateY: formPosition}],
              display: isFormVisible ? 'flex' : 'none',
            },
          ]}>
          <Text style={styles.inputText}>Tracking Number</Text>
          <TextInput
            style={styles.input}
            placeholder="  Tracking Number"
            placeholderTextColor="black"
            value={formData.orderNum || ''}
            onChangeText={text => setFormData({...formData, orderNum: text})}
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
    fontWeight: 'bold',
  },
  inputText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    width: '80%',
    marginBottom: 20,
    fontSize: 16,
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
