import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import React from 'react';

const ThirdScreen3 = () => {
  return (
    <View style={styles.view1}>
      <Text style={styles.btn1}>예약 취소</Text>
      <Text style={styles.btn2}>주문 목록</Text>
    </View>
  );
};

export default ThirdScreen3;

const styles = StyleSheet.create({
  view1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    marginVertical: hp('8%'),
  },
  btn1: {
    backgroundColor: '#9EA4AA',
    width: wp('42%'),
    textAlign: 'center',
    paddingVertical: hp('1.5%'),
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 10,
    color: 'white',
  },
  btn2: {
    color: '#56C596',
    borderWidth: 3,
    borderColor: '#56C596',
    width: wp('42%'),
    textAlign: 'center',
    paddingVertical: hp('1.5%'),
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 10,
  },
});
