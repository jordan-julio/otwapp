import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput

} from 'react-native';

const DATA = [
  {
    key: '1',
    brand: 'Nike',
    image1: require('./images/nikeAF1.png'),
    image2: require('./images/nikeZoom.png'),
    image3: require('./images/nikeSlides.png'),
    image4: require('./images/nikeDunkRetro.png'),
  },
  {
    key: '2',
    brand: 'Adidas',
    image1: require('./images/nikeAF1.png'),
    image2: require('./images/nikeZoom.png'),
    image3: require('./images/nikeSlides.png'),
    image4: require('./images/nikeDunkRetro.png'),
  },
  {
    key: '3',
    brand: 'LV',
    image1: require('./images/nikeAF1.png'),
    image2: require('./images/nikeZoom.png'),
    image3: require('./images/nikeSlides.png'),
    image4: require('./images/nikeDunkRetro.png'),
  },
  {
    key: '4',
    brand: 'Jordans',
    image1: require('./images/nikeAF1.png'),
    image2: require('./images/nikeZoom.png'),
    image3: require('./images/nikeSlides.png'),
    image4: require('./images/nikeDunkRetro.png'),
  },
  // add more items here
];
function MarketScreen({navigation}) {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState(DATA);

  const handleSearch = (text) => {
    setSearchText(text);
    const newData = DATA.filter((item) => item.brand.includes(text));
    setData(newData);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        //style={isDarkView ? darkViewStyles : lightViewStyles}
      >
        <View style={styles.searchBar}>
          <TextInput
            value={searchText}
            onChangeText={handleSearch}
            placeholder="Search your brand!"
            placeholderTextColor="#fff" 
            style={styles.searchText}
          />
        </View>
        <View style={styles.listItems}>
          <FlatList
            data={data}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => <View style={styles.separator} />}
            ListFooterComponent={() => <View style={styles.separator} />}
            renderItem={({item}) => (
              <View style={styles.listItem}>
                <Text style={styles.brand}>{item.brand}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ItemDetails', {item})}>
                  <View style={styles.itemContainer}>
                    <Image source={item.image1} style={styles.itemImage} />
                    <View style={{flexDirection: 'column', flex: 1}}>
                      <Image source={item.image2} style={styles.itemImage} />
                      <View style={{flexDirection: 'row', flex: 1}}>
                        <Image source={item.image3} style={styles.itemImage} />
                        <Image source={item.image4} style={styles.itemImage} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
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
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemImage: {
    flex: 1,
    resizeMode: 'contain',
    height: 'auto',
    width: 'auto',
  },
  itemImage1: {
    flex: 1,
    resizeMode: 'contain',
  },
  itemContainer: {
    width: 350,
    height: 150,
    flexDirection: 'row',
    padding: 5,
    margin:2,
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
  },
  searchBar: {
    margin: 10,
    padding: 5,
    backgroundColor:'#666666',
    borderRadius: 5,
    width: 300,
    height: 25,
  },
  searchText: {
    fontSize: 16,
    color: '#ffffff',
  }
});

export default MarketScreen;
