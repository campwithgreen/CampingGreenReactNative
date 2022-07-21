import { View, Text, ScrollView, StyleSheet, ToastAndroid, Button } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import React, { useState } from 'react';
import Header from '../layout/Header';
import Carousel from '../components/Carousel';
import SecondScreen1 from '../components/SecondScreen1';
import SecondScreen2 from '../components/SecondScreen2';
import Footer from '../components/Footer';
import CustomButton from '../components/common/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import COLOR from '../constants/colors';
import FONTSIZE from '../constants/fontSize';
import { createOrUpdateCart } from '../apis/cart';
import { setCurrentCheckoutCartDetails } from '../redux/actions/common';
import { showDefaultErrorAlert } from '../global/global';
import { navigateTo } from '../navigation/utils/RootNavigation';
import Counter from '../components/common/Counter';

const headerContent = {
  leftItemContents: {
    type: 'image',
    content: require('../assets/images/icon_cancel.png'),
    navigateScreen: 'LoginScreen',
  },
  middleItemContents: {
    type: 'text',
    content: '객실 정보',
    navigateScreen: 'HomeScreenDetail1',
  },
  rightItemContents: {
    type: 'image',
    content: require('../assets/images/cart.png'),
    navigateScreen: 'LoginScreen',
  },
};
const SecondScreen = () => {
  const { container, centeredView, modalView, termTitle, termsButtonWrapper } = styles;
  const selected_subLocation = useSelector((st) => st.common.selected_sub_location);

  const dispatch = useDispatch();


  const subLocations = useSelector((st) => st.common.selected_location);
  const startDate = useSelector((st) => st.common?.start_date);
  const returnDate = useSelector((st) => st.common?.return_date);
  const isLoggedIn = useSelector((st) => st.oauth?.isLogin);
  const quantity = useSelector((st) => st.common?.quantity);

  const [modalVisible, setModalVisible] = useState(false);


  const enableCheckout = () => {
    if (startDate && returnDate) {
      return true;
    }
    return false;
  };

  let cartItems = {
    "items": [
      {
        "itemId": selected_subLocation?._id,
        "units": quantity || 1,
        "startDate": startDate,
        "endDate": returnDate
      }
    ]
  };

  const handleCheckout = async () => {
    console.log("CHCKOUT ITEMS", cartItems);
    await createOrUpdateCart(cartItems).then((res) => {
      if (res) {
        dispatch(setCurrentCheckoutCartDetails(res.data.data));
        ToastAndroid.showWithGravity("Checkout In Progress", ToastAndroid.SHORT, ToastAndroid.TOP);
        navigateTo("RoomPaymentScreen");
        setModalVisible(false);
      }
    }).catch((err) => {
      if (err) {
        showDefaultErrorAlert();
        setModalVisible(false);
      }
    });
  };

  const handleAddToCart = async () => {
    console.log("CHCKOUT ADD ITEMS", cartItems);
    await createOrUpdateCart(cartItems).then((res) => {
      if (res) {
        ToastAndroid.showWithGravity("Product added to cart", ToastAndroid.SHORT, ToastAndroid.TOP);
        navigateTo("ProductShoppingBagScreen");
        setModalVisible(false);
      }
    }).catch((err) => {
      if (err) {
        showDefaultErrorAlert();
        setModalVisible(false);
      }
    });
  };


  return (
    <View style={container}>
      {modalVisible &&
        <View style={centeredView}>
          <View style={modalView}>
            <View>
              <Text style={termTitle}>총 상품금액</Text>
              <View style={termsButtonWrapper}>
                <View>
                  <Text style={termTitle}>{quantity ? selected_subLocation.price * quantity : selected_subLocation.price}</Text>
                </View>
                <View>
                  <Counter />
                </View>
              </View>
              <View style={termsButtonWrapper}>
                <View style={{ width: "47%" }}>
                  <Button
                    title="Add to Cart"
                    onPress={() => {
                      handleAddToCart();
                    }}
                    color={COLOR.grey}
                  />
                </View>
                <View style={{ width: "47%" }}>
                  <Button
                    title="Checkout"
                    onPress={() => {
                      handleCheckout();
                    }}
                    color={COLOR.compGreen}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>}
      <Header headerContent={headerContent} />
      <ScrollView style={{ marginBottom: hp("7%") }}>
        <Carousel carouselData={selected_subLocation.carousel} />
        <Text
          style={[
            styles.text1,
            {
              fontSize: RFPercentage(4),
              paddingTop: hp('5%'),
              paddingBottom: hp('2%'),
              paddingHorizontal: wp('5%'),
            },
          ]}>
          {selected_subLocation.title}
        </Text>
        <Text style={[styles.text2, { paddingHorizontal: wp('5%') }]}>
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
        {selected_subLocation?.specifications && Object.keys(selected_subLocation?.specifications)?.map((spec) => {
          return <SecondScreen1 t1={spec} t2={selected_subLocation?.specifications[spec]} />;
        })}
        <View style={styles.border2}></View>
        <SecondScreen1 t1="abcd" t2="abcd" />
        <SecondScreen1 t1="객실정보" t2="전기사용가능" />
        <View style={styles.view1}>
          <Text style={styles.text2}>구비시설</Text>
          <Text></Text>
          <Text style={[styles.text2, { textAlign: 'right', lineHeight: 24 }]}>
            개별바비큐, 식탁, 에어컨, 식기도구, {'\n'}전자레인지, 취사도구,
            선풍기
          </Text>
        </View>
        <View style={styles.border2}></View>
        <SecondScreen1 t1="기준차량" t2="총 1대" />
        <SecondScreen1 t1="차량 초과요금" t2="14,000" />
        <View style={styles.border1}></View>

        {selected_subLocation.allFeatures.map((allFeature) => {
          return <View>
            <Text
              style={[
                styles.text1,
                { paddingHorizontal: wp('5%'), paddingBottom: hp('3%') },
              ]}>
              {allFeature.add_feature_title}
            </Text>
            <View style={styles.view1}>
              <Text style={styles.text2}>인원추가 요금</Text>
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
            </View>
          </View>;
        })}
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



        <View style={styles.border2}></View>
        <Text style={[styles.text2, { paddingHorizontal: wp('5%') }]}>
          추가 옵션으로 발생하는 요금은 현장에서 결제해주세요
        </Text>
        <View style={styles.border1}></View>
        <Text
          style={[
            styles.text1,
            { paddingHorizontal: wp('5%'), paddingBottom: hp('3%') },
          ]}>
          환불 금액
        </Text>
        <View style={{ paddingBottom: hp('18%') }}>
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
            <Text style={{ width: wp('30%'), textAlign: 'center' }}>aaaaaa</Text>
            <Text style={{ width: wp('30%'), textAlign: 'center' }}>bbbbb</Text>
            <Text style={{ width: wp('30%'), textAlign: 'center' }}>cccccc</Text>
          </View>
          <SecondScreen2 t1="aa" t2="bb" t3="cc" />
          <SecondScreen2 t1="aaaaaaaaa" t2="bb" t3="cc" />
          <SecondScreen2 t1="aa" t2="bb" t3="cc" />
          <SecondScreen2 t1="aa" t2="bb" t3="cc" />
          <SecondScreen2 t1="aa" t2="bb" t3="cc" />
          <SecondScreen2 t1="aaaaaaaaa" t2="bb" t3="cc" />
          <SecondScreen2 t1="aa" t2="bb" t3="cc" />
          <SecondScreen2 t1="aa" t2="bb" t3="cc" />
        </View>
        <Footer />
      </ScrollView>
      {!modalVisible && <View>
        <CustomButton buttonText={"대여하기"} buttonHandler={() => {
          if (isLoggedIn) {
            if (enableCheckout()) {
              setModalVisible(true);
            } else {
              ToastAndroid.showWithGravity("Please Select the Date for Checkout", ToastAndroid.LONG, ToastAndroid.TOP);
            }
          } else {
            ToastAndroid.showWithGravity("You have to Login to Proceed Renting", ToastAndroid.LONG, ToastAndroid.TOP);
            navigateTo("LoginScreen");
          }
        }} />
      </View>}
    </View>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    flex: 1
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
    color: 'black',
  },
  text2: { fontWeight: '600', color: '#454C53' },
  border1: { borderWidth: 4, borderColor: 'lightgrey', marginVertical: hp('5%') },
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
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 15,
    elevation: 50,
  },
  modalView: {
    minHeight: hp("30%"),
    backgroundColor: COLOR.black,
    borderTopLeftRadius: 30,
    padding: hp("4%"),
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 100,
  },
  termTitle: {
    color: COLOR.white,
    fontWeight: "bold",
    fontSize: FONTSIZE.xll
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  termsButtonWrapper: {
    marginVertical: hp("2%"),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
