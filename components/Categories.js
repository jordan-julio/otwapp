import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

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

const Categories = () => {
  return (
    <ScrollView style={styles.container}>
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
