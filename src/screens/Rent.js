import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  ToastAndroid,
  Linking,
  Pressable,
} from 'react-native';
import Header from '../layout/Header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import RentDetail from '../components/RentDetail';
import COLOR from '../constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import CustomButton from '../components/common/CustomButton';
import {navigateTo, goBack} from '../navigation/utils/RootNavigation';
import FONTSIZE from '../constants/fontSize';
import Counter from '../components/common/Counter';

const headerContent = {
  leftItemContents: {
    type: 'image',
    content: require('../assets/images/arrow-left.png'),
    navigateScreen: () => {
      goBack();
    },
  },
  middleItemContents: {
    type: 'text',
    content: '캠핑장예약',
  },
  rightItemContents: {
    type: 'image',
    content: require('../assets/images/home.png'),
    navigateScreen: 'HomeScreen',
  },
};

const Rent = props => {
  const {container, centeredView, modalView, termTitle, termsButtonWrapper} =
    styles;
  console.log('PROPS', props);
  const {route} = props;
  // const selectedLoc = useSelector(st => st.common.selected_location);
  const subLocations = useSelector(st => st.common.selected_location);
  const selected_item = useSelector(st => st.common?.selected_item);
  const startDate = useSelector(st => st.common?.start_date);
  const returnDate = useSelector(st => st.common?.return_date);
  const isLoggedIn = useSelector(st => st.oauth?.isLogin);
  const quantity = useSelector(st => st.common?.quantity);
  const description = useSelector(
    st => st.common?.selected_location.description,
  );
  const title = useSelector(st => st.common?.selected_location.title);
  const phone = useSelector(st => st.common?.selected_location.phone);

  const [modalVisible, setModalVisible] = useState(false);
  console.log('subLocations', subLocations);
  const enableCheckout = () => {
    if (startDate && returnDate) {
      return true;
    }
    return false;
  };
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  today = mm + '월' + dd + '일';
  const handleCheckout = async () => {
    let cartItems = {
      items: [
        {
          itemId: selected_item?._id,
          units: quantity,
          startDate: startDate,
          endDate: returnDate,
        },
      ],
    };
    console.log('CHCKOUT ITEMS', cartItems);
    await createOrUpdateCart(cartItems)
      .then(res => {
        if (res) {
          dispatch(setCurrentCheckoutCartDetails(res.data.data));
          ToastAndroid.showWithGravity(
            'Checkout In Progress',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
          );
          navigateTo('RoomPaymentScreen');
        }
      })
      .catch(err => {
        if (err) {
          showDefaultErrorAlert();
        }
      });
  };

  const OpenURLButton = ({url, children}) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
    return (
      <Pressable
        onPress={handlePress}
        style={{
          borderWidth: 2,
          borderColor: '#55C595',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3,
        }}>
        <Text
          style={{
            color: '#55C595',
            fontSize: RFPercentage(2),
          }}>
          {children}
        </Text>
      </Pressable>
    );
  };
  return (
    <View style={container}>
      {modalVisible && (
        <View style={centeredView}>
          <View style={modalView}>
            <View>
              <Text style={termTitle}>총 상품금액</Text>
              <View style={termsButtonWrapper}>
                {/* <View>
                  <Text style={termTitle}>{quantity ? item.price * quantity : item.price}</Text>
                </View> */}
                <View>
                  <Counter />
                </View>
              </View>
              <View style={termsButtonWrapper}>
                <View style={{width: '47%'}}>
                  <Button
                    title="Add to Cart"
                    onPress={() => {
                      navigateTo('ProductShoppingBagScreen'); // order success screen
                    }}
                    color={COLOR.grey}
                  />
                </View>
                <View style={{width: '47%'}}>
                  <Button
                    title="Checkout"
                    onPress={() => {
                      // navigateTo("ThirdScreen");//checkout
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
      <ScrollView>
        <View>
          <Carousel
            carouselData={subLocations?.carousel}
            paginationType="right"
          />
        </View>
        <View style={{marginHorizontal: wp('5%'), marginBottom: hp('15%')}}>
          <View style={{marginTop: hp('4%')}}>
            <Text
              style={{
                color: '#1B1D1F',
                fontSize: RFPercentage(3),
                fontWeight: 'bold',
              }}>
              {title}
            </Text>
          </View>
          <View
            style={{
              marginTop: hp('3%'),
              paddingBottom: hp('1%'),
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={require('../assets/images/loc.png')} />
            <Text
              style={{
                color: '#9EA4AA',
                fontSize: RFPercentage(2),
                paddingLeft: wp('5%'),
                paddingRight: wp('5%'),
              }}>
              {description}
            </Text>
            <Image source={require('../assets/images/icon_location.png')} />
          </View>

          <View
            style={{
              paddingBottom: hp('5%'),
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={require('../assets/images/number.png')} />
            <Text
              style={{
                color: '#9EA4AA',
                fontSize: RFPercentage(2),
                paddingLeft: wp('5%'),
                paddingRight: wp('5%'),
              }}>
              {phone}
            </Text>
            <Image source={require('../assets/images/icon_phone.png')} />
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
            <TouchableOpacity
              onPress={() => {
                if (isLoggedIn) {
                  navigateTo('CalendarScreen', {type: 'LOCATION'});
                } else {
                  ToastAndroid.showWithGravity(
                    'You have to Login to Proceed with Renting Date',
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                  );
                }
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: wp('40%'),
                borderRightWidth: 0.5,
              }}>
              <View>
                <Text style={{color: '#454C53', fontSize: RFPercentage(2)}}>
                  체크인
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
                  {startDate || today}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (isLoggedIn) {
                  navigateTo('CalendarScreen', {type: 'LOCATION'});
                } else {
                  ToastAndroid.showWithGravity(
                    'You have to Login to Proceed with Renting Date',
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                  );
                }
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: wp('40%'),
                borderLeftWidth: 0.5,
              }}>
              <View>
                <Text style={{color: '#454C53', fontSize: RFPercentage(2)}}>
                  체크 아웃
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
                  {returnDate || today}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <RentDetail subLocations={subLocations.subLocations} />
          {subLocations?.specifications?.campIntro && (
            <>
              <View style={{marginTop: wp('7%')}}>
                <Text
                  style={{
                    color: '#1B1D1F',
                    fontSize: RFPercentage(2.5),
                    fontWeight: 'bold',
                  }}>
                  캠핑장 소개
                </Text>
              </View>
              <View
                style={{
                  marginVertical: wp('5%'),
                  borderBottomWidth: 1,
                  borderColor: '#9EA4AA',
                }}>
                <Text
                  style={{
                    color: '#454C53',
                    fontSize: RFPercentage(2),
                    marginBottom: wp('5%'),
                  }}>
                  {subLocations?.specifications?.campIntro}
                </Text>
              </View>
            </>
          )}
          {subLocations?.specifications?.facilityInfo && (
            <View>
              <Text
                style={{
                  color: '#1B1D1F',
                  fontSize: RFPercentage(2.5),
                  fontWeight: 'bold',
                }}>
                이용시설 안내
              </Text>
            </View>
          )}

          {subLocations?.specifications?.facilityInfo?.split(',').length > 0 ? (
            <View
              style={{
                flexDirection: 'column',
                marginVertical: wp('5%'),
              }}>
              {subLocations?.specifications?.facilityInfo
                ?.split(',')
                ?.map(k => (
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
              {subLocations?.specifications?.facilityInfo}
            </Text>
          )}
          {/* <View
            style={{
              marginVertical: wp('5%'),
            }}>
            <Text
              style={{
                color: '#454C53',
                fontSize: RFPercentage(2),
              }}>
              {subLocations?.specifications?.facilityInfo}
            </Text>
          </View> */}
          <OpenURLButton url={subLocations?.specifications?.campLink}>
            캠핑장 링크 이동
          </OpenURLButton>
          {/* <View
            style={{
              borderWidth: 2,
              borderColor: '#55C595',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 3,
            }}>
            <Text
              style={{
                color: '#55C595',
                fontSize: RFPercentage(2),
              }}>
              캠핑장 링크 이동
            </Text>
          </View> */}

          <View
            style={{
              marginTop: hp('3%'),
              borderTopWidth: 1,
              borderColor: '#9EA4AA',
              padding: 3,
            }}>
            <Text
              style={{
                color: '#1B1D1F',
                marginVertical: hp('3%'),
                color: '#1B1D1F',
                fontSize: RFPercentage(2.5),
                fontWeight: 'bold',
              }}>
              이용안내
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#454C53',
                fontSize: RFPercentage(2),
                marginBottom: hp('3%'),
              }}>
              {subLocations?.specifications?.useInfo}
            </Text>
          </View>

          <View>
            <Image
              style={{height: 200, resizeMode: 'contain'}}
              source={{uri: subLocations.specifications.image}}
            />
          </View>
          <View
            style={{
              paddingTop: hp('1%'),
              paddingBottom: hp('1%'),
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={require('../assets/images/loc.png')} />
            <Text
              style={{
                color: '#9EA4AA',
                fontSize: RFPercentage(2),
                paddingLeft: wp('5%'),
                paddingRight: wp('5%'),
              }}>
              {subLocations?.description}
            </Text>
            <Image source={require('../assets/images/icon_location.png')} />
          </View>
        </View>
        <Footer />
      </ScrollView>
      {/* {!modalVisible && <View>
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
      </View>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingBottom: hp('10%'), backgroundColor: COLOR.white},
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
    marginVertical: hp('1%'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Rent;
