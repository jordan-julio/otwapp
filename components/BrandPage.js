/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function BrandPage({route, navigation}) {
  if (route.params != null) {
    const {item} = route.params;
    const handlePress = () => {
      if (item.website) {
        Linking.openURL(item.website);
      }
    };
    const [data, setData] = useState(item.products);
    const [sortAscending, setSortAscending] = useState(true);
    const [sortPriceAscending, setSortPriceAscending] = useState(true);
    const sortAlphabetical = () => {
        const newData = [...data];
        newData.sort((a, b) => {
          if (sortAscending) {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });
        setData(newData);
        setSortAscending(!sortAscending);
      };
    const sortByPrice = () => {
        const newData = [...data];
        newData.sort((a, b) => {
            if (sortPriceAscending) {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }  
        });
        setData(newData);
        setSortPriceAscending(!sortPriceAscending)
    };
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{alignSelf: 'flex-start', margin: 15}}
          // eslint-disable-next-line no-alert
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" color={'#000'} size={30} />
        </TouchableOpacity>
        <Image style={styles.brandLogo} source={item.brandImage} />
        <Text style={styles.brandTitle}>{item.brand}</Text>
        <Text style={styles.brandDescription}>{item.description}</Text>
        <TouchableOpacity
                style={styles.headButton}
                onPress={() => {handlePress}}><Text style={{color: '#000'}}>🌐 Website</Text></TouchableOpacity>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={sortByPrice} style={styles.button}>
                <Text style={styles.buttonText}>Price</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Popular</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={sortAlphabetical} style={styles.button}>
                <Text style={styles.buttonText}>Name</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Filter 4</Text>
            </TouchableOpacity>
        </View>
        <FlatList
          numColumns={2}
          data={data}
          renderItem={({item}) => (
            <View style={styles.productContainer}>
              <Image style={styles.productImage} source={item.image} />
              <Text style={{color: '#000'}}>{item.name}</Text>
              <Text style={{color: '#000'}}>{item.price}</Text>
            </View>
          )}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>Unavailable!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  brandTitle: {
    fontSize: 40,
    textAlign: 'center',
    color: '#222',
  },
  brandDescription: {
    fontSize: 20,
    textAlign: 'center',
    color: '#222',
  },
  brandLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  productContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 5,
    borderRadius: 5,
  },
  productImage: {
    resizeMode: 'contain',
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  separator: {
    height: 30,
    backgroundColor: '#000',
    color: '#000'
  },
  button: {
    width: 80,
    height: 20,
    borderRadius: 30,
    marginHorizontal: 5,
    marginTop: 10,
    backgroundColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headButton: {
    backgroundColor: '#ccc',
    color: 'white',
    borderRadius: 10,
    padding: 12,
    margin: 20,
    fontSize: 18,
    alignSelf: 'center',
    cursor: 'pointer',
  },

});

export default BrandPage;
