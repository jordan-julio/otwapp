/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image} from 'react-native';

function ItemDetails({route}) {
  if (route.params != null) {
    const {item} = route.params;
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{textAlign: 'center'}}>{item.title}</Text>
        <Image
          style={{
            flex: 1,
            width: '90%',
            height: '90%',
          }}
          resizeMode="contain"
          source={item.image}
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

export default ItemDetails;
