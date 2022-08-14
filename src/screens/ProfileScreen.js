import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  ToastAndroid,
} from 'react-native';
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

export const ProfileScreen = props => {
  const st = useSelector(st => st);
  // console.log('STORE', st);

  const dispatch = useDispatch();

  const isLogin = useSelector(st => st?.oauth?.isLogin);
  const userName = useSelector(st => st?.oauth?.user_data?.data?.firstName);

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

  const handleLogout = () => {
    dispatch(logout());
    ToastAndroid.showWithGravity(
      'Logged Out Successfully',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
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

  return (
    <View style={parentContainer}>
      <Header headerContent={headerContent} />
      <ScrollView>
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
                        navigateTo('RoomReservationListScreen');
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
                      navigateTo('RoomReservationListScreen');
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
                      navigateTo('RoomReservationListScreen');
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
                  <Text style={secondTextII}>상담원 연결</Text>
                </View>
                <View style={secondTextWrapper}>
                  <Text style={secondTextII}>카카오톡 채널로 연결</Text>
                </View>
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
