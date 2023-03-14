import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Linking,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Header from '../layout/Header';
import {goBack, navigateTo} from '../navigation/utils/RootNavigation';
import globalStyle from '../global/globalStyle';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import COLOR from '../constants/colors';
import FONTSIZE from '../constants/fontSize';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../redux/actions/oauth';
import {getUserCartHistory} from '../apis/cart';
import {showDefaultErrorAlert} from '../global/global';
import {setUserCartHistory} from '../redux/actions/common';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteAccount} from '../apis/auth';

export const ProfileScreen = props => {
  const st = useSelector(st => st);
  // console.log('STORE', st);
  const phoneNumber = '01079275475';
  const dialCall = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };
  const kakaoChannel = () => {
    const URL = 'http://pf.kakao.com/_RDxmRxj';
    Linking.canOpenURL(URL).then(supported => {
      if (supported) {
        Linking.openURL(URL);
      } else {
        alert('Url 열 수 없습니다.: ' + URL);
      }
    });
  };
  const dispatch = useDispatch();

  const isLogin = useSelector(st => st?.oauth?.isLogin);
  const userName = useSelector(st => st?.oauth?.user_data?.data?.firstName);
  const userData = useSelector(st => st?.oauth?.user_data?.data);
  console.log('userdata', userData);
  const {
    firstContainer,
    companyText,
    textWrapper,
    textWrapperII,
    textWrapperIII,
    statusText,
    greyColor,
    textWrapperIV,
    secondContainer,
    secondTextWrapper,
    secondText,
    secondTextII,
    secondParentWrapper,
    buttonWrapper,
    innerContainer,
    parentContainer,
  } = styles;

  const headerContent = {
    // leftItemContents: {
    //   type: 'image',
    //   content: require('../assets/images/arrow-left.png'),
    //   navigateScreen: () => goBack(),
    // },
    middleItemContents: {
      type: 'text',
      content: '마이페이지',
    },
    rightItemContents: {
      type: 'cart',
      content: require('../assets/images/cart.png'),
      navigateScreen: () => {
        if (!isLogin) {
          Toast.show({
            type: 'info',
            text1: '로그인 필요합니다.',
            visibilityTime: 2000,
          });
        } else {
          navigateTo('ProductShoppingBagScreen');
        }
      },
    },
  };

  const cart_history = useSelector(st => st.common?.cart_history);

  let result = cart_history?.reduce(function (r, a) {
    r[`${moment(a.createdAt).utc().format('MM-DD-YYYY')}_${a.paymentStatus}`] =
      r[
        `${moment(a.createdAt).utc().format('MM-DD-YYYY')}_${a.paymentStatus}`
      ] || [];
    r[
      `${moment(a.createdAt).utc().format('MM-DD-YYYY')}_${a.paymentStatus}`
    ].push(a);
    return r;
  }, Object.create(null));

  let pendingCart = 0;
  if (result) {
    Object.keys(result).map(key => {
      if (key.indexOf('PAYMENT_PENDING') > -1) {
        pendingCart = pendingCart + result[key].length;
      }
    });
  }

  const handleLogout = async () => {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    dispatch(logout());

    Toast.show({
      type: 'success',
      text1: '로그아웃 되었습니다.',
      visibilityTime: 2000,
    });
  };

  useEffect(() => {
    if (isLogin) {
      (async function getCartHistory() {
        await getUserCartHistory()
          .then(res => {
            if (res) {
              dispatch(setUserCartHistory(res.data.data));
            }
          })
          .catch(err => {
            if (err) {
              showDefaultErrorAlert();
            }
          });
      })();
    }
  }, [isLogin]);
  const requestTodeleteAccount = async userid => {
    console.log('userid', userid);
    await deleteAccount({userId: userid}).then(res => {
      if (res.status == 200) {
        if (res.data.success === true) {
          Toast.show({
            type: 'success',
            text1: '관리자에게 요청 보냈습니다. 15일이내 계정이 삭제됩니다.',
            visibilityTime: 2000,
          });
        } else {
          Toast.show({
            type: 'success',
            text1: res.data.msg,
            visibilityTime: 2000,
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: '인터넷 상태를 확인해 주세요.',
          visibilityTime: 2000,
        });
      }
    });
  };

  return (
    <View style={parentContainer}>
      <Header headerContent={headerContent} />
      <ScrollView style={{marginBottom: 50}}>
        <View style={innerContainer}>
          <View style={firstContainer}>
            <View style={globalStyle.mainContainerWrapper}>
              <View style={textWrapper}>
                <Text style={companyText}>CAMPING GREEN</Text>
              </View>
              <View style={textWrapperII}>
                <View style={textWrapperIV}>
                  {!isLogin ? (
                    <TouchableOpacity
                      onPress={() => {
                        navigateTo('LoginScreen');
                      }}>
                      <Text style={companyText}>Login</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={companyText}>
                      {userName.toUpperCase() || '김그린 님'}
                    </Text>
                  )}
                </View>
                {isLogin && (
                  <View style={textWrapperIII}>
                    <Text style={[statusText, greyColor]}>최근주문</Text>

                    <TouchableOpacity
                      onPress={() => {
                        navigateTo('RoomReservationRecentScreen');
                      }}>
                      <Text style={statusText}>{pendingCart}건 입금대기</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={secondParentWrapper}>
            <View style={secondContainer}>
              <View style={globalStyle.mainContainerWrapper}>
                <View style={secondTextWrapper}>
                  <Text style={secondText}>나의 쇼핑정보</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    if (isLogin) {
                      navigateTo('RoomReservationListScreen', {
                        type: 'SUBLOCATION',
                      });
                    } else {
                      alert('로그인 후에 조회 가능한 서비스입니다. ');
                    }
                  }}>
                  <View style={secondTextWrapper}>
                    <Text style={secondTextII}>캠핑장 예약내역 조회</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (isLogin) {
                      navigateTo('RoomReservationListScreen', {
                        type: 'PRODUCT',
                      });
                    } else {
                      alert('로그인 후에 조회 가능한 서비스입니다. ');
                    }
                  }}>
                  <View style={secondTextWrapper}>
                    <Text style={secondTextII}>캠핑용품 대여내역 조회</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={secondContainer}>
              <View style={globalStyle.mainContainerWrapper}>
                <View style={secondTextWrapper}>
                  <Text style={secondText}>고객센터</Text>
                </View>
                <View style={secondTextWrapper}>
                  <Text
                    onPress={() => {
                      dialCall(phoneNumber);
                    }}
                    style={secondTextII}>
                    상담원 연결
                  </Text>
                </View>
                <View style={secondTextWrapper}>
                  <Text
                    onPress={() => {
                      kakaoChannel();
                    }}
                    style={secondTextII}>
                    카카오톡 채널로 연결
                  </Text>
                </View>

                {isLogin && (
                  <View style={secondTextWrapper}>
                    <Text
                      onPress={() => {
                        requestTodeleteAccount(userData._id);
                      }}
                      style={secondTextII}>
                      탈퇴하기
                    </Text>
                  </View>
                )}

                {isLogin && (
                  <View style={buttonWrapper}>
                    <Button
                      title="logout"
                      onPress={() => handleLogout()}
                      color={COLOR.compGreen}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// return (
//   <View style={parentContainer}>
//     <Header headerContent={headerContent} />
//     <ScrollView>
//       <View style={innerContainer}>
//         <View style={firstContainer}>
//           <View style={globalStyle.mainContainerWrapper}>
//             <View style={textWrapper}>
//               <Text style={companyText}>CAMPING GREEN</Text>
//             </View>
//             <View style={textWrapperII}>
//               <View style={textWrapperIV}>
//                 {!isLogin ? (
//                   <TouchableOpacity
//                     onPress={() => {
//                       navigateTo('LoginScreen');
//                     }}>
//                     <Text style={companyText}>Login</Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <Text style={companyText}>
//                     {`${userName.toUpperCase()} 님` || '김그린 님'}
//                   </Text>
//                 )}
//               </View>
//               <View style={textWrapperIII}>
//                 <Text style={[statusText, greyColor]}>최근주문</Text>
//                 <Text style={statusText}>0건 입금대기</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//         <View style={secondParentWrapper}>
//           <View style={secondContainer}>
//             <View style={globalStyle.mainContainerWrapper}>
//               <View style={secondTextWrapper}>
//                 <Text style={secondText}>나의 쇼핑정보</Text>
//               </View>
//               <View style={secondTextWrapper}>
//                 <Text style={secondTextII}>캠핑장 예약내역 조회</Text>
//               </View>
//               <View style={secondTextWrapper}>
//                 <Text style={secondTextII}>캠핑용품 대여내역 조회</Text>
//               </View>
//             </View>
//           </View>
//           <View style={secondContainer}>
//             <View style={globalStyle.mainContainerWrapper}>
//               <View style={secondTextWrapper}>
//                 <Text style={secondText}>고객센터</Text>
//               </View>
//               <View style={secondTextWrapper}>
//                 <Text style={secondTextII}>상담원 연결</Text>
//               </View>
//               <View style={secondTextWrapper}>
//                 <Text style={secondTextII}>카카오톡 채널로 연결</Text>
//               </View>
//               {isLogin && (
//                 <View style={buttonWrapper}>
//                   <Button
//                     title="logout"
//                     onPress={() => handleLogout()}
//                     color={COLOR.compGreen}
//                   />
//                 </View>
//               )}
//             </View>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   </View>
// );

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: COLOR.white,
  },
  firstContainer: {
    height: heightPercentageToDP('30%'),
    backgroundColor: COLOR.black,
  },
  textWrapper: {
    marginTop: heightPercentageToDP('10%'),
  },
  companyText: {
    color: COLOR.compGreen,
    fontSize: FONTSIZE.xlll,
    fontWeight: '900',
  },
  textWrapperII: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightPercentageToDP('5%'),
  },
  textWrapperIII: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  textWrapperIV: {
    width: widthPercentageToDP('50%'),
  },
  statusText: {
    fontSize: FONTSIZE.l,
    color: COLOR.compGreen,
    fontWeight: '800',
    paddingHorizontal: widthPercentageToDP('2%'),
  },
  greyColor: {
    color: COLOR.grey,
  },
  secondContainer: {
    backgroundColor: COLOR.white,
    paddingVertical: heightPercentageToDP('4%'),
  },
  secondTextWrapper: {
    marginTop: heightPercentageToDP('4%'),
  },
  secondText: {
    fontSize: FONTSIZE.xlll,
    fontWeight: '900',
    color: '#454C53',
  },
  secondTextII: {
    fontSize: FONTSIZE.xl,
    fontWeight: '500',
    color: '#454C53',
  },
  secondParentWrapper: {
    height: '100%',
  },
  innerContainer: {
    height: heightPercentageToDP('100%'),
    marginBottom: 70,
  },
  buttonWrapper: {
    marginVertical: heightPercentageToDP('5%'),
  },
});
