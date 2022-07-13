import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Header from '../layout/Header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import RentDetail from '../components/RentDetail';

const headerContent = {
  leftItemContents: {
    type: 'text',
    content: 'CAMPING GREEEN',
    navigateScreen: 'HomeScreenDetail1',
  },
  rightItemContents: {
    type: 'image',
    content: require('../assets/images/cart.png'),
    navigateScreen: 'LoginScreen',
  },
};

const Rent = () => {
  const {container} = styles;
  return (
    <View style={container}>
      <Header headerContent={headerContent} />
      <ScrollView>
        <View>
          <Carousel paginationType="right" />
        </View>
        <View style={{marginHorizontal: wp('5%'),marginBottom:hp('15%')}}>
          <View style={{marginTop: hp('4%')}}>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(3),
                fontWeight: 'bold',
              }}>
              홍천 보리울 캠핑장
            </Text>
          </View>
          <View
            style={{
              marginTop: hp('3%'),
              paddingBottom: hp('1%'),
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={require('../assets/images/loc.png')} />
            <Text
              style={{
                color: '#9EA4AA',
                fontSize: RFPercentage(2),
                paddingLeft: wp('5%'),
                paddingRight: wp('5%'),
              }}>
              홍천군 서면 밤벌길 131-53
            </Text>
            <Image source={require('../assets/images/icon_location.png')} />
          </View>
          <View
            style={{
              paddingBottom: hp('5%'),
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={require('../assets/images/number.png')} />
            <Text
              style={{
                color: '#9EA4AA',
                fontSize: RFPercentage(2),
                paddingLeft: wp('5%'),
                paddingRight: wp('5%'),
              }}>
              010-1234-5678
            </Text>
            <Image source={require('../assets/images/icon_phone.png')} />
          </View>
          <View
            style={{
              marginTop: wp('5%'),
              padding: wp('4%'),
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: wp('40%'),
                borderRightWidth: 0.5,
              }}>
              <View>
                <Text style={{color: '#454C53', fontSize: RFPercentage(2)}}>
                  대여 시작일
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: '#55C595',
                    fontSize: RFPercentage(2.5),
                    marginTop: wp('.5%'),
                    fontWeight: 'bold',
                  }}>
                  7월 14일 (월)
                </Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: wp('40%'),
                borderLeftWidth: 0.5,
              }}>
              <View>
                <Text style={{color: '#454C53', fontSize: RFPercentage(2)}}>
                  반납 예정일
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: '#55C595',
                    fontSize: RFPercentage(2.5),
                    marginTop: wp('.5%'),
                    fontWeight: 'bold',
                  }}>
                  7월 15일 (월)
                </Text>
              </View>
            </View>
          </View>
          <RentDetail />
          <View style={{marginTop: wp('7%')}}>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(2.5),
                fontWeight: 'bold',
              }}>
              캠핑장 소개
            </Text>
          </View>
          <View
            style={{
              marginVertical: wp('5%'),
              borderBottomWidth: 1,
              borderColor: '#9EA4AA',
            }}>
            <Text
              style={{
                color: '#454C53',
                fontSize: RFPercentage(2),
                marginBottom: wp('5%'),
              }}>
              넓게 펼쳐진 들판과 높은 하늘이 만나는 캠핑장입니다 넓은 들판을
              가운데 두고 삼면을 산을 둘러쌓고 있어 그대로의 자연을 사계절
              경험하실 수 있습니다.
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(2.5),
                fontWeight: 'bold',
              }}>
              이용시설 안내
            </Text>
          </View>
          <View
            style={{
              marginVertical: wp('5%'),
            }}>
            <Text
              style={{
                color: '#454C53',
                fontSize: RFPercentage(2),
              }}>
              무료 Wi-Fi {'\n'}개별 바비큐 {'\n'}글램핑 {'\n'}주차가능 {'\n'}
              반려동물 {'\n'}이용시간 : 16시 -22시까지 사용가능 합니다.
            </Text>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: '#55C595',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 3,
            }}>
            <Text
              style={{
                color: '#55C595',
                fontSize: RFPercentage(2),
              }}>
              캠핑장 링크 이동
            </Text>
          </View>
          <View
            style={{
              marginTop: hp('3%'),
              borderTopWidth: 1,
              borderColor: '#9EA4AA',
              padding: 3,
            }}>
            <Text
              style={{
                marginVertical: hp('3%'),
                color: '#1B1D1F',
                fontSize: RFPercentage(2.5),
                fontWeight: 'bold',
              }}>
              이용안내
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#454C53',
                fontSize: RFPercentage(2),
                marginBottom: hp('3%')
              }}>
              공용 개수대, 공용 화장실, 공동 샤워실 이용 {'\n'}수건 미제공으로
              개인 준비 필요 {'\n'}개인화기, 개인화로, 개인그릴, 개인 냉난방기
              반입금지
            </Text>
          </View>
          <View>
            <Image source={require('../assets/images/martin.png')} />
          </View>
          <View
            style={{
              paddingTop:hp('1%'),
              paddingBottom: hp('1%'),
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={require('../assets/images/loc.png')} />
            <Text
              style={{
                color: '#9EA4AA',
                fontSize: RFPercentage(2),
                paddingLeft: wp('5%'),
                paddingRight: wp('5%'),
              }}>
              홍천군 서면 밤벌길 131-53
            </Text>
            <Image source={require('../assets/images/icon_location.png')} />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingBottom: hp('10%')},
});

export default Rent;
