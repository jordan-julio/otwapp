/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
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
  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={DATA}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={() => <View style={styles.header}>
      <Text style={styles.titleText}>Orders</Text>
      <TouchableOpacity
        style={styles.headButton}
        // eslint-disable-next-line no-alert
        onPress={() => alert('Go To Add Page!')}>
        <MaterialCommunityIcons name="plus" color={'#000'} size={25} />
      </TouchableOpacity>
    </View>}
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
                }}
              />
            </View>
            <Text style={styles.orderText}>{item.location}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  headButton: {
    margin: 20,
  },
  header: {
    backgroundColor: '#ccc',
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
    color: '#222',
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
