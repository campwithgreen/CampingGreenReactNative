import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import HomeScreenDetail1List from '../components/HomeScreenDetail1List';
import Header from '../layout/Header';
import { goBack } from '../navigation/utils/RootNavigation';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize'

const HomeScreenDetail1Data = [
  {
    id: 1,
    heading: '01 홍천 보리울 캠핑장',
    image: require('../assets/images/homeScreenDetail1Page.png'),
    content:
      '우선 UX writer가 카피라이터와 비슷한지 의문을 갖는 분들도 있을 것 같습니다. 카피라이터의 주요 목표는 제품, 서비스, 도구 및 창의적인 물건 등 무언가를 판매하는 텍스트를 만드는 것입니다.',
    location: '홍천군 서면 밤벌길 131-53',
    number: '010-1234-5678',
  },
  {
    id: 2,
    heading: '02 홍천 보리울 캠핑장',
    image: require('../assets/images/martin.png'),
    content:
      '우선 UX writer가 카피라이터와 비슷한지 의문을 갖는 분들도 있을 것 같습니다. 카피라이터의 주요 목표는 제품, 서비스, 도구 및 창의적인 물건 등 무언가를 판매하는 텍스트를 만드는 것입니다.',
    location: '홍천군 서면 밤벌길 131-53',
    number: '010-1234-5678',
  },
  {
    id: 3,
    heading: '03 홍천 보리울 캠핑장',
    image: require('../assets/images/martin.png'),
    content:
      '우선 UX writer가 카피라이터와 비슷한지 의문을 갖는 분들도 있을 것 같습니다. 카피라이터의 주요 목표는 제품, 서비스, 도구 및 창의적인 물건 등 무언가를 판매하는 텍스트를 만드는 것입니다.',
    location: '홍천군 서면 밤벌길 131-53',
    number: '010-1234-5678',
  },
];

export const HomeScreenDetail1 = props => {
  const { container } = styles;
  return (
    <View style={container}>
      <Header />
      <ScrollView>
        <View>
          <ImageBackground
            source={require('../assets/images/homeScreenDetail1Page.png')}
            style={styles.backgroundImage}>
            <View>
              <Text
                style={{
                  paddingBottom: hp('2%'),
                  fontSize: RFPercentage(2.7),
                  fontWeight: 'bold',
                  color: "#ffff"
                }}>
                주말에 가기 좋은{'\n'}도심탈출 여행!
              </Text>
            </View>
            <View>
              <Text style={{
                fontSize: 14, fontWeight: '300', color: "#ffff"
              }}>
                서울근교 서울캠핑장 뷰TOP5
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            paddingTop: 31,
            paddingLeft: 20,
            paddingRight: 27,
            paddingBottom: 48,
          }}>
          <Text style={{ color: '#454C53', fontSize: 14 }}>
            우선 UX writer가 카피라이터와 비슷한지 의문을 갖는 분들도 있을 것
            같습니다. 카피라이터의 주요 목표는 제품, 서비스, 도구 및 창의적인
            물건 등 무언가를 판매하는 텍스트를 만드는 것입니다. UX writer의
            작업은 사용자가 인터페이스와의 의사소통을 지원하고 향상시키 텍스트를
            만드는 것입니다.
          </Text>
        </View>
        <View>
          {HomeScreenDetail1Data.map(item => {
            return (
              <HomeScreenDetail1List
                key={item.id}
                HomeScreenDetail1Data={item}
              />
            );
          })}
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              color: '#55C595',
              paddingLeft: 20,
              fontFamily: 'PP Monument Extended',
              marginVertical: hp("10%")
            }}>
            by.{'\n'}Camping Green
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'black',
    flex: 1,
    backgroundColor: "#ffff"
  },
  backgroundImage: {
    display: 'flex',
    height: 342,
    paddingLeft: 76,
    paddingTop: 111,
  },
});
