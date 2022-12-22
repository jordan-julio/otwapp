import React, {useState} from 'react';
import {
  ScrollView,
  Dimensions,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import MultiSlider from 'react-native-slider-x';
import RangeSlider from 'rn-range-slider';

const screenWidth = Dimensions.get('window').width;

const DiscoverScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const items = [
    {name: 'Itema 1', image: require('./images/sampleAdidas.png'), price: 20},
    {name: 'Itemas 2', image: require('./images/sampleJordan.png'), price: 30},
    {name: 'Item 3', image: require('./images/sampleLV.png'), price: 40},
    {name: 'Item 4', image: require('./images/sampleNike.png'), price: 10},
    {name: 'Itema 5', image: require('./images/sampleAdidas.png'), price: 50},
    {name: 'Itemas 6', image: require('./images/sampleJordan.png'), price: 60},
    {name: 'Item 7', image: require('./images/sampleLV.png'), price: 15},
    {name: 'Item 8', image: require('./images/sampleNike.png'), price: 20},
  ];

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search"
      />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{height: 70}}>
        <TouchableOpacity
          onPress={() => setFilter('itema')}
          style={styles.button}>
          <Text style={styles.buttonText}>Most Searched 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter('itemas')}
          style={styles.button}>
          <Text style={styles.buttonText}>Most Searched 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter('Itema 1')}
          style={styles.button}>
          <Text style={styles.buttonText}>Most Searched 3</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('')} style={styles.button}>
          <Text style={styles.buttonText}>Clear Filter</Text>
        </TouchableOpacity>
      </ScrollView>
      <Text>{maxPrice}</Text>
      <MultiSlider
        style={styles.slider}
        maximumValue={100}
        minimumValue={0}
        onValueChange={value => setMaxPrice(value)}
      />
      {/**<RangeSlider
        style={{width: 160, height: 80}}
        gravity={'center'}
        min={200}
        max={1000}
        step={20}
        selectionColor="#3df"
        blankColor="#f618"
        onValueChanged={(low, high, fromUser) => {
          this.setState({rangeLow: low, rangeHigh: high});
        }}
      />**/}
      <FlatList
        style={styles.carouselContainer}
        numColumns={2}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        data={items.filter(item => {
          if (filter !== '') {
            return (
              new RegExp(filter, 'i').test(item.name) &&
              item.price > minPrice &&
              item.price < maxPrice
            );
          } else if (searchTerm !== '') {
            return (
              new RegExp(searchTerm, 'i').test(item.name) &&
              item.price > minPrice &&
              item.price < maxPrice
            );
          } else {
            return item.price > minPrice && item.price < maxPrice;
          }
        })}
        pagingEnabled={false}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: '100%', height: '100%'}}
              source={item.image}
              resizeMode="contain"
            />
          </View>
        )}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  carouselContainer: {
    width: screenWidth / 1.05,
    backgroundColor: '#666666',
    marginBottom: 150,
    borderRadius: 20,
    padding: 10,
    overflow: 'hidden',
    alignContent: 'center',
  },
  item: {
    width: 160,
    height: 160,
    padding: 20,
    margin: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'center',
  },
  searchInput: {
    borderRadius: 20,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    width: screenWidth / 1.1,
    padding: 10,
    borderWidth: 1,
  },
  button: {
    borderWidth: 1.5,
    borderColor: '#000',
    padding: 8,
    margin: 8,
    borderRadius: 20,
    backgroundColor: '#a9a9a9',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#fff',
  },
  slider: {
    width: '80%',
    height: 40,
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  selected: {
    backgroundColor: '#3F51B5',
  },
  marker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#3F51B5',
  },
});

export default DiscoverScreen;
