import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../layout/Header';
import HomeScreenDetail from '../components/HomeScreenDetail';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Carousel from '../components/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/oauth';
import { navigateTo } from '../navigation/utils/RootNavigation';

const HomeScreenDetailData = [
  {
    id: 10,
    heading: '추천 캠핑장',
    heading2: '주말에 가기 좋은\n도심탈출 여행!',
    heading3: '뷰 좋은 서울캠핑장 TOP5',
    heading4: '더 알아보기',
    image: require('../assets/images/home_screen_detail1.png'),
  },
  {
    id: 20,
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
    navigateScreen: 'LoginScreen',
  },
  rightItemContents: {
    type: 'image',
    content: require('../assets/images/cart.png'),
    navigateScreen: 'RegisterScreen',
  },
};

export const HomeScreen = props => {
  const { container } = styles;
  const dispatch = useDispatch();

  return (
    <View style={container}>
      <Header headerContent={headerContent} />
      <ScrollView>
        <View>
          <Carousel carouselData={[
            "https://picsum.photos/200/300?grayscale",
            "https://picsum.photos/seed/picsum/200/300"
          ]} paginationType="center" />
        </View>
        <View
          style={{
            marginHorizontal: wp('5%'),
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              marginVertical: hp('2.5%'),
              padding: wp('5%'),
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(login());
              }}>
              <Image
                source={require('../assets/images/image_tent.png')}
                style={{ marginRight: hp('5%') }}
              />
            </TouchableOpacity>
            <View style={{ paddingRight: hp('5%') }}>
              <View style={{ paddingBottom: hp('.7%') }}>
                <Text
                  style={{
                    color: '#1B1D1F',
                    fontSize: RFPercentage(2.1),
                    fontWeight: 'bold',
                  }}>
                  비싸고 무거운 캠핑장비,{'\n'}이제 사지말고 대여하세요
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    color: '#454C53',
                    fontSize: RFPercentage(1.8),
                    fontFamily: 'Pretendard',
                  }}>
                  용품대여 홈으로 이동
                </Text>
                <Image source={require('../assets/images/icon_movepage.png')} />
              </View>
            </View>
          </View>
          {HomeScreenDetailData.map(item => {
            return (
              <HomeScreenDetail key={item.id} HomeScreenDetailData={item} />
            );
          })}
          <View
            style={{
              backgroundColor: '#fff',
              marginVertical: hp('2.5%'),
              padding: wp('5%'),
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <View style={{ paddingRight: wp('20%') }}>
              <View style={{ paddingBottom: hp('1%') }}>
                <Text
                  style={{
                    color: '#55C595',
                    fontSize: RFPercentage(1.7),
                  }}>
                  캠핑장 제휴문의
                </Text>
              </View>
              <View style={{ paddingBottom: hp('1%') }}>
                <Text
                  style={{
                    color: '#454C53',
                    fontSize: RFPercentage(2.1),
                    fontFamily: 'Pretendard',
                    fontWeight: 'bold',
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
            <TouchableOpacity
              onPress={() => {
                navigateTo('Rent');
              }}>
              <Image source={require('../assets/images/image_tent.png')} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: '#55C595',
              marginVertical: hp('2.5%'),
              padding: wp('5%'),
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <View style={{ paddingRight: wp('20%') }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: RFPercentage(2.1),
                }}>
                공간 차지하는 캠핑용품,{'\n'}빌려주고 수익얻기 :)
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigateTo('Product', { id: 10 });
              }}>
              <Image source={require('../assets/images/image_tent.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: hp('10%') },
});
