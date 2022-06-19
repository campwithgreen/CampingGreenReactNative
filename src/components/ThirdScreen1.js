import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import React from 'react';

const ThirdScreen1 = () => {
  return (
    <View style={styles.view1}>
      <Text
        style={{
          fontWeight: 'bold',
          color: '#FFFFFF',
          fontSize: 18,
          textAlign: 'center',
          marginTop: hp('3%'),
          marginBottom: hp('1%'),
        }}>
        예약이 완료되었습니다.
      </Text>
      <Text style={{textAlign: 'center', marginBottom: hp('5%')}}>
        <Text style={[styles.text2]}>주문번호</Text>
        <Text style={[styles.text2, {color: '#56C596'}]}>
          {'  '}
          ORD20220718-203094
        </Text>
      </Text>
      <View style={styles.view2}>
        <Text style={styles.text2}>예약자</Text>
        <Text style={styles.text2}>총계</Text>
        <Text style={styles.text2}>예약기간</Text>
      </View>
      <View style={styles.view2}>
        <Text style={[styles.text2, {color: '#E8EBED'}]}>예약자</Text>
        <Text style={[styles.text2, {color: '#E8EBED'}]}>300,000</Text>
        <Text style={[styles.text2, {color: '#E8EBED'}]}>7.18 - 7.19</Text>
      </View>
    </View>
  );
};

export default ThirdScreen1;

const styles = StyleSheet.create({
  view1: {
    backgroundColor: '#26282B',
    paddingVertical: hp('5%'),
  },
  view2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('5%'),
    paddingBottom: hp('1%'),
  },
  text2: {
    fontWeight: '600',
    color: '#9EA4AA',
    width: wp('30%'),
    textAlign: 'center',
  },
});
