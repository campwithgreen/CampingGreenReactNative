import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ToastAndroid, Keyboard } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, { useState } from 'react';
import { getAllProducts, searchLocation } from '../apis/product';
import { showDefaultErrorAlert } from '../global/global';
import { useDispatch } from 'react-redux';
import { setLocationData } from '../redux/actions/product';

const SearchInput = () => {
  const [searchText, setSearchText] = useState(null);

  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (searchText && searchText !== "") {
      console.log("SEARCHING", searchText);
      let data = {
        location: searchText
      };
      await searchLocation(data).then((res) => {
        if (res) {
          if (res.data.data?.length >= 1) {
            dispatch(setLocationData(res.data.data));
          }
          Keyboard.dismiss();
        }
      }).catch((err) => {
        if (err) {
          showDefaultErrorAlert();
        }
      });
    } else {
      let data = { type: "LOCATION" };
      await getAllProducts(data).then((res) => {
        if (res) {
          dispatch(setLocationData(res.data.data));
          Keyboard.dismiss();
        }
      }).catch((err) => {
        if (err) {
          showDefaultErrorAlert();
        }
      });
    }
  };

  return (
    <View style={styles.view1}>
      <TextInput placeholder="보리보리 울캠핑보장" style={styles.searchbox} onChangeText={(value) => {
        setSearchText(value);
      }} />
      <TouchableOpacity onPress={() => {
        handleSearch();
      }}>
        <Image source={require('../assets/images/search_icon.png')} />
      </TouchableOpacity>
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
