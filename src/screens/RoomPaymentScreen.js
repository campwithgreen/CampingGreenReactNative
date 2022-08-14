import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MyScreen1 from '../components/MyScreen1';
import Header from '../layout/Header';
import Footer from '../components/Footer';
import COLOR from '../constants/colors';
import CustomButton from '../components/common/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {checkoutCart} from '../apis/cart';
import {showDefaultErrorAlert} from '../global/global';
import {navigateTo, goBack} from '../navigation/utils/RootNavigation';
import FONTSIZE from '../constants/fontSize';
import globalStyle from '../global/globalStyle';
import {setCurrentCheckoutCartDetails} from '../redux/actions/common';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Input = ({
  t1,
  t2,
  onChangeText,
  keyboardType,
  defaultValue,
  maxLength,
}) => {
  return (
    <View style={styles.view2}>
      <Text
        style={{
          fontSize: RFPercentage(2.1),
          color: '#454C53',
          fontWeight: '600',
        }}>
        {t1}
      </Text>
      <TextInput
        style={[
          styles.textinput1,
          {paddingLeft: wp('3%'), fontWeight: 'bold', color: '#1B1D1F'},
        ]}
        placeholder={t2}
        placeholderTextColor="gray"
        maxLength={maxLength}
        keyboardType={keyboardType}
        onChangeText={value => {
          onChangeText(value);
        }}
        defaultValue={defaultValue}
      />
    </View>
  );
};

