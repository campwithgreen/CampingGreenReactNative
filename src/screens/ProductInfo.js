import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
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
import { Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

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

export const ProductInfo = props => {
  const { container } = styles;
  const dispatch = useDispatch();
  const item = props.route.params;
  console.log('HELLORitik', item);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: '상품정보' },
    { key: 'second', title: '배송/환불' },
  ]);

  return (
    <View style={container}>
      <Header headerContent={headerContent} />
      <ScrollView>
        <View>
          <Carousel paginationType="right" />
        </View>
        <View
          style={{
            marginHorizontal: wp('5%'),
            marginTop: wp('5%'),
            display: 'flex',
            justifyContent: 'flex-start',
          }}>
          <View>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(2.5),
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
          </View>
          <View
            style={{
              marginTop: wp('1.5%'),
            }}>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(3),
                fontWeight: 'bold',
              }}>
              {item.price}
            </Text>
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
                <Text style={{ color: '#454C53', fontSize: RFPercentage(2) }}>
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
                <Text style={{ color: '#454C53', fontSize: RFPercentage(2) }}>
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
          <View>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
              style={styles.container}
            />
          </View>
          <View>
            <View style={{ paddingBottom: hp('3%') }}>
              <Text
                style={{
                  color: '#1B1D1F',
                  fontSize: RFPercentage(3),
                  fontWeight: 'bold',
                }}>
                상품{'\n'}상세 정보
              </Text>
            </View>
          </View>
        </View>
        <ImageBackground
          source={require('../assets/images/tentinfo.png')}
          style={{ height: hp('28%') }}
        />
        <View
          style={{ display: 'flex', alignItems: 'center', paddingTop: hp('3%') }}>
          <View
            style={{
              backgroundColor: '#26282B',
              padding: wp('1.5%'),
              width: wp('60%'),
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: RFPercentage(2.5),
                fontWeight: 'bold',
              }}>
              {item?.detail1?.detail1Title}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'black',
              marginTop: hp('3%'),
              padding: wp('1.5%'),
              width: wp('60%'),
              height: hp('30%'),
            }}>
            {Object.keys(item?.detail1?.detail1Value).map(key => {
              return (
                <View
                  key={key}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{key}</Text>
                  <Text>{item?.detail1?.detail1Value[key]}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={{ marginHorizontal: wp('5%') }}>
          <View style={{ paddingTop: hp('10%') }}>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(3),
                fontWeight: 'bold',
              }}>
              상품 {'\n'}상세 구성
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: hp('3%'),
              paddingBottom: hp('5%'),
            }}>
            <View
              style={{
                backgroundColor: '#26282B',
                padding: wp('1.5%'),
                width: wp('60%'),
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: RFPercentage(2.5),
                  fontWeight: 'bold',
                }}>
                2인 캠핑 패키지
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'black',
                marginTop: hp('3%'),
                padding: wp('1.5%'),
                width: wp('60%'),
                height: hp('25%'),
              }}>
              <Text>Details</Text>
            </View>
          </View>
        </View>
        <ImageBackground
          source={require('../assets/images/tentinfo1.png')}
          style={{ height: hp('28%') }}
        />
        <Text
          style={{
            color: '#1B1D1F',
            fontSize: RFPercentage(2.5),
            fontWeight: 'bold',
            marginHorizontal: wp('5%'),
            marginVertical: hp('2.5%'),
          }}>
          1~2인용 비빅텐트
        </Text>
        <ImageBackground
          source={require('../assets/images/tentinfo2.png')}
          style={{ height: hp('28%') }}
        />
        <Text
          style={{
            color: '#1B1D1F',
            fontSize: RFPercentage(2.5),
            fontWeight: 'bold',
            marginHorizontal: wp('5%'),
            marginVertical: hp('2.5%'),
          }}>
          1~2인용 비빅텐트
        </Text>
        <ImageBackground
          source={require('../assets/images/tentinfo3.png')}
          style={{ height: hp('28%') }}
        />
        <Text
          style={{
            color: '#1B1D1F',
            fontSize: RFPercentage(2.5),
            fontWeight: 'bold',
            marginHorizontal: wp('5%'),
            marginVertical: hp('2.5%'),
          }}>
          1~2인용 비빅텐트
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: hp('10%'),
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
});
