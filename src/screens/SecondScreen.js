import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import React from 'react';
import Header from '../layout/Header';
import Carousel from '../components/Carousel';
import SecondScreen1 from '../components/SecondScreen1';
import SecondScreen2 from '../components/SecondScreen2';
import Footer from '../components/Footer';
import CustomButton from '../components/common/CustomButton';
import { useSelector } from 'react-redux';

const headerContent = {
  leftItemContents: {
    type: 'image',
    content: require('../assets/images/icon_cancel.png'),
    navigateScreen: 'LoginScreen',
  },
  middleItemContents: {
    type: 'text',
    content: '객실 정보',
    navigateScreen: 'HomeScreenDetail1',
  },
  rightItemContents: {
    type: 'image',
    content: require('../assets/images/cart.png'),
    navigateScreen: 'LoginScreen',
  },
};
const SecondScreen = () => {
  const { container } = styles;
  const selected_subLocation = useSelector((st) => st.common.selected_sub_location);
  return (
    <View style={container}>
      <Header headerContent={headerContent} />
      <ScrollView>
        <Carousel carouselData={selected_subLocation.carousel} />
        <Text
          style={[
            styles.text1,
            {
              fontSize: RFPercentage(4),
              paddingTop: hp('5%'),
              paddingBottom: hp('2%'),
              paddingHorizontal: wp('5%'),
            },
          ]}>
          {selected_subLocation.title}
        </Text>
        <Text style={[styles.text2, { paddingHorizontal: wp('5%') }]}>
          {selected_subLocation.description}
        </Text>
        <View style={styles.border1}></View>
        <Text
          style={[
            styles.text1,
            {
              paddingBottom: hp('2%'),
              paddingHorizontal: wp('5%'),
            },
          ]}>
          기본정보
        </Text>
        <SecondScreen1 t1="정보" t2="기본정보" />
        <SecondScreen1 t1="abcd" t2="abcd" />
        <View style={styles.border2}></View>
        <SecondScreen1 t1="abcd" t2="abcd" />
        <SecondScreen1 t1="객실정보" t2="전기사용가능" />
        <View style={styles.view1}>
          <Text style={styles.text2}>구비시설</Text>
          <Text></Text>
          <Text style={[styles.text2, { textAlign: 'right', lineHeight: 24 }]}>
            개별바비큐, 식탁, 에어컨, 식기도구, {'\n'}전자레인지, 취사도구,
            선풍기
          </Text>
        </View>
        <View style={styles.border2}></View>
        <SecondScreen1 t1="기준차량" t2="총 1대" />
        <SecondScreen1 t1="차량 초과요금" t2="14,000" />
        <View style={styles.border1}></View>

        {selected_subLocation.allFeatures.map((allFeature) => {
          return <View>
            <Text
              style={[
                styles.text1,
                { paddingHorizontal: wp('5%'), paddingBottom: hp('3%') },
              ]}>
              {allFeature.add_feature_title}
            </Text>
            <View style={styles.view1}>
              <Text style={styles.text2}>인원추가 요금</Text>
              <Text style={[styles.text2, { textAlign: 'right', lineHeight: 24 }]}>
                성인 22,000{'\n'}아동 22,000{'\n'}유아 22,000
              </Text>
            </View>

            <View style={styles.border2}></View>
            <View style={styles.view1}>
              <Text style={styles.text2}>바비큐 추가</Text>
              <Text></Text>
              <Text style={[styles.text2, { textAlign: 'right', lineHeight: 24 }]}>
                숯불 포함 15,000{'\n'}숯불 미포함 10,000
              </Text>
            </View>
          </View>;
        })}
        {/* <View style={styles.view1}>
          <Text style={styles.text2}>인원추가 요금</Text>
          <Text></Text>
          <Text style={[styles.text2, { textAlign: 'right', lineHeight: 24 }]}>
            성인 22,000{'\n'}아동 22,000{'\n'}유아 22,000
          </Text>
        </View>

        <View style={styles.border2}></View>
        <View style={styles.view1}>
          <Text style={styles.text2}>바비큐 추가</Text>
          <Text></Text>
          <Text style={[styles.text2, { textAlign: 'right', lineHeight: 24 }]}>
            숯불 포함 15,000{'\n'}숯불 미포함 10,000
          </Text>
        </View> */}



        <View style={styles.border2}></View>
        <Text style={[styles.text2, { paddingHorizontal: wp('5%') }]}>
          추가 옵션으로 발생하는 요금은 현장에서 결제해주세요
        </Text>
        <View style={styles.border1}></View>
        <Text
          style={[
            styles.text1,
            { paddingHorizontal: wp('5%'), paddingBottom: hp('3%') },
          ]}>
          환불 금액
        </Text>
        <View style={{ paddingBottom: hp('18%') }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: wp('5%'),
              borderBottomWidth: 1,
              borderBottomColor: '#EFF0F2',
              paddingVertical: hp('2%'),
              backgroundColor: '#EFF0F2',
            }}>
            <Text style={{ width: wp('30%'), textAlign: 'center' }}>aaaaaa</Text>
            <Text style={{ width: wp('30%'), textAlign: 'center' }}>bbbbb</Text>
            <Text style={{ width: wp('30%'), textAlign: 'center' }}>cccccc</Text>
          </View>
          <SecondScreen2 t1="aa" t2="bb" t3="cc" />
          <SecondScreen2 t1="aaaaaaaaa" t2="bb" t3="cc" />
          <SecondScreen2 t1="aa" t2="bb" t3="cc" />
          <SecondScreen2 t1="aa" t2="bb" t3="cc" />
          <SecondScreen2 t1="aa" t2="bb" t3="cc" />
          <SecondScreen2 t1="aaaaaaaaa" t2="bb" t3="cc" />
          <SecondScreen2 t1="aa" t2="bb" t3="cc" />
          <SecondScreen2 t1="aa" t2="bb" t3="cc" />
        </View>
        <Footer />
      </ScrollView>
      <CustomButton buttonText={"예약하기"} />
    </View>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  view1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
  },
  text1: {
    fontWeight: '900',
    fontSize: 16,
    color: 'black',
  },
  text2: { fontWeight: '600', color: '#454C53' },
  border1: { borderWidth: 4, borderColor: 'lightgrey', marginVertical: hp('5%') },
  border2: {
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    marginVertical: hp('3%'),
  },
  button1: {
    backgroundColor: '#191919',
    color: '#76FFC5',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 50,
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    width: wp('100%'),
    bottom: 0,
  },
});
