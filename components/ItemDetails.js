import React from 'react';
import {View, Text, Image} from 'react-native';

function ItemDetails({route}) {
  const {item} = route.params;

  return (
    <View>
      <Image source={item.image} />
      <Text>{item.title}</Text>
    </View>
  );
}

export default ItemDetails;
