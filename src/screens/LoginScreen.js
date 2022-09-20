import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FormField from '../components/common/FormField';
import COLOR from '../constants/colors';
import globalStyle from '../global/globalStyle';
import Header from '../layout/Header';
import {goBack, navigateTo} from '../navigation/utils/RootNavigation';
import {authDoor, verifyOtp} from '../apis/auth';
import {showDefaultErrorAlert} from '../global/global';
import {useDispatch, useSelector} from 'react-redux';
import {login, setUserData, setUserToken} from '../redux/actions/oauth';
import {setUserCartHistory} from '../redux/actions/common';
import {getUserCartHistory} from '../apis/cart';
import AsyncStorage from '@react-native-async-storage/async-storage';

const headerContent = {
  leftItemContents: {
    type: 'image',
    content: require('../assets/images/cancel.png'),
    navigateScreen: () => goBack(),
  },
};

export default function LoginScreen() {
  const st = useSelector(st => st);
  console.log('STORE ++++++++++++++++++++', st);

  const {
    container,
    wrapper,
    mainTextWrapper,
    mainText,
    form,
    formlabel,
    inputcontainer,
    buttonWrapper,
  } = styles;
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [otp, setOtp] = useState(null);
  const [otpAutoFocus, setOtpAutoFocus] = useState(false);

  const isLogin = useSelector(st => st.oauth?.isLogin);
  const role = useSelector(st => st?.oauth?.user_data?.data?.role);

  const [otpsent, setOptSent] = useState(false);

  const removeCartId = async value => {
    console.log('REMOVING CART ID');
    try {
      await AsyncStorage.removeItem('@cart_id');
    } catch (e) {
      console.log('REMOVING CART ID ERROR', e);
    }
  };

  useEffect(() => {
    if (isLogin && role == 'USER') {
      navigateTo('HomeScreen');
    }
  }, [isLogin]);

  useEffect(() => {
    if (isLogin) {
      (async function getCartHistory() {
        await getUserCartHistory()
          .then(res => {
            if (res) {
              dispatch(setUserCartHistory(res.data.data));
              console.log('THE C HIS', res.data.data[0].items?.length);
              if (res?.data?.data[0].items?.length === 0) {
                removeCartId();
              }
            }
          })
          .catch(err => {
            if (err) {
              showDefaultErrorAlert();
              setLoading(false);
            }
          });
      })();
    }
  }, [isLogin]);

  const [lineColor, setLineColor] = useState(COLOR.black);
  const onFocus = () => setLineColor(COLOR.compGreen);

  const onBlur = () => {
    setLineColor('black');
  };

  const [getOtpButtonEnabled, setGetOtpButtonEnabled] = useState(true);

  const formSubmissionRequired = useSelector(
    st => st?.oauth?.user_data?.formSubmissionRequired,
  );

  const handleGetOtp = async phoneNumber => {
    if (phoneNumber.length === 10 || phoneNumber.length === 11) {
      let payload = {
        phoneNumber: `+82${phoneNumber}`,
      };
      await authDoor(payload)
        .then(res => {
          setOptSent(true);
          setOtpAutoFocus(true);
          dispatch(setUserData(res.data));
          if (res.data.formSubmissionRequired) {
            console.log('ENTERED REGISTER REQUIRED');
            ToastAndroid.showWithGravity(
              'OTP Successfully Sent, Pls verify your number and register you account',
              ToastAndroid.SHORT,
              ToastAndroid.TOP,
            );
            setGetOtpButtonEnabled(false);
          } else {
            console.log('ENTERED REGISTER REQUIRED 2');
            setOptSent(true);
            ToastAndroid.showWithGravity(
              'OTP Successfully Sent',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
            );
            setGetOtpButtonEnabled(false);
          }
        })
        .catch(err => {
          if (err) {
            showDefaultErrorAlert();
          }
        });
    } else {
      ToastAndroid.showWithGravity(
        'Pls, enter a valid phone number !',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    }
  };

  const getValue = value => {
    setOtp(value);
  };

  const handleLogin = async () => {
    console.log('ENTERED THE CONSOLLING');
    console.log(phoneNumber, otp);

    let payload = {
      phoneNumber: `+82${phoneNumber}`,
      otp: otp,
    };
    await verifyOtp(payload)
      .then(res => {
        if (res.data) {
          if (res.data.success) {
            dispatch(setUserToken(res.data.token));
            if (formSubmissionRequired) {
              Alert.alert(
                'Account Not Found',
                `You have to register your number ${phoneNumber} first`,
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => navigateTo('RegisterScreen')},
                ],
              );
            } else {
              dispatch(login(true));
              ToastAndroid.showWithGravity(
                'Logged In Successfully',
                ToastAndroid.LONG,
                ToastAndroid.TOP,
              );
              navigateTo('HomeScreen');
            }
          } else {
            ToastAndroid.showWithGravity(
              res.data.message.toUpperCase(),
              ToastAndroid.LONG,
              ToastAndroid.TOP,
            );
          }
        }
      })
      .catch(err => {
        if (err) {
          showDefaultErrorAlert();
        }
      });
  };

  const disableButton = () => {
    if (!phoneNumber || !otp) {
      return true;
    }
    return false;
  };

  return (
    <View style={container}>
      <Header headerContent={headerContent} />
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={[globalStyle.mainContainerWrapper, wrapper]}>
          <View style={mainTextWrapper}>
            <Text style={mainText}>캠핑용품 대여부터 캠핑장 예약까지</Text>
            <Text style={mainText}>편하게 누려보세요</Text>
          </View>
          <View style={form}>
            <View style={inputcontainer}>
              <Text style={formlabel}>휴대폰 번호</Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{width: '70%'}}>
                  <TextInput
                    style={{
                      color: 'black',
                      borderBottomWidth: 1,
                      borderBottomColor: lineColor,
                      width: '100%',
                      padding: 10,
                    }}
                    placeholder="1011112222 -없이 숫자만 입력해주세요"
                    onFocus={() => onFocus()}
                    onBlur={() => onBlur()}
                    onChangeText={value => {
                      setPhoneNumber(value);
                    }}
                    maxLength={11}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    padding: 5,
                    width: '30%',
                  }}
                  onPress={() => {
                    if (getOtpButtonEnabled) {
                      handleGetOtp(phoneNumber);
                    } else {
                      ToastAndroid.showWithGravity(
                        'OTP has already sent, Pls use it',
                        ToastAndroid.LONG,
                        ToastAndroid.TOP,
                      );
                    }
                  }}
                  underlayColor="transparent">
                  <View
                    style={{
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: 'grey',
                      padding: 5,
                    }}>
                    <Text style={{color: 'grey'}}>인증 요청</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <FormField
              label="인증번호"
              type="text"
              keyboardType="numeric"
              onChange={value => {
                getValue(value);
              }}
              disabled={otpsent}
              maxLength={6}
              autoFocus={otpAutoFocus}
            />
          </View>
        </View>
      </ScrollView>
      <View style={buttonWrapper}>
        <Button
          title="로그인 또는 회원가입"
          onPress={() => handleLogin()}
          color={COLOR.compGreen}
          disabled={disableButton()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    flex: 1,
  },
  wrapper: {
    backgroundColor: '#fff',
  },
  mainTextWrapper: {
    marginVertical: hp('3.5%'),
  },
  mainText: {
    color: 'black',
    fontSize: RFPercentage(3),
    fontWeight: '900',
  },
  form: {
    marginTop: hp('2%'),
  },
  formlabel: {
    fontSize: RFPercentage(2.5),
    color: '#9DA9CE',
  },
  inputcontainer: {
    marginVertical: hp('2%'),
  },
  buttonWrapper: {
    marginHorizontal: widthPercentageToDP('5%'),
    marginBottom: Platform.OS === 'android' ? hp('3%') : hp('30%'),
  },
});
