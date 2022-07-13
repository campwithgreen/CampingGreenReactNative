import React, { useState } from 'react';
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
import { RFPercentage } from 'react-native-responsive-fontsize';
import MyScreen1 from '../components/MyScreen1';
import Header from '../layout/Header';
import Footer from '../components/Footer';
import COLOR from '../constants/colors';
import CustomButton from '../components/common/CustomButton';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { checkoutCart } from '../apis/cart';
import { showDefaultErrorAlert } from '../global/global';
import { navigateTo } from '../navigation/utils/RootNavigation';


const Input = ({ t1, t2, onChangeText, keyboardType, defaultValue, maxLength }) => {
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
        style={[styles.textinput1, { paddingLeft: wp('5%'), fontWeight: 'bold' }]}
        placeholder={t2}
        maxLength={maxLength}
        keyboardType={keyboardType}
        onChangeText={(value) => {
          onChangeText(value);
        }}
        defaultValue={defaultValue}
      />
    </View>
  );
};

const RoomPaymentScreen = () => {
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
  const [flag, setFlag] = useState({ p1: true, p2: true, p3: true, p4: true });

  const Comp = ({ t1, t2, p }) => {
    return (
      <View
        style={[
          styles.ph1,
          { display: 'flex', flexDirection: 'row', paddingTop: hp('1%') },
        ]}>
        <TouchableOpacity
          onPress={() => setFlag(prev => ({ ...prev, [p]: !prev[p] }))}>
          {flag[p] ? (
            <Image source={require('../assets/images/green_circle.png')} />
          ) : (
            <Image source={require('../assets/images/white_circle.png')} />
          )}
        </TouchableOpacity>
        <Text style={[styles.text2, { marginLeft: wp('3%') }]}>
          <Text style={{ color: '#55C595' }}>{t1}</Text>
          <Text>{t2}</Text>
        </Text>
      </View>
    );
  };

  const phone_number = useSelector((st) => st.oauth?.user_data?.data?.phoneNumber?.slice(3));
  const user_name = useSelector((st) => st.oauth?.user_data?.data?.firstName);


  console.log(user_name);

  const [name, setName] = useState(user_name);
  const [phoneNumber, setPhoneNumber] = useState(phone_number);
  const [address, setAddress] = useState(null);
  const [remarks, setRemarks] = useState(null);

  // const [firstNum,setFirstNum]=useState(null)
  // const [secondNum, setSecondNum] = useState(null)
  // const [firstNum, setFirstNum] = useState(null)

  const handleProceedCheckout = async () => {

    let shipping_data = {
      "name": name,
      "phoneNumber": `+91${phoneNumber}`,
      "address": address,
      "remarks": remarks
    };

    let query = {
      cartId: current_cart_details._id
    };

    let mainPayload = {
      items: current_cart_details.items,
      shipping_data: shipping_data
    };

    console.log("MP", mainPayload);

    if (name) {
      if (phoneNumber) {
        if (address) {
          if (remarks) {
            await checkoutCart(mainPayload, query).then((res) => {
              if (res) {
                console.log(res.data);
                navigateTo("ThirdScreen");
              }
            }).catch((err) => {
              if (err) {
                showDefaultErrorAlert();
              }
            });
          } else {
            ToastAndroid.showWithGravity("Pls enter the remarks", ToastAndroid.SHORT, ToastAndroid.LONG);
          }
        } else {
          ToastAndroid.showWithGravity("Pls enter the address", ToastAndroid.SHORT, ToastAndroid.LONG);
        }
      } else {
        ToastAndroid.showWithGravity("Pls enter the phoneNumber", ToastAndroid.SHORT, ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.showWithGravity("Pls enter the name", ToastAndroid.SHORT, ToastAndroid.LONG);
    }

  };


  const current_cart_details = useSelector((st) => st.common.current_cart_details);


  console.log("WF", phone_number);



  return (
    <View style={{ backgroundColor: 'white', marginBottom: hp("15%") }}>
      <Header headerContent={headerContent} />
      <View style={styles.border2}></View>
      <ScrollView>
        <View style={{ backgroundColor: COLOR.white, marginBottom: hp("3%") }}>
          <Text style={[styles.text1, styles.ph1, { paddingBottom: hp('3%') }]}>
            대여 기간
          </Text>
          {current_cart_details?.items.map((cart) => {
            return <View key={cart?._id}>
              <Div t1="대여 시작일" t2={moment(cart.startDate).utc().format('MM-DD-YYYY')} />
              <Div t1="대여 시작일" t2={moment(cart.endDate).utc().format('MM-DD-YYYY')} />
            </View>;
          })}
          <View style={styles.border1}></View>
          <Text style={[styles.text1, styles.ph1, { paddingBottom: hp('3%') }]}>
            주문자
          </Text>
          <Input t1="수령인" t2="수령인" keyboardType="email-address" defaultValue={name} onChangeText={(value) => {
            setName(value);
          }} />
          <Input t1="연락처" t2="연락처" maxLength={10} keyboardType="numeric" defaultValue={phoneNumber} onChangeText={(value) => {
            setPhoneNumber(value);
          }} />
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
          <Input t1="주문자" t2="주문자" keyboardType={"email-address"} onChangeText={(value) => {
            setAddress(value);
          }} />
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
              placeholder={'별도 요청사항이 없으실 경우, \n 공란으로 비워주세요'}
              style={[
                styles.textinput1,
                {
                  height: 60,
                  textAlignVertical: 'top',
                  paddingLeft: wp('5%'),
                },
              ]}
              onChangeText={(value) => {
                setRemarks(value);
              }}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.border1}></View>
          <View style={styles.view1}>
            <Text style={styles.text2}>최종 결제 금액</Text>
            <Text></Text>
            <Text style={[styles.text2, { color: '#55C595' }]}>{current_cart_details?.totalAmount}원</Text>
          </View>
          <Text style={[styles.ph1, { paddingTop: hp('5%') }]}>
            <Text style={styles.text2}>-2022.05.20 23:59:59</Text>
            <Text>까지 결제(입금)되지 않으면 예약이 자동취소 됩니다.</Text>
          </Text>
          <View style={styles.border1}></View>
          <Text style={[styles.text1, styles.ph1]}>결제 방법</Text>
          <View
            style={[
              styles.ph1,
              { display: 'flex', flexDirection: 'row', paddingTop: hp('2%') },
            ]}>
            <TouchableOpacity
              onPress={() => setFlag(prev => ({ ...prev, p1: !prev.p1 }))}>
              {flag.p1 ? (
                <Image source={require('../assets/images/green_circle.png')} />
              ) : (
                <Image source={require('../assets/images/white_circle.png')} />
              )}
            </TouchableOpacity>

            <View style={{ marginLeft: wp('3%') }}>
              <Text style={[styles.text2]}>무통장 입금</Text>
              <Text style={[styles.text2, { paddingTop: hp('1%') }]}>
                하나은행 / 1111-1111-111/ 임태영
              </Text>
              <Text style={{ paddingTop: hp('1%') }}>
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
      <View>
        <CustomButton buttonText={"대여하기"} buttonHandler={() => { handleProceedCheckout(); }} />
      </View>
    </View>
  );
};
const Div = ({ t1, t2, c1, c2 }) => {
  return (
    <View style={styles.view1}>
      <Text style={styles.text2}>{t1}</Text>
      <Text style={styles.text2}>{t2}</Text>
    </View>
  );
};

export default RoomPaymentScreen;

const styles = StyleSheet.create({
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
    color: 'black',
  },
  text2: { fontWeight: '600', color: '#454C53' },
  ph1: { paddingHorizontal: wp('5%') },
  textinput1: {
    width: wp('65%'),
    height: '80%',
    borderWidth: 1,
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
});
