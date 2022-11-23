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
import MyScreen1 from '../components/MyScreen1';
import Header from '../layout/Header';
import Footer from '../components/Footer';

export const MyScreen = props => {
  const {
    container,
    view1,
    view2,
    text1,
    text2,
    ph1,
    textinput1,
    border1,
    border2,
    button1,
  } = styles;
  const headerContent = {
    middleItemContents: {
      type: 'text',
      content: '주문/결제',
      navigateScreen: 'HomeScreenDetail1',
    },
    leftItemContents: {
      type: 'image',
      content: require('../assets/images/icon_cancel.png'),
      navigateScreen: 'LoginScreen',
    },
  };

  const [flag, setFlag] = useState({p1: true, p2: true, p3: true, p4: true});

  const Comp = ({t1, t2, p}) => {
    return (
      <View
        style={[
          styles.ph1,
          {display: 'flex', flexDirection: 'row', paddingTop: hp('1%')},
        ]}>
        <TouchableOpacity
          onPress={() => setFlag(prev => ({...prev, [p]: !prev[p]}))}>
          {flag[p] ? (
            <Image source={require('../assets/images/green_circle.png')} />
          ) : (
            <Image source={require('../assets/images/white_circle.png')} />
          )}
        </TouchableOpacity>
        <Text style={[styles.text2, {marginLeft: wp('3%')}]}>
          <Text style={{color: '#55C595'}}>{t1}</Text>
          <Text style={{color: '#000'}}>{t2}</Text>
        </Text>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: '#fff'}}>
      <Header headerContent={headerContent} />
      <View style={border2}></View>
      <ScrollView>
        <Text style={[text1, ph1]}>주문자</Text>
        <View
          style={[
            view1,
            ph1,
            {
              alignItems: 'center',
              paddingTop: hp('4%'),
            },
          ]}>
          <Text
            style={{
              fontSize: RFPercentage(2.1),
              color: '#454C53',
              fontWeight: '600',
            }}>
            이름
          </Text>
          <TextInput style={textinput1} keyboardType="numeric" />
        </View>
        <View style={border1}></View>
        <Text style={[text1, ph1]}>대여 기간</Text>
        <View
          style={[
            view1,
            ph1,
            {
              alignItems: 'center',
              paddingTop: hp('2.5%'),
            },
          ]}>
          <Text style={text2}>대여 시작일</Text>
          <View></View>
          <Text style={text2}>2022.07.18 (월)</Text>
        </View>
        <View
          style={[
            view1,
            ph1,
            {
              alignItems: 'center',
              paddingTop: hp('1%'),
            },
          ]}>
          <Text style={text2}>대여 반납일</Text>
          <View></View>
          <Text style={text2}>2022.07.19 (화)</Text>
        </View>
        <View style={border1}></View>
        <Text
          style={[
            text1,
            ph1,
            {
              paddingBottom: hp('4%'),
            },
          ]}>
          대여 시작일
        </Text>
        <View style={[view2]}>
          <Text
            style={{
              fontSize: RFPercentage(2.1),
              color: '#454C53',
              fontWeight: '600',
            }}>
            수령인
          </Text>
          <TextInput style={textinput1} keyboardType="numeric" />
        </View>
        <View style={view2}>
          <Text
            style={{
              fontSize: RFPercentage(2.1),
              color: '#454C53',
              fontWeight: '600',
            }}>
            연락처
          </Text>
          <View
            style={{
              width: wp('65%'),
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
              height: '80%',
            }}>
            <TextInput
              style={{
                borderWidth: 1,
                width: wp('20%'),
                borderColor: 'lightgrey',
              }}
              keyboardType="numeric"
            />
            <Text style={{textAlignVertical: 'center'}}>-</Text>
            <TextInput
              style={{
                borderWidth: 1,
                width: wp('20%'),
                borderColor: 'lightgrey',
              }}
              keyboardType="numeric"
            />
            <Text style={{textAlignVertical: 'center'}}>-</Text>
            <TextInput
              style={{
                borderWidth: 1,
                width: wp('20%'),
                borderColor: 'lightgrey',
              }}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={view2}>
          <Text
            style={{
              fontSize: RFPercentage(2.1),
              color: '#454C53',
              fontWeight: '600',
            }}>
            이
          </Text>
          <View
            style={{
              width: wp('65%'),
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
              height: '80%',
            }}>
            <TextInput
              style={{
                borderWidth: 1,
                width: wp('30%'),
                borderColor: 'lightgrey',
              }}
              keyboardType="numeric"
            />
            <Text style={{backgroundColor: '#8F9295', width: wp('30%')}}>
              bb
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            paddingHorizontal: wp('5%'),
          }}>
          <TextInput
            style={[
              textinput1,
              // {
              //   marginBottom: hp('2%'),
              // },
            ]}
            keyboardType="numeric"
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            paddingHorizontal: wp('5%'),
          }}>
          <TextInput
            style={[
              textinput1,
              // {
              //   marginBottom: hp('2%'),
              // },
            ]}
            keyboardType="numeric"
          />
        </View>
        <View style={view1}>
          <Text
            style={{
              fontSize: RFPercentage(2.1),
              color: '#454C53',
              fontWeight: '600',
            }}>
            배송{'\n'}메세지
          </Text>
          <TextInput
            placeholder={'별도 요청사항이 없으실 경우, \n 공란으로 비워주세요'}
            style={[
              textinput1,
              {
                height: 100,
                textAlignVertical: 'top',
              },
            ]}></TextInput>
        </View>
        <View style={border1}></View>
        <MyScreen1 />
        <MyScreen1 />
        <View style={border1}></View>
        <Text
          style={[
            text1,
            {
              paddingHorizontal: wp('5%'),
            },
          ]}>
          결제 정보
        </Text>
        <View
          style={[
            view1,
            {
              paddingTop: hp('2.5%'),
            },
          ]}>
          <Text style={text2}>총 상품금액</Text>
          <Text></Text>
          <Text style={text2}>130,000원</Text>
        </View>
        <View
          style={[
            view1,
            {
              paddingTop: hp('2.5%'),
            },
          ]}>
          <Text style={text2}>배송비</Text>
          <Text></Text>
          <Text style={text2}>+6,000원</Text>
        </View>
        <View style={border2}></View>
        <View style={view1}>
          <Text style={text2}>최종 결제 금액</Text>
          <Text></Text>
          <Text style={[text2, {color: '#55C595'}]}>130,000원</Text>
        </View>
        <Text style={[ph1, {paddingTop: hp('5%')}]}>
          <Text style={text2}>-2022.05.20 23:59:59</Text>
          <Text style={{color: '#000'}}>
            까지 결제(입금)되지 않으면 예약이 자동취소 됩니다.
          </Text>
        </Text>
        <View style={border1}></View>
        <Text style={[text1, ph1]}>결제 방법</Text>
        <View
          style={[
            ph1,
            {display: 'flex', flexDirection: 'row', paddingTop: hp('2%')},
          ]}>
          <TouchableOpacity
            onPress={() => setFlag(prev => ({...prev, p1: !prev.p1}))}>
            {flag.p1 ? (
              <Image source={require('../assets/images/green_circle.png')} />
            ) : (
              <Image source={require('../assets/images/white_circle.png')} />
            )}
          </TouchableOpacity>

          <View style={{marginLeft: wp('3%')}}>
            <Text style={[text2]}>무통장 입금</Text>
            <Text style={[text2, {paddingTop: hp('1%')}]}>
              하나은행 / 1111-1111-111/ 임태영
            </Text>
            <Text style={{paddingTop: hp('1%')}}>
              위 계좌로 입금이 완료되면 배송준비가 시작됩니다.
            </Text>
          </View>
        </View>
        <View style={border1}></View>
        <Text style={[text1, ph1]}>결제시 필수사항 동의</Text>
        <View style={{paddingBottom: hp('20%'), paddingTop: hp('2%')}}>
          <Comp t1="예약 유의사항 및 취소/환불규정 " t2="동의 (필수)" p="p2" />
          <Comp t1="개인정보 수집 및 이용 " t2="동의 (필수)" p="p3" />
          <Comp t1="개인정보 제3자 제공 " t2="동의 (필수)" p="p4" />
        </View>
        <Footer />
      </ScrollView>
      <Text style={button1}>주문하기</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingBottom: hp('10%'), paddingHorizontal: wp('10%')},
  view1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
  },
  view2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('2%'),
  },
  text1: {
    fontWeight: '900',
    fontSize: 16,
    color: '#000',
  },
  text2: {fontWeight: '600', color: '#454C53'},
  ph1: {paddingHorizontal: wp('5%')},
  textinput1: {
    width: wp('65%'),
    height: '80%',
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  border1: {
    borderBottomWidth: 8,
    borderColor: 'lightgrey',
    marginVertical: hp('5%'),
  },
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