const RoomPaymentScreen = props => {
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
      content: '주문/결제',
      navigateScreen: 'HomeScreenDetail1',
    },
  };

  const {route} = props;

  let current_cart_details = useSelector(st => st.common.current_cart_details);

  const selectedProducts = route?.params?.selectedProducts;
  const selectedCartDetails = route?.params?.selectedCartDetails;

  if (selectedProducts) {
    current_cart_details = selectedCartDetails;
    console.log(
      'selectedProducts[95]>>>>>>>>>>>>>>>>>>>>',
      route?.params?.selectedProducts,
      'route?.params?.selectedCartDetails',
      route?.params?.selectedCartDetails,
    );
  }

  const [flag, setFlag] = useState({p1: false, p2: true, p3: true, p4: true});

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
          <Text style={{color: '#1B1D1F'}}>{t2}</Text>
        </Text>
      </View>
    );
  };

  const phone_number = useSelector(st =>
    st.oauth?.user_data?.data?.phoneNumber?.slice(3),
  );
  const user_name = useSelector(st => st.oauth?.user_data?.data?.firstName);

  const dispatch = useDispatch();
  const [name, setName] = useState(user_name);
  const [phoneNumber, setPhoneNumber] = useState(phone_number);
  const [address, setAddress] = useState(null);
  const [remarks, setRemarks] = useState(null);

  // const [secondNum, setSecondNum] = useState(null)
  // const [firstNum, setFirstNum] = useState(null)

  const handleProceedCheckout = async () => {
    if (flag.p1) {
      let shipping_data = {
        name: name,
        phoneNumber: `+82${phoneNumber}`,
        address: address,
        remarks: remarks,
      };

      let query = {
        cartId: current_cart_details._id,
      };

      let mainPayload = {
        items: current_cart_details?.items?.map(cartD => {
          return {...cartD, itemId: cartD?.itemId?._id};
        }),
        shipping_data: shipping_data,
      };

      console.log('MP', mainPayload);

      if (name) {
        if (phoneNumber) {
          if (address) {
            if (remarks) {
              await checkoutCart(mainPayload, query)
                .then(res => {
                  if (res) {
                    console.log('CART CHECKOUT ++++', res);
                    if (res?.data?.newCartId) {
                      storeCartId(res?.data?.newCartId);
                    } else {
                      removeCartId();
                    }
                    console.log(res.data);
                    dispatch(setCurrentCheckoutCartDetails(res.data.data));
                    navigateTo('ThirdScreen');
                  }
                })
                .catch(err => {
                  if (err) {
                    showDefaultErrorAlert();
                  }
                });
            } else {
              ToastAndroid.showWithGravity(
                '요청사항이 입력해 주세요.',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
              );
            }
          } else {
            ToastAndroid.showWithGravity(
              '용품대여인 경우 배송지 캠핑예약인 경우에 차량번호를 입력해 주세요)',
              ToastAndroid.SHORT,
              ToastAndroid.TOP,
            );
          }
        } else {
          ToastAndroid.showWithGravity(
            '전화번호 입력해 주세요.',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
          );
        }
      } else {
        ToastAndroid.showWithGravity(
          '예약자 이름 입력해 주세요.',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      }
    } else {
      ToastAndroid.showWithGravity(
        '무통장 입금 체크해 주세요.',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    }
  };

  console.log('WF', phone_number);

  return (
    <View style={styles.container}>
      <Header headerContent={headerContent} />
      <View style={styles.border2}></View>
      <ScrollView>
        <View style={{backgroundColor: COLOR.white}}>
          <Text style={[styles.text1, styles.ph1, {paddingBottom: hp('3%')}]}>
            대여 기간
          </Text>
          {current_cart_details?.items.map(cart => {
            return (
              <View key={cart?._id}>
                <Div
                  t1="대여 시작일"
                  t2={moment(cart.startDate).utc().format('MM-DD-YYYY')}
                />
                <Div
                  t1="대여 시작일"
                  t2={moment(cart.endDate).utc().format('MM-DD-YYYY')}
                />
              </View>
            );
          })}
          <View style={styles.border1}></View>
          <Text style={[styles.text1, styles.ph1, {paddingBottom: hp('3%')}]}>
            배송 정보
          </Text>
          <Input
            t1="수령인"
            t2="수령인"
            keyboardType="email-address"
            defaultValue={name}
            onChangeText={value => {
              setName(value);
            }}
          />
          <Input
            t1="연락처"
            t2="연락처"
            maxLength={10}
            keyboardType="numeric"
            defaultValue={phoneNumber}
            onChangeText={value => {
              setPhoneNumber(value);
            }}
          />
          {/* <View style={styles.view2}>
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
              }}>
              <TextInput style={styles.textinput2} placeholder="010" maxLength={3} onChangeText={(value) => {

              }} />
              <Text style={{ textAlignVertical: 'center' }}>-</Text>
              <TextInput style={styles.textinput2} placeholder="1111" maxLength={4} />
              <Text style={{ textAlignVertical: 'center' }}>-</Text>
              <TextInput style={styles.textinput2} placeholder="1111" maxLength={4} />
            </View>
          </View> */}

          <Input
            t1="배송지"
            t2="캠핑 예약인 경우 차량번호를 입력해주세요"
            onChangeText={value => {
              setAddress(value);
            }}
          />
          <View style={styles.view1}>
            <Text
              style={{
                fontSize: RFPercentage(2.1),
                color: '#454C53',
                fontWeight: '600',
              }}>
              배송{'\n'}메세지
            </Text>
            <TextInput
              placeholderTextColor="#454C53"
              placeholder={
                '별도 요청사항이 없으실 경우, \n 공란으로 비워주세요'
              }
              style={[
                styles.textinput1,
                {
                  height: 60,
                  textAlignVertical: 'top',
                  paddingLeft: wp('5%'),
                },
              ]}
              onChangeText={value => {
                setRemarks(value);
              }}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.border1}></View>
          {current_cart_details?.items[0]?.itemId.type === 'PRODUCT' && (
            <View style={[globalStyle.mainContainerWrapper]}>
              <View style={{marginVertical: hp('1%')}}>
                <Text
                  style={{
                    fontSize: FONTSIZE.xl,
                    color: COLOR.black,
                    fontWeight: '900',
                  }}>
                  상품 정보
                </Text>
              </View>
              <View>
                {current_cart_details?.items.map(cart => {
                  let directItem = cart?.itemId;
                  return (
                    <View>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          backgroundColor: COLOR.lgrey,
                          minHeight: hp('5%'),
                          borderTopEndRadius: 10,
                          borderTopLeftRadius: 10,
                          padding: 10,
                        }}>
                        <View>
                          <Text style={styles.comp3Text1}>
                            {directItem.title}
                          </Text>
                        </View>
                        <View>
                          <Text style={[styles.comp3Text1, {fontSize: 14}]}>
                            배송비 0원
                          </Text>
                        </View>
                      </View>
                      <View style={styles.comp3View}>
                        <Image
                          source={{uri: directItem?.carousel[0]}}
                          style={styles.comp3Img}
                        />
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.comp3Text1}>
                            {directItem.title}
                          </Text>
                          <View>
                            <Text
                              style={[
                                styles.comp3Text2,
                                {paddingBottom: hp('0.5%')},
                              ]}>
                              {cart?.units * directItem.price}원
                            </Text>
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              width: '70%',
                            }}>
                            <View>
                              <Text
                                style={
                                  styles.comp3Text2
                                }>{`수량 ${cart?.units}개`}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* <View style={styles.border1}></View> */}
          <View style={styles.view1}>
            <Text style={styles.text2}>최종 결제 금액 (VAT포함)</Text>
            <Text></Text>
            <Text style={[styles.text2, {color: '#55C595'}]}>
              {current_cart_details?.totalAmount}원
            </Text>
          </View>
          <Text style={[styles.ph1, {paddingTop: hp('5%')}]}>
            <Text style={styles.text2}>
              {moment(
                new Date(current_cart_details?.items[0]?.startDate).setDate(
                  new Date(
                    current_cart_details?.items[0]?.startDate,
                  ).getDate() - 1,
                ),
              )
                .utc()
                .format('YYYY-MM-DD')}{' '}
              23:59:59
            </Text>
            <Text style={{color: '#454C53'}}>
              까지 결제(입금)되지 않으면 예약이 자동취소 됩니다.
            </Text>
          </Text>
          <View style={styles.border1}></View>
          <Text style={[styles.text1, styles.ph1]}>결제 방법</Text>
          <View
            style={[
              styles.ph1,
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
              <Text style={[styles.text2]}>무통장 입금</Text>
              <Text style={[styles.text2, {paddingTop: hp('1%')}]}>
                하나은행 4318901100083 /임태영
              </Text>
              <Text style={{paddingTop: hp('1%'), color: '#454C53'}}>
                위 계좌로 입금이 완료되면 배송준비가 시작됩니다.
              </Text>
            </View>
          </View>
          <View style={styles.border1}></View>
          {/* <Text style={[styles.text1, styles.ph1]}>결제시 필수사항 동의</Text> */}
          {/* <View style={{paddingBottom: hp('20%'), paddingTop: hp('2%')}}>
          <Comp t1="예약 유의사항 및 취소/환불규정 " t2="동의 (필수)" p="p2" />
          <Comp t1="개인정보 수집 및 이용 " t2="동의 (필수)" p="p3" />
          <Comp t1="개인정보 제3자 제공 " t2="동의 (필수)" p="p4" />
        </View> */}

          <Footer />
        </View>
      </ScrollView>
      <CustomButton
        buttonText={'대여하기'}
        buttonHandler={() => {
          handleProceedCheckout();
        }}
      />
    </View>
  );
};
const Div = ({t1, t2, c1, c2}) => {
  return (
    <View style={styles.view1}>
      <Text style={styles.text2}>{t1}</Text>
      <Text style={styles.text2}>{t2}</Text>
    </View>
  );
};
export default RoomPaymentScreen;

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
  view2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  text1: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1B1D1F',
  },
  text2: {fontWeight: '600', color: '#454C53'},
  ph1: {paddingHorizontal: wp('5%'), color: '#454C53'},
  textinput1: {
    width: wp('65%'),
    height: '80%',
    borderWidth: 1,
    color: '#454C53',
    borderColor: 'lightgrey',
  },
  textinput2: {
    borderWidth: 1,
    width: wp('20%'),
    borderColor: 'lightgrey',
    height: '80%',
    textAlign: 'center',
    fontWeight: 'bold',
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
  compView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  comp1Text1: {
    fontWeight: 'bold',
    fontSize: FONTSIZE.xlll,
    color: COLOR.black,
  },
  comp1Text2: {
    fontWeight: 'bold',
    color: '#1B1D1F',
  },
  comp2Text1: {
    fontWeight: 'bold',
    color: 'red',
    borderWidth: 1,
    borderColor: 'red',
    paddingHorizontal: wp('2%'),
    paddingVertical: wp('1%'),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  comp2Text2: {
    fontWeight: 'bold',
    color: 'green',
  },
  comp3View: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
    paddingVertical: hp('3.5%'),
    marginBottom: hp('3.5%'),
    width: wp('100%'),
  },
  comp3Img: {
    height: 100,
    width: 100,
    marginRight: wp('5%'),
  },
  comp3Text1: {
    fontWeight: 'bold',
    fontSize: FONTSIZE.l,
    color: COLOR.black,
  },
  comp3Text2: {
    fontWeight: 'bold',
    color: '#454C53',
  },
});
