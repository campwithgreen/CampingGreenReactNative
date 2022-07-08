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
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Carousel from '../components/Carousel';
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

const imageInfo = [
  {
    img: require('../assets/images/tentinfo1.png'),
    imgtext: '1~2인용 비빅텐트',
  },
  {
    img: require('../assets/images/tentinfo2.png'),
    imgtext: '커피포트 버너',
  },
  {
    img: require('../assets/images/tentinfo3.png'),
    imgtext: '경량 테이블',
  },
];

export const ProductInfo = props => {
  const { container } = styles;
  const item = props.route.params;
  console.log('ITEM', item);

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
          <Carousel carouselData={item.carousel} paginationType="right" />
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
          <View style={{ paddingBottom: hp('3%'), marginHorizontal: wp('5%') }}>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(3),
                fontWeight: 'bold',
              }}>
              상품{'\n'}상세 정보
            </Text>
          </View>
          <ImageBackground
            source={require('../assets/images/tentinfo.png')}
            style={{ height: hp('28%') }}
          />
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: hp('3%'),
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
                {item?.detail1?.detail1Title || "코베마 텐트 상세정보"}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                marginTop: hp('3%'),
                padding: wp('2%'),
                width: wp('60%'),
              }}>
              {Object.keys(item?.specifications).map(key => {
                return (
                  <View
                    key={key}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: '#454C53',
                        fontSize: RFPercentage(2),
                        marginBottom: hp('.5%'),
                        width: wp('30%'),
                      }}>
                      {key}
                    </Text>
                    <Text
                      style={{
                        color: '#454C53',
                        fontSize: RFPercentage(2),
                        marginBottom: hp('.5%'),
                      }}>
                      {item?.specifications[key]}
                    </Text>
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
                  {item?.details2?.detail2Title || "코베마 텐트 상세정보"}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  marginTop: hp('3%'),
                  padding: wp('2%'),
                  width: wp('60%'),
                }}>
                {Object.keys(item?.specifications).map(key => {
                  return (
                    <View
                      key={key}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          color: '#454C53',
                          fontSize: RFPercentage(2),
                          marginBottom: hp('.5%'),
                          width: wp('30%'),
                        }}>
                        {item?.specifications[key]}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
          {imageInfo.map(item => {
            return (
              <View>
                <ImageBackground
                  source={item.img}
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
                  {item.imgtext}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={{ marginHorizontal: wp('5%') }}>
          <View style={{ paddingBottom: hp('3%') }}>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(3),
                fontWeight: 'bold',
              }}>
              예약 {'\n'}유의사항
            </Text>
          </View>
          <View style={{ paddingBottom: hp('7%') }}>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(2),
                fontWeight: 'bold',
                paddingBottom: hp('2%'),
              }}>
              취소/ 환불규정
            </Text>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(1.8),
              }}>
              예약한 용품 대여 취소는 택배발송 전까지 가능하며, 용품 발송 후에는
              주문취소가 불가능합니다. 용품 대여 취소는 마이페이지- 캠핑용품
              대여내역 조회에서 가능합니다. 기타문의 사항은 고객센터로
              문의바랍니다.
            </Text>
          </View>
          <View style={{ paddingBottom: hp('5%') }}>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(3),
                fontWeight: 'bold',
              }}>
              배송 {'\n'}안내사항
            </Text>
          </View>
          <View style={{ paddingBottom: hp('5%') }}>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(2),
                fontWeight: 'bold',
                paddingBottom: hp('2%'),
              }}>
              배송조회 안내
            </Text>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(1.8),
              }}>
              결제완료 후 배송까지 최소 2~3일이 소요될 수 있습니다.
              마이페이지-캠핑용품 대여내역조회에서 배송현황을 확인하실 수
              있습니다.
            </Text>
          </View>
          <View style={{ paddingBottom: hp('5%') }}>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(2),
                fontWeight: 'bold',
                paddingBottom: hp('2%'),
              }}>
              대여장비 반납방법
            </Text>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(1.8),
              }}>
              대여용품 반납은 캠핑그린에서 반납예약을 해드립니다. 대여종료일
              다음날, 배송받으셨던 주소로 택배기사님이 방문하여 수거합니다.
            </Text>
          </View>
          <View style={{ paddingBottom: hp('4%') }}>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(2),
                fontWeight: 'bold',
                paddingBottom: hp('2%'),
              }}>
              대여장비 반납시 유의사항
            </Text>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(1.8),
              }}>
              장비는 배송시 보내드린 박스에 용품을 넣으신 후 보내주세요. 장비
              반납의 책임은 전적으로 고객에게 있으며 주문하셨던 장비 중 누락된
              용품이 없는지 확인해주세요. 반납시 누락된 상품으로 다시 택배를
              이용할 경우 배송비를 추가로 부담하셔야합니다. 캠핑그린의
              캠핑용품은 다른 고객들도 함께 사용하는 대여품입니다. {'\n\n\n'}
              고품질의 서비스를 지속적으로 제공하기 위해서 깨끗이 사용하시고
              사용 후에도 반드시 청소해서 반납해주시길 바랍니다. {'\n\n\n'}
              <Text style={{ fontWeight: 'bold' }}>
                대여지와 배송지가 다를 경우, 택배사에 직접 전화하여 예약하시거나
                인터넷을 이용해주세요.
              </Text>
            </Text>
          </View>
        </View>
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
