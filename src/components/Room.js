import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React from 'react';
import {navigateTo} from '../navigation/utils/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedLocation} from '../redux/actions/common';

const Room = ({item, cardHeight}) => {
  let finalPrice = 0;
  const dispatch = useDispatch();

  let seatCount = 0;
  item.subLocations.forEach(sub => [(seatCount = seatCount + sub.stock)]);

  return (
    <TouchableOpacity
      style={{height: cardHeight}}
      onPress={() => {
        dispatch(setSelectedLocation(item));
        console.log('clicked>>>>>>>>>', item);
        navigateTo('Rent', {subLocations: item});
      }}>
      <View
        style={{
          marginHorizontal: wp('5%'),
          marginVertical: hp('2%'),
          borderRadius: 25,
          borderWidth: 1,
          borderColor: 'lightgrey',
        }}>
        <View style={styles.view1}>
          {item.category.map(cat => {
            return (
              <Text key={cat} style={styles.button1}>
                {cat}
              </Text>
            );
          })}
        </View>
        <Image
          source={{uri: item.carousel[0]}}
          style={{
            width: wp('90%'),
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            height: 210,
          }}
        />
        <Text
          style={[styles.text1, {paddingTop: hp('3%'), paddingLeft: wp('5%')}]}>
          {item.title}
        </Text>
        <Text
          style={[styles.text2, {paddingTop: hp('1%'), paddingLeft: wp('5%')}]}>
          {item.description}
        </Text>
        <View style={styles.view2}>
          <Text>
            <Text style={[styles.text1, {fontSize: 20}]}>
              {item?.cheapestSublocation === 0
                ? item?.price
                : item?.cheapestSublocation}
            </Text>
            <Text style={{fontSize: 12, fontWeight: '600', color: '#454C53'}}>
              원~
            </Text>
          </Text>
          <Text
            style={[
              styles.text2,
              {color: '#55C595', textAlignVertical: 'bottom'},
            ]}>
            {`남은자리 ${seatCount}개`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Room;
const styles = StyleSheet.create({
  view1: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 22,
    top: 20,
    left: wp('5%'),
  },
  view2: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingRight: wp('35%'),
    paddingLeft: wp('5%'),
    marginTop: hp('3%'),
    marginBottom: hp('2.5%'),
  },
  text1: {
    fontWeight: '900',
    fontSize: 16,
    color: '#000',
  },
  text2: {fontWeight: '600', color: '#454C53'},
  button1: {
    backgroundColor: 'grey',
    color: '#fff',
    marginRight: wp('5%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: 3,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
