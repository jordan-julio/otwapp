import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CATEGORIES = [
  'Best Sellers',
  'Clothing & Accessories',
  'Beauty & Personal Care',
  'Home & Kitchen',
  'Electronics',
  'Sports & Outdoors',
  'Toys & Games',
  'Books & Media',
  'Baby & Kids',
  'Health & Wellness',
  'Automotive & Industrial',
];

const Categories = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
          style={{alignSelf: 'flex-start', margin: 15}}
          // eslint-disable-next-line no-alert
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" color={'#000'} size={30} />
        </TouchableOpacity>
      <Text style={styles.browse}>Browse</Text>
      <View>
        {CATEGORIES.map(category => (
          <TouchableOpacity style={styles.button} key={category}>
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    margin: 10,
    padding: 15,
  },
  button: {
    margin: 10,
    padding: 15,
    backgroundColor: '#666',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  browse: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center'
  },
});
export default Categories;
