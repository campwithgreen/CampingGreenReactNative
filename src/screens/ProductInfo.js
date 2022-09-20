import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
  Button,
  Platform,
} from 'react-native';
import Header from '../layout/Header';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Carousel from '../components/Carousel';
import FONTSIZE from '../constants/fontSize';
import COLOR from '../constants/colors';
import {navigateTo} from '../navigation/utils/RootNavigation';
import Footer from '../components/Footer';
import {connect, useDispatch} from 'react-redux';
import CustomButton from '../components/common/CustomButton';
import Counter from '../components/common/Counter';
import {createOrUpdateCart, getUserCartHistory} from '../apis/cart';
import {showDefaultErrorAlert} from '../global/global';
import {
  setCurrentCheckoutCartDetails,
  setReturnDate,
  setStartDate,
  setTotalDays,
} from '../redux/actions/common';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mapStateToProps = (state, ownProps) => {
  const selected_item = state?.common.selected_item;
  const startDate = state?.common.start_date;
  const returnDate = state?.common.return_date;
  const isLoggedIn = state?.oauth.isLogin;
  const quantity = state?.common.quantity;
  const totalDays = state?.common.totalDays;

  return {
    selected_item,
    startDate,
    returnDate,
    isLoggedIn,
    quantity,
    totalDays,
  };
};
const ProductInfo = props => {
  const {container} = styles;

  const {
    selected_item,
    startDate,
    returnDate,
    isLoggedIn,
    quantity,
    totalDays,
  } = props;

  const item = props.route.params || selected_item;
  const [tabIndex, setTabIndex] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  useEffect(() => {
    var start = moment(startDate);
    var end = moment(returnDate);
    var totalDays = end.diff(start, 'days') - 1;
    if (totalDays !== -1) {
      dispatch(setTotalDays(totalDays));
    }
  }, [startDate, returnDate]);

  today = mm + '월' + dd + '일';
  const headerContent = {
    leftItemContents: {
      type: 'text',
      content: 'CAMPING GREEN',
      navigateScreen: 'HomeScreenDetail1',
    },
    rightItemContents: {
      type: 'cart',
      content: require('../assets/images/cart.png'),
      navigateScreen: () => {
        if (!isLoggedIn) {
          ToastAndroid.showWithGravity(
            'Pls Login to View Cart',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        } else {
          navigateTo('ProductShoppingBagScreen');
        }
      },
    },
  };

  const enableCheckout = () => {
    if (startDate && returnDate) {
      return true;
    }
    return false;
  };

  const {centeredView, modalView, termTitle, termsButtonWrapper} = styles;

  const [payloadItems, setPayloadItems] = useState([]);

  const getCartId = async () => {
    try {
      const cartId = await AsyncStorage.getItem('@cart_id');
      return cartId != null ? cartId : null;
    } catch (e) {
      console.log('getting cart error', e);
    }
    console.log('Done.');
  };

  const storeCartId = async value => {
    console.log('VALUE CARTID', value);
    try {
      await AsyncStorage.setItem('@cart_id', value);
    } catch (e) {
      console.log('STORING CART ID ERROR', e);
    }
  };

  const removeCartId = async value => {
    console.log('REMOVING CART ID');
    try {
      await AsyncStorage.removeItem('@cart_id');
    } catch (e) {
      console.log('STORING CART ID ERROR', e);
    }
  };

  useEffect(() => {
    (async function getCartPayload() {
      await getCartId().then(async cartId => {
        if (cartId) {
          await getUserCartHistory(cartId, false).then(res => {
            if (res) {
              setPayloadItems([
                ...res?.data?.data?.items,
                {
                  itemId: selected_item._id,
                  units: quantity || 1,
                  startDate: startDate,
                  endDate: returnDate,
                },
              ]);
            }
          });
        } else
          setPayloadItems([
            {
              itemId: selected_item._id,
              units: quantity || 1,
              startDate: startDate,
              endDate: returnDate,
            },
          ]);
      });
    })();
  }, [selected_item, quantity, startDate, returnDate]);

  let cartItems = {
    items: payloadItems,
  };

  const handleCheckout = async () => {
    console.log('CHCKOUT ITEMS *****', cartItems);
    getCartId().then(async cartId => {
      if (cartId) {
        await createOrUpdateCart(cartItems, {cartId: cartId})
          .then(res => {
            console.log('RESPONSE CART', res);
            if (res) {
              dispatch(setCurrentCheckoutCartDetails(res.data.data));
              ToastAndroid.showWithGravity(
                'Checkout In Progress',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
              );
              navigateTo('RoomPaymentScreen');
              setModalVisible(false);
            }
          })
          .catch(err => {
            if (err) {
              showDefaultErrorAlert(err?.response?.data?.error);
              setModalVisible(false);
            }
          });
      } else {
        await createOrUpdateCart(cartItems)
          .then(res => {
            console.log('RESPONSE CART', res);
            if (res) {
              dispatch(setCurrentCheckoutCartDetails(res.data.data));
              ToastAndroid.showWithGravity(
                'Checkout In Progress',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
              );
              navigateTo('RoomPaymentScreen');
              setModalVisible(false);
            }
          })
          .catch(err => {
            if (err) {
              console.log('CHECKING OUT ERR', err);
              showDefaultErrorAlert(err?.response?.data?.error);
              setModalVisible(false);
            }
          });
      }
    });
  };

  const handleAddToCart = async () => {
    getCartId().then(async cartId => {
      console.log('THE CART ID =>', cartId);
      if (cartId) {
        await createOrUpdateCart(cartItems, {cartId: cartId})
          .then(res => {
            console.log('RESPONSE CART', res);
            storeCartId(res.data.data?._id);
            if (res) {
              ToastAndroid.showWithGravity(
                'Product added to cart',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
              );
              navigateTo('ProductShoppingBagScreen');
              setModalVisible(false);
            }
          })
          .catch(err => {
            if (err) {
              console.log('ERROR', err);
              showDefaultErrorAlert();
              setModalVisible(false);
            }
          });
      } else {
        await createOrUpdateCart(cartItems)
          .then(res => {
            console.log('RESPONSE CART', res);
            storeCartId(res.data.data?._id);
            if (res) {
              ToastAndroid.showWithGravity(
                'Product added to cart',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
              );
              navigateTo('ProductShoppingBagScreen');
              setModalVisible(false);
            }
          })
          .catch(err => {
            if (err) {
              console.log('ERROR', err);
              showDefaultErrorAlert();
              setModalVisible(false);
            }
          });
      }
    });
  };
  return (
    <View style={[container]}>
      {modalVisible && (
        <View style={centeredView}>
          <View style={modalView}>
            <View>
              <Text style={termTitle}>총 상품금액</Text>
              <View style={termsButtonWrapper}>
                <View>
                  <Text style={termTitle}>
                    {quantity
                      ? item.price * quantity * totalDays
                      : totalDays
                      ? totalDays * item.price
                      : item.price}
                    원
                  </Text>
                </View>
                <View>
                  <Counter />
                </View>
              </View>
              <Text
                style={{
                  color: COLOR.white,
                  marginVertical: 15,

                  fontSize: FONTSIZE.xll,
                }}>
                무료배송
              </Text>
              <View style={termsButtonWrapper}>
                <View
                  style={{
                    width: '47%',
                    borderRadius: 7,
                    borderWidth: 1,
                  }}>
                  <Button
                    title="장바구니 담기"
                    onPress={() => {
                      handleAddToCart();
                    }}
                    color={COLOR.grey}
                  />
                </View>
                <View
                  style={{
                    width: '47%',
                    borderRadius: 7,
                    borderWidth: 1,
                    backgroundColor: COLOR.compGreen,
                    borderColor: COLOR.compGreen,
                  }}>
                  <Button
                    title="바로 대여하기"
                    onPress={() => {
                      handleCheckout();
                    }}
                    color={Platform.OS === 'android' ? COLOR.compGreen : '#fff'}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
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
            backgroundColor: COLOR.white,
          }}>
          <View>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(2.5),
                fontWeight: 'bold',
              }}>
              {item.title}
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
              {item.price}원
            </Text>
          </View>
          <View
            style={{
              marginTop: wp('5%'),
              padding: wp('4%'),
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: COLOR.white,
              elevation: 7,
              borderRadius: 7,
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
                <TouchableOpacity
                  onPress={() => {
                    if (isLoggedIn) {
                      navigateTo('CalendarScreen');
                    } else {
                      ToastAndroid.showWithGravity(
                        'You have to Login to Proceed with Renting Date',
                        ToastAndroid.LONG,
                        ToastAndroid.TOP,
                      );
                    }
                  }}>
                  <Text
                    style={{
                      color: '#55C595',
                      fontSize: RFPercentage(2.5),
                      marginTop: wp('.5%'),
                      fontWeight: 'bold',
                    }}>
                    {startDate || today}
                  </Text>
                </TouchableOpacity>
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
                <TouchableOpacity
                  onPress={() => {
                    if (isLoggedIn) {
                      navigateTo('CalendarScreen');
                    } else {
                      ToastAndroid.showWithGravity(
                        'You have to Login to Proceed with Renting Date',
                        ToastAndroid.LONG,
                        ToastAndroid.TOP,
                      );
                    }
                  }}>
                  <Text
                    style={{
                      color: '#55C595',
                      fontSize: RFPercentage(2.5),
                      marginTop: wp('.5%'),
                      fontWeight: 'bold',
                    }}>
                    {returnDate || today}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop: heightPercentageToDP('5%')}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setTabIndex(1);
              }}>
              <View
                style={[
                  {
                    width: widthPercentageToDP('50%'),
                    height: heightPercentageToDP('10%'),
                    backgroundColor: 'white',
                    paddingHorizontal: widthPercentageToDP('3%'),
                    borderBottomColor:
                      tabIndex === 1 ? COLOR.compGreen : COLOR.lgrey,
                    borderBottomWidth: 4,
                  },
                ]}>
                <Text
                  style={{
                    fontSize: FONTSIZE.xl,

                    fontWeight: '900',
                    padding: hp('2%'),
                    color: tabIndex === 1 ? COLOR.compGreen : COLOR.lgrey,
                  }}>
                  상품정보
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTabIndex(2);
              }}>
              <View
                style={[
                  {
                    width: widthPercentageToDP('50%'),
                    height: heightPercentageToDP('10%'),
                    backgroundColor: 'white',
                    paddingHorizontal: widthPercentageToDP('3%'),
                    padding: hp('2%'),
                    borderBottomColor:
                      tabIndex === 2 ? COLOR.compGreen : COLOR.lgrey,
                    borderBottomWidth: 4,
                  },
                ]}>
                <Text
                  style={{
                    fontSize: FONTSIZE.xl,
                    fontWeight: '900',
                    color: tabIndex === 2 ? COLOR.compGreen : COLOR.lgrey,
                  }}>
                  배송/환볼
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {tabIndex === 1 && (
          <View style={{backgroundColor: '#ffff', marginTop: hp('2%')}}>
            <View style={{paddingBottom: hp('3%'), marginHorizontal: wp('5%')}}>
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
              source={{uri: item.carousel[1] || item.carousel[0]}}
              style={{height: hp('35%')}}
              resizeMode="contain"
            />
            {item.specifications != undefined && (
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
                    // width: wp('60%'),
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: RFPercentage(2),
                      fontWeight: 'bold',
                    }}>
                    {item.title} 상세정보
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    marginTop: hp('3%'),
                    padding: wp('2%'),
                    justifyContent: 'center',

                    // width: wp('60%'),
                  }}>
                  {item.specifications != undefined &&
                    Object?.keys(item?.specifications)?.map(key => {
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
                              width: wp('20%'),
                            }}>
                            {key}
                          </Text>
                          {item?.specifications[key]?.split(',').length > 0 ? (
                            <View
                              style={{
                                flexDirection: 'column',
                              }}>
                              {item?.specifications[key]?.split(',')?.map(k => (
                                <Text
                                  style={{
                                    color: '#454C53',
                                    fontSize: RFPercentage(2),
                                    marginBottom: hp('.5%'),
                                  }}>
                                  {k}
                                </Text>
                              ))}
                            </View>
                          ) : (
                            <Text
                              style={{
                                color: '#454C53',
                                fontSize: RFPercentage(2),
                                marginBottom: hp('.5%'),
                              }}>
                              {item?.specifications[key]}
                            </Text>
                          )}
                        </View>
                      );
                    })}
                </View>
              </View>
            )}

            <View style={{marginHorizontal: wp('5%')}}>
              <View style={{paddingTop: hp('10%')}}>
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
                    // width: wp('60%'),
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: RFPercentage(2),
                      fontWeight: 'bold',
                    }}>
                    {item.title} 구성
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    marginTop: hp('3%'),
                    padding: wp('2%'),
                    width: wp('60%'),
                  }}>
                  {item.allFeatures &&
                    item.allFeatures.map((feature, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              color: '#454C53',
                              fontSize: RFPercentage(2),
                              marginBottom: hp('.5%'),
                              // width: wp('30%'),
                            }}>
                            {feature?.featureName}
                          </Text>
                        </View>
                      );
                    })}
                </View>
              </View>
            </View>
            {item?.allFeatures.map((feature, index) => {
              return (
                <View
                  key={index}
                  style={{
                    paddingVertical: hp('2.5%'),
                  }}>
                  {feature?.image && (
                    <ImageBackground
                      source={{uri: feature?.image}}
                      style={{
                        height: hp('38%'),
                        width: wp('100%'),
                      }}
                    />
                  )}

                  {feature?.description && (
                    <Text
                      style={{
                        color: '#1B1D1F',
                        fontSize: RFPercentage(2),
                        fontWeight: '800',
                        marginHorizontal: wp('5%'),
                        marginVertical: hp('2%'),
                      }}>
                      {feature?.description}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        )}
        {tabIndex === 2 && (
          <View style={{backgroundColor: '#ffff', marginTop: hp('2%')}}>
            <View style={{marginHorizontal: wp('5%')}}>
              <View style={{paddingBottom: hp('3%')}}>
                <Text
                  style={{
                    color: '#1B1D1F',
                    fontSize: RFPercentage(3),
                    fontWeight: 'bold',
                  }}>
                  예약 {'\n'}유의사항
                </Text>
              </View>
              <View style={{paddingBottom: hp('7%')}}>
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
                  예약한 용품 대여 취소는 택배발송 전까지 가능하며, 용품 발송
                  후에는 주문취소가 불가능합니다. 용품 대여 취소는 마이페이지-
                  캠핑용품 대여내역 조회에서 가능합니다. 기타문의 사항은
                  고객센터로 문의바랍니다.
                </Text>
              </View>
              <View style={{paddingBottom: hp('5%')}}>
                <Text
                  style={{
                    color: '#1B1D1F',
                    fontSize: RFPercentage(3),
                    fontWeight: 'bold',
                  }}>
                  배송 {'\n'}안내사항
                </Text>
              </View>
              <View style={{paddingBottom: hp('5%')}}>
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
              <View style={{paddingBottom: hp('5%')}}>
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
              <View style={{paddingBottom: hp('4%')}}>
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
                  장비는 배송시 보내드린 박스에 용품을 넣으신 후 보내주세요.
                  장비 반납의 책임은 전적으로 고객에게 있으며 주문하셨던 장비 중
                  누락된 용품이 없는지 확인해주세요. 반납시 누락된 상품으로 다시
                  택배를 이용할 경우 배송비를 추가로 부담하셔야합니다.
                  캠핑그린의 캠핑용품은 다른 고객들도 함께 사용하는
                  대여품입니다. {'\n\n\n'}
                  고품질의 서비스를 지속적으로 제공하기 위해서 깨끗이 사용하시고
                  사용 후에도 반드시 청소해서 반납해주시길 바랍니다. {'\n\n\n'}
                  <Text style={{fontWeight: 'bold'}}>
                    대여지와 배송지가 다를 경우, 택배사에 직접 전화하여
                    예약하시거나 인터넷을 이용해주세요.
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        )}
        <View>
          <Footer />
        </View>
      </ScrollView>
      {!modalVisible && (
        <View>
          <CustomButton
            buttonText={'대여하기'}
            buttonHandler={() => {
              if (isLoggedIn) {
                if (enableCheckout()) {
                  setModalVisible(true);
                } else {
                  ToastAndroid.showWithGravity(
                    'Please Select the Date for Checkout',
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                  );
                }
              } else {
                ToastAndroid.showWithGravity(
                  'You have to Login to Proceed Renting',
                  ToastAndroid.LONG,
                  ToastAndroid.TOP,
                );
                navigateTo('LoginScreen');
              }
            }}
          />
        </View>
      )}
    </View>
  );
};

export default connect(mapStateToProps, null)(ProductInfo);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    flex: 1,
  },
  centeredView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 15,
    elevation: 50,
  },
  modalView: {
    minHeight: hp('30%'),
    backgroundColor: COLOR.black,
    borderTopLeftRadius: 30,
    padding: hp('4%'),
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 100,
  },
  termTitle: {
    color: COLOR.white,
    fontWeight: 'bold',
    fontSize: FONTSIZE.xll,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  termsButtonWrapper: {
    marginVertical: hp('2%'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
