import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Touchable,
} from 'react-native';

const DATA = [
  {
    key: '1',
    brandImage: require('./images/sampleNike.png'),
    brand: 'Nike',
    website: 'https://nike.com',
    description: 'Just do it.',
    website: '',
    products: [
      {
        key: '1',
        name: 'Air Force 1',
        price: '180',
        image: require('./images/nikeAF1.png'),
      },
      {
        key: '2',
        name: 'Zoom Pegasus',
        price: '220',
        image: require('./images/nikeZoom.png'),
      },
      {
        key: '3',
        name: 'Slides',
        price: '40',
        image: require('./images/nikeSlides.png'),
      },
      {
        key: '4',
        name: 'Dunk High Retro',
        price: '180',
        image: require('./images/nikeDunkRetro.png'),
      },
    ],
  },
  {
    key: '2',
    brand: 'Adidas',
    brandImage: require('./images/sampleAdidas.png'),
    website: 'https://adidas.com',
    description: 'The brand with 3 stripes',
    products: [
      {
        key: '1',
        name: 'Air Force 1',
        price: '180',
        image: require('./images/nikeAF1.png'),
      },
      {
        key: '2',
        name: 'Zoom Pegasus',
        price: '220',
        image: require('./images/nikeZoom.png'),
      },
      {
        key: '3',
        name: 'Slides',
        price: '40',
        image: require('./images/nikeSlides.png'),
      },
      {
        key: '4',
        name: 'Dunk High Retro',
        price: '180',
        image: require('./images/nikeDunkRetro.png'),
      },
    ],
  },
  {
    key: '3',
    brand: 'LV',
    brandImage: require('./images/sampleLV.png'),
    website: 'https://eu.louisvuitton.com/eng-e1/homepage',
    description: 'Louis Vuitton Official',
    products: [
      {
        key: '1',
        name: 'Air Force 1',
        price: '180',
        image: require('./images/nikeAF1.png'),
      },
      {
        key: '2',
        name: 'Zoom Pegasus',
        price: '220',
        image: require('./images/nikeZoom.png'),
      },
      {
        key: '3',
        name: 'Slides',
        price: '40',
        image: require('./images/nikeSlides.png'),
      },
      {
        key: '4',
        name: 'Dunk High Retro',
        price: '180',
        image: require('./images/nikeDunkRetro.png'),
      },
    ],
  },
  {
    key: '4',
    brand: 'Jordans',
    website: 'https://nike.com/ca/Jordan',
    brandImage: require('./images/sampleJordan.png'),
    description: "You miss 100% of the shots you don't take",
    products: [
      {
        key: '1',
        name: 'Air Force 1',
        price: '180',
        image: require('./images/nikeAF1.png'),
      },
      {
        key: '2',
        name: 'Zoom Pegasus',
        price: '220',
        image: require('./images/nikeZoom.png'),
      },
      {
        key: '3',
        name: 'Slides',
        price: '40',
        image: require('./images/nikeSlides.png'),
      },
      {
        key: '4',
        name: 'Dunk High Retro',
        price: '180',
        image: require('./images/nikeDunkRetro.png'),
      },
    ],
  },
  // add more items here
];
function MarketScreen({navigation}) {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState(DATA);
  const [sortAscending, setSortAscending] = useState(true);

  const handleSearch = text => {
    setSearchText(text);
    const newData = DATA.filter(item => item.brand.includes(text));
    setData(newData);
  };

  const sortData = () => {
    const newData = [...data];
    newData.sort((a, b) => {
      if (sortAscending) {
        return a.brand.localeCompare(b.brand);
      } else {
        return b.brand.localeCompare(a.brand);
      }
    });
    setData(newData);
    setSortAscending(!sortAscending);
  };

  const topContainer = 
  <View style={styles.topContainer}>
  <View style={styles.searchBar}>
    <TextInput
      value={searchText}
      onChangeText={handleSearch}
      placeholder="🔍 Search"
      placeholderTextColor="#ddd"
      style={styles.searchText}
    />
  </View>
  <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
    <MaterialCommunityIcons
      name="menu"
      color={'#666'}
      size={30}
      style={styles.topButton}
    />
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
    <MaterialCommunityIcons
      name="heart"
      color={'#666'}
      size={30}
      style={styles.topButton}
    />
  </TouchableOpacity>
</View>
  return (
    <View style={styles.container}>
        <View style={styles.listItems}>
          <FlatList
            data={data}
            pagingEnabled={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => topContainer}
            ListFooterComponent={() => <View style={styles.separator} />}
            renderItem={({item, index}) => (
              <View style={styles.listItem}>
                <View flexDirection="row" justifyContent="space-between">
                  <Text style={styles.brand}>{item.brand}</Text>
                  {index === 0 ? (
                    <TouchableOpacity onPress={sortData}>
                      <MaterialCommunityIcons
                        name="swap-vertical"
                        color={'#666'}
                        size={30}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View />
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('BrandPage', {item})}>
                  <View style={styles.itemContainer}>
                    <Image source={item.products[0].image} style={styles.itemImage} />
                    <View style={{flexDirection: 'column', flex: 1}}>
                      <Image source={item.products[1].image} style={styles.itemImage} />
                      <View style={{flexDirection: 'row', flex: 1}}>
                        <Image source={item.products[2].image} style={styles.itemImage} />
                        <Image source={item.products[3].image} style={styles.itemImage} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
  },
  topContainer: {
    flexDirection: 'row',
    height: 50,
    marginTop: 10,
    padding: 5,
    justifyContent: 'center',
  },
  topButton: {
    height: 50,
    width: 50,
  },
  itemImage: {
    flex: 1,
    resizeMode: 'contain',
    height: 'auto',
    width: 'auto',
  },
  itemContainer: {
    width: 350,
    height: 150,
    flexDirection: 'row',
    padding: 5,
    margin: 2,
    borderRadius: 15,
    backgroundColor: '#f6f6f6',
  },
  listItem: {
    padding: 5,
    margin: 2,
  },
  brand: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  searchBar: {
    backgroundColor: '#666666',
    borderRadius: 15,
    flex: 1,
    height: 45,
    textAlign: 'center',
    marginRight: 20,
  },
  searchText: {
    margin: 3,
    fontSize: 17,
    color: '#000',
    paddingTop: 9,
    paddingLeft: 5,
    borderRadius: 10,
  },
});

export default MarketScreen;
