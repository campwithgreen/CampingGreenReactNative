import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Header from '../layout/Header';
import HomeScreenDetail from '../components/HomeScreenDetail';
import {goBack, navigateTo} from '../navigation/utils/RootNavigation';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';

const HomeScreenDetailData = [
  {
    id: 1,
    heading: '추천 캠핑장',
    heading2: '주말에 가기 좋은\n도심탈출 여행!',
    heading3: '뷰 좋은 서울캠핑장 TOP5',
    heading4: '더 알아보기',
    image: require('../assets/images/home_screen_detail1.png'),
  },
  {
    id: 2,
    heading: '추천 캠핑장',
    heading2: '캠퍼만을 위한 \n이색 체험',
    heading3: '경기도에서 체험하는 사하라사막',
    heading4: '더 알아보기',
    image: require('../assets/images/home_screen_detail2.png'),
  },
];

const headerContent = {
  leftItemContents: {
    type: 'text',
    content: 'CAMPING GREEEN',
  },
  rightItemContents: {
    type: 'image',
    content: require('../assets/images/cart.png'),
    navigateScreen: 'LoginScreen',
  },
};

export const HomeScreen = props => {
  const {container} = styles;
  return (
    <View style={container}>
      <Header headerContent={headerContent} />
      <ScrollView>
        <View>
          <ImageBackground
            source={require('../assets/images/jorgen.jpg')}
            style={styles.backgroundImage}>
            <View>
              <Text
                style={{
                  paddingBottom: hp('2%'),
                  fontSize: RFPercentage(3.65),
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                나만 알고싶은{'\n'}힙한 캠핑장 지금 공개
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: RFPercentage(2.2),
                  fontWeight: '300',
                  color: 'white',
                }}>
                바퀴달린집 출연 캠핑장 최대 할인가로{'\n'}떠나보면 어때요?
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            margin: 25,
            padding: 25,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/images/image_tent.png')}
            style={{marginRight: hp('5%')}}
          />
          <View style={{paddingRight: hp('5%')}}>
            <View style={{paddingBottom: hp('.7%')}}>
              <Text
                style={{
                  color: '#1B1D1F',
                  fontSize: RFPercentage(2),
                  fontWeight: 'bold',
                }}>
                비싸고 무거운 캠핑장비,{'\n'}이제 사지말고 대여하세요
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#454C53',
                  fontSize: RFPercentage(1.6),
                  fontFamily: 'Pretendard',
                }}>
                용품대여 홈으로 이동
              </Text>
              <Image source={require('../assets/images/icon_movepage.png')} />
            </View>
          </View>
        </View>
        <View style={{paddingBottom: hp('1%')}}>
          {HomeScreenDetailData.map(item => {
            return (
              <HomeScreenDetail key={item.id} HomeScreenDetailData={item} />
            );
          })}
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            margin: 25,
            padding: 25,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <View style={{paddingRight: wp('20%')}}>
            <View style={{paddingBottom: hp('1%')}}>
              <Text
                style={{
                  color: '#55C595',
                  fontSize: RFPercentage(1.7),
                }}>
                캠핑장 제휴문의
              </Text>
            </View>
            <View style={{paddingBottom: hp('1%')}}>
              <Text
                style={{
                  color: '#454C53',
                  fontSize: RFPercentage(2.1),
                  fontFamily: 'Pretendard',
                }}>
                6개월동안 누리는 혜택,{'\n'}수수료 0원!
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#9EA4AA',
                  fontSize: RFPercentage(1.7),
                }}>
                지금 캠핑그린과 제휴하세요
              </Text>
            </View>
          </View>
          <Image source={require('../assets/images/image_tent.png')} />
        </View>
        <View
          style={{
            backgroundColor: '#55C595',
            margin: 25,
            marginTop: 5,
            padding: 25,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <View style={{paddingRight: wp('20%')}}>
            <Text
              style={{
                color: '#fff',
                fontSize: RFPercentage(2.1),
              }}>
              공간 차지하는 캠핑용품,{'\n'}빌려주고 수익얻기 :)
            </Text>
          </View>
          <Image source={require('../assets/images/image_tent.png')} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingBottom: hp('10%')},
  backgroundImage: {
    display: 'flex',
    height: hp('48%'),
    paddingLeft: wp('16%'),
    paddingTop: hp('10%'),
  },
});
