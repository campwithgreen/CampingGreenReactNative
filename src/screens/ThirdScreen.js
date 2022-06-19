import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import ThirdScreen1 from '../components/ThirdScreen1';
import ThirdScreen2 from '../components/ThirdScreen2';
import ThirdScreen3 from '../components/ThirdScreen3';
import Header from '../layout/Header';
import ThirdScreen5 from '../components/ThirdScreen5';
import SecondScreen1 from '../components/SecondScreen1';
import ThirdScreen4 from '../components/ThirdScreen4';
const headerContent = {
  leftItemContents: {
    type: 'image',
    content: require('../assets/images/icon_cancel.png'),
    navigateScreen: 'LoginScreen',
  },
  rightItemContents: {
    type: 'image',
    content: require('../assets/images/cart.png'),
    navigateScreen: 'LoginScreen',
  },
};
export default function ThirdScreen() {
  return (
    <View style={{backgroundColor: 'white'}}>
      <ScrollView>
        <Header headerContent={headerContent} />
        <ThirdScreen1 />
        <Text
          style={{
            fontWeight: 'bold',
            color: '#1B1D1F',
            fontSize: 18,
            marginHorizontal: wp('5%'),
            paddingTop: hp('6%'),
          }}>
          주문상품 (2)
        </Text>
        <View style={styles.border1}></View>
        <ThirdScreen4 />
        <ThirdScreen4 />
        <ThirdScreen2 />
        <Text
          style={{
            fontWeight: 'bold',
            color: '#1B1D1F',
            fontSize: 18,
            marginHorizontal: wp('5%'),
            paddingTop: hp('3%'),
          }}>
          결제정보
        </Text>
        <View style={styles.border1}></View>
        <View style={{paddingTop: hp('3.5%')}}>
          <SecondScreen1 t1="결제금액" t2="136,000원" />
        </View>
        <View style={styles.border2}></View>
        <SecondScreen1 t1="결제방법" t2="무통장입금" />
        <View style={styles.border2}></View>
        <SecondScreen1 t1="결제마감일" t2="2022.05.27 23:59:59" />
        <View style={styles.border2}></View>
        <SecondScreen1 t1="현재상태" t2="결제 대기" />
        <Text
          style={{
            fontWeight: 'bold',
            color: '#1B1D1F',
            fontSize: 18,
            marginHorizontal: wp('5%'),
            paddingTop: hp('3%'),
          }}>
          배송정보
        </Text>
        <View style={styles.border1}></View>
        <View style={{paddingTop: hp('3.5%')}}>
          <SecondScreen1 t1="예약자" t2="김그린" />
        </View>
        <View style={styles.border2}></View>
        <SecondScreen1 t1="연락처" t2="010-5561-2550" />
        <View style={styles.border2}></View>
        <SecondScreen1
          t1="배송지"
          t2="세종특별자치시 세종대로 21-9 A동 203호"
        />
        <View style={styles.border2}></View>
        <View style={styles.view1}>
          <Text style={styles.text1}>배송정보 변경은{'  '}</Text>
          <Text style={[styles.text1, {color: '#56C596'}]}>
            송정보변경은{'  '}
          </Text>
          <Image source={require('../assets/images/white_circle.png')} />
          <Text style={styles.text1}>{'  '}전화바랍니다.</Text>
        </View>
        <ThirdScreen3 />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  border1: {
    borderBottomWidth: 5,
    borderBottomColor: '#1B1D1F',
    marginVertical: hp('1%'),
    marginHorizontal: wp('5%'),
  },
  border2: {
    borderBottomWidth: 1.8,
    borderBottomColor: 'lightgrey',
    marginHorizontal: wp('5%'),
    marginBottom: hp('1%'),
  },
  text1: {
    fontWeight: '600',
    color: '#9EA4AA',
  },
  view1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('3%'),
  },
});