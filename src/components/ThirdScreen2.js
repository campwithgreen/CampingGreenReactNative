import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import React from 'react';

const ThirdScreen2 = () => {
  return (
    <View style={{paddingVertical: hp('5%')}}>
      <Text
        style={{
          fontWeight: 'bold',
          color: '#1B1D1F',
          fontSize: 18,
          marginHorizontal: wp('5%'),
        }}>
        입금 은행정보
      </Text>
      <View style={styles.border1}></View>
      <View style={styles.view1}>
        <Text style={{color: '#56C596', fontWeight: 'bold', fontSize: 16}}>
          하나은행 4318901100083
        </Text>
        <Text
          style={{
            backgroundColor: '#9EA4AA',
            borderRadius: 30,
            color: '#fff',
            paddingHorizontal: wp('3.5%'),
            paddingVertical: hp('0.8%'),
            fontSize: 12,
          }}>
          결제금액
        </Text>
      </View>
      <Text
        style={{
          color: '#9EA4AA',
          fontWeight: '600',
          marginHorizontal: wp('5%'),
        }}>
        위에 안내 된 계좌로 입금이 완료되면 예약이 확정됩니다.기한 내 입금되지
        않으면, 주문이 자동취소됩니다.
      </Text>
    </View>
  );
};

export default ThirdScreen2;

const styles = StyleSheet.create({
  border1: {
    borderBottomWidth: 5,
    borderBottomColor: '#1B1D1F',
    paddingVertical: hp('1%'),
    marginHorizontal: wp('5%'),
  },
  view1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
    height: 90,
    marginVertical: hp('3%'),
    marginHorizontal: wp('5%'),
  },
});
