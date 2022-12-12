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
  SafeAreaView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Header} from 'react-native/Header';

const screenHeight = Dimensions.get('window').height;

const data = [
  {key: '1', title: 'Item 1', image: require('./images/sampleAdidas.png')},
  {key: '2', title: 'Item 2', image: require('./images/sampleJordan.png')},
  {key: '3', title: 'Item 3', image: require('./images/sampleLV.png')},
  {key: '4', title: 'Item 4', image: require('./images/sampleNike.png')},
  // add more items here
];

function HomeScreen({navigation}) {
  const [isDarkView, setIsDarkView] = useState(false);

  // Define the styles for the dark and light views
  const darkViewStyles = {
    backgroundColor: 'black',
    color: 'white',
  };
  const lightViewStyles = {
    backgroundColor: 'white',
    color: 'black',
  };

  const toggleButtonText = isDarkView
    ? 'Switch to Light View'
    : 'Switch to Dark View';

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        //style={isDarkView ? darkViewStyles : lightViewStyles}
      >
        <SafeAreaView>
          <View style={styles.head}>
            <Text style={styles.headTitle}>OTW</Text>
            <TouchableOpacity
              style={styles.headButton}
              onPress={() => navigation.navigate('Notifications')}>
              <MaterialCommunityIcons name="bell" color={'#000'} size={25} />
            </TouchableOpacity>
          </View>
          {/* Add other components here */}
        </SafeAreaView>
        <Text style={styles.title}>Trending</Text>
        <View style={styles.container}>
          <FlatList
            style={styles.carouselContainer}
            data={data}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => <View style={styles.separator} />}
            ListFooterComponent={() => <View style={styles.separator} />}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ItemDetails', {item})}>
                <View style={styles.item}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={item.image}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <Text style={styles.title}>Sales</Text>
        <View style={styles.container}>
          <FlatList
            style={styles.carouselContainer}
            data={data}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity>
                <View style={styles.item}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={item.image}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <Text style={styles.title}>Past Orders</Text>
        <View style={styles.container}>
          <FlatList
            style={styles.carouselContainer}
            data={data}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity>
                <View style={styles.item}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={item.image}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    flex: 1,
    color: '#000',
  },
  container: {
    backgroundColor: '#D9D9D9',
    overflow: 'hidden',
  },
  carouselContainer: {
    height: screenHeight / 4.5,
    backgroundColor: '#666666',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  item: {
    width: 140,
    height: 160,
    padding: 20,
    margin: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    margin: 10,
    flex: 1,
  },
  headButton: {
    margin: 10,
  },
  separator: {
    height: 19,
    backgroundColor: '#000',
  },
});

export default HomeScreen;
