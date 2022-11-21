import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';

const Footer = () => {
  return (
    <View
      style={{
        backgroundColor: '#EFF0F2',
        paddingVertical: hp('5%'),
        paddingBottom: 50,
        paddingHorizontal: wp('5%'),
      }}>
      <Text
        style={{
          color: '#1B1D1F',
          fontSize: RFPercentage(2.1),
          fontWeight: 'bold',
        }}>
        고객센터 010-7927-5475
      </Text>
      <Text style={{paddingVertical: hp('2%')}}>
        운영시간 평일/주말 10:00 ~ 23:00{'\n'}점심시간 평일/주말 12:00 ~ 13:00
      </Text>
      <Text style={{color: '#9EA4AA'}}>
        땡큐캠핑은 통신판매중개자로서 통신판매의 당사자가 아니며 상품의 예약,{' '}
        {'\n'}
        이용 및 환불 등과 관련된 의무와 책임은 각 판매자에게 있습니다.
      </Text>
    </View>
  );
};

export default Footer;
