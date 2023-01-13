import {View, Text, ScrollView, StyleSheet, Button} from 'react-native';
import Toast from 'react-native-simple-toast';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import React, {useState, useEffect} from 'react';
import Header from '../layout/Header';
import Carousel from '../components/Carousel';
import SecondScreen1 from '../components/SecondScreen1';
import SecondScreen2 from '../components/SecondScreen2';
import Footer from '../components/Footer';
import CustomButton from '../components/common/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import COLOR from '../constants/colors';
import FONTSIZE from '../constants/fontSize';
import {createOrUpdateCart, getUserCartHistory} from '../apis/cart';
import {setCurrentCheckoutCartDetails} from '../redux/actions/common';
import {showDefaultErrorAlert} from '../global/global';
import {navigateTo, goBack} from '../navigation/utils/RootNavigation';
import Counter from '../components/common/Counter';
import AsyncStorage from '@react-native-async-storage/async-storage';

//객실 정보 스크린 camping room detail screen
const SecondScreen = () => {
  const {container, centeredView, modalView, termTitle, termsButtonWrapper} =
    styles;
  const selected_subLocation = useSelector(
    st => st.common?.selected_sub_location,
  );

  const dispatch = useDispatch();

  const subLocations = useSelector(st => st.common.selected_location);
  const startDate = useSelector(st => st.common?.start_date);
  const returnDate = useSelector(st => st.common?.return_date);
  const isLoggedIn = useSelector(st => st.oauth?.isLogin);
  const quantity = useSelector(st => st.common?.quantity);

  const [modalVisible, setModalVisible] = useState(false);
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
        console.log('CART ID ___________________', cartId);
        if (cartId) {
          await getUserCartHistory(cartId, false).then(res => {
            if (res) {
              setPayloadItems([
                ...res?.data?.data?.items,
                {
                  itemId: selected_subLocation?._id,
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
              itemId: selected_subLocation?._id,
              units: quantity || 1,
              startDate: startDate,
              endDate: returnDate,
            },
          ]);
      });
    })();
  }, [selected_subLocation, quantity, startDate, returnDate]);

  const headerContent = {
    leftItemContents: {
      type: 'image',
      content: require('../assets/images/icon_cancel.png'),
      navigateScreen: () => {
        goBack();
      },
    },
    middleItemContents: {
      type: 'text',
      content: '객실 정보',
    },
    rightItemContents: {
      type: 'cart',
      content: require('../assets/images/cart.png'),
      navigateScreen: () => {
        if (!isLoggedIn) {
          Toast.showWithGravity(
            'Pls Login to View Cart',
            Toast.LONG,
            Toast.TOP,
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

  let cartItems = {
    items: payloadItems,
  };

  const handleCheckout = async () => {
    console.log('CHCKOUT ITEMS *****', cartItems);
    getCartId().then(async cartId => {
      if (cartId) {
        await createOrUpdateCart(cartItems, {cartId: cartId})
          .then(res => {
            // console.log('RESPONSE CART', res);
            if (res) {
              dispatch(setCurrentCheckoutCartDetails(res.data.data));
              Toast.showWithGravity(
                'Checkout In Progress',
                Toast.SHORT,
                Toast.TOP,
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
            // console.log('RESPONSE CART', res);
            if (res) {
              dispatch(setCurrentCheckoutCartDetails(res.data.data));
              Toast.showWithGravity(
                'Checkout In Progress',
                Toast.SHORT,
                Toast.TOP,
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
      }
    });
  };

  const handleAddToCart = async () => {
    getCartId().then(async cartId => {
      console.log('THE CART ID =>', cartId);
      if (cartId) {
        await createOrUpdateCart(cartItems, {cartId: cartId})
          .then(res => {
            // console.log('RESPONSE CART', res);
            storeCartId(res.data.data?._id);
            if (res) {
              Toast.showWithGravity(
                'Product added to cart',
                Toast.SHORT,
                Toast.TOP,
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
            // console.log('RESPONSE CART', res);
            storeCartId(res.data.data?._id);
            if (res) {
              Toast.showWithGravity(
                'Product added to cart',
                Toast.SHORT,
                Toast.TOP,
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
    <View style={container}>
      {modalVisible && (
        <View style={centeredView}>
          <View style={modalView}>
            <View>
              <Text style={termTitle}>총 상품금액</Text>
              <View style={termsButtonWrapper}>
                <View>
                  <Text style={termTitle}>
                    {quantity
                      ? selected_subLocation.price * quantity
                      : selected_subLocation.price}
                  </Text>
                </View>
                <View>
                  <Counter />
                </View>
              </View>
              <View style={termsButtonWrapper}>
                <View style={{width: '47%'}}>
                  <Button
                    title="장바구니 담기"
                    onPress={() => {
                      handleAddToCart();
                    }}
                    color={COLOR.grey}
                  />
                </View>
                <View style={{width: '47%'}}>
                  <Button
                    title="바로 대여하기"
                    onPress={() => {
                      handleCheckout();
                    }}
                    color={COLOR.compGreen}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      <Header headerContent={headerContent} />
      <ScrollView style={{marginBottom: hp('7%')}}>
        <Carousel carouselData={selected_subLocation?.carousel} />
        <Text
          style={[
            styles.text1,
            {
              fontSize: RFPercentage(3),
              paddingTop: hp('5%'),
              paddingBottom: hp('2%'),
              paddingHorizontal: wp('5%'),
            },
          ]}>
          {selected_subLocation?.title}
        </Text>
        <Text style={[styles.text2, {paddingHorizontal: wp('5%')}]}>
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
        {selected_subLocation?.specifications &&
          Object.keys(selected_subLocation?.specifications)?.map(
            (spec, index) => {
              return (
                <>
                  <SecondScreen1
                    t1={spec}
                    t2={selected_subLocation?.specifications[spec]}
                  />
                  {index === 1 || index === 4 ? (
                    <View style={styles.border2}></View>
                  ) : null}
                </>
              );
            },
          )}

        <View style={styles.border1}></View>
        <Text
          style={[
            styles.text1,
            {
              paddingBottom: hp('2%'),
              paddingHorizontal: wp('5%'),
            },
          ]}>
          추가 옵션
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            paddingHorizontal: wp('5%'),
            justifyContent: 'space-between',
          }}>
          {selected_subLocation.additional_charges.map((allFeature, i) => {
            return (
              <>
                <View
                  style={{
                    flex: 1,
                    width: '100%',

                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#000',
                    }}>
                    {allFeature.add_feature_title}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                    }}>
                    {Object.keys(allFeature?.add_feature_value)?.map(
                      (spec, index) => {
                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                            }}>
                            <Text style={styles.text2}>{spec}</Text>
                            <Text> </Text>
                            <Text style={[styles.text2, {textAlign: 'right'}]}>
                              {allFeature?.add_feature_value[spec]}
                            </Text>

                            {/* {index === 1 || index === 2 ? <Text></Text> : null} */}
                          </View>
                        );
                      },
                    )}
                  </View>

                  {/* <View style={styles.view1}>
                <Text style={styles.text2}>바비큐 추가</Text>
                <Text></Text>
                <Text
                  style={[styles.text2, {textAlign: 'right', lineHeight: 24}]}>
                  숯불 포함 15,000{'\n'}숯불 미포함 10,000
                </Text>
              </View> */}
                </View>
                <View style={styles.border2}></View>
              </>
            );
          })}
        </View>
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

        <Text style={[styles.text2, {paddingHorizontal: wp('5%')}]}>
          추가 옵션으로 발생하는 요금은 현장에서 결제해주세요
        </Text>
        <View style={styles.border1}></View>
        <Text
          style={[
            styles.text1,
            {paddingHorizontal: wp('5%'), paddingBottom: hp('3%')},
          ]}>
          환불 금액
        </Text>
        <View style={{paddingBottom: hp('18%')}}>
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
            <Text
              style={{width: wp('30%'), textAlign: 'center', color: '#1B1D1F'}}>
              최소기준
            </Text>
            <Text
              style={{width: wp('30%'), textAlign: 'center', color: '#1B1D1F'}}>
              취소수수료
            </Text>
            <Text
              style={{width: wp('30%'), textAlign: 'center', color: '#1B1D1F'}}>
              환불없음
            </Text>
          </View>
          <SecondScreen2 t1="이용일 당일" t2="100%" t3="환불없음" />
          <SecondScreen2 t1="이용일 1일 전" t2="100%" t3="환불없음" />
          <SecondScreen2 t1="이용일 2일 전" t2="90%" t3="10%환불" />
          <SecondScreen2 t1="이용일 3일 전" t2="80%" t3="20%환불" />
          <SecondScreen2 t1="이용일 4일 전" t2="60%" t3="40%환불" />
          <SecondScreen2 t1="이용일 5일 전" t2="40%" t3="60%환불" />
          <SecondScreen2 t1="이용일 6일 전" t2="40%" t3="60%환불" />
          <SecondScreen2 t1="이용일 7일 전" t2="0%" t3="100%환불" />
        </View>
        <Footer />
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
                  Toast.showWithGravity(
                    'Please Select the Date for Checkout',
                    Toast.LONG,
                    Toast.TOP,
                  );
                }
              } else {
                Toast.showWithGravity(
                  'You have to Login to Proceed Renting',
                  Toast.LONG,
                  Toast.TOP,
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

export default SecondScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    flex: 1,
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
    color: '#000',
  },
  text2: {fontWeight: '600', color: '#454C53'},
  border1: {borderWidth: 4, borderColor: 'lightgrey', marginVertical: hp('5%')},
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
