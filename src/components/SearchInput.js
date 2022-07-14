import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React from 'react';

const SearchInput = () => {
  return (
    <View style={styles.view1}>
      <TextInput placeholder="보리보리 울캠핑보장" style={styles.searchbox} />
      <Image source={require('../assets/images/search_icon.png')} />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  view1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    position: 'absolute',
    zIndex: 22,
    backgroundColor: 'white',
    width: wp('100%'),
    height: 70,
  },
  searchbox: {
    fontSize: 18,
  },
});
