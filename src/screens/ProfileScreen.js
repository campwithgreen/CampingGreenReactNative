import React from 'react';
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

const headerContent = {
  leftItemContents: {
    type: 'image',
    content: require('../assets/images/arrow-left.png'),
    navigateScreen: () => goBack(),
  },
  middleItemContents: {
    type: 'text',
    content: '마이페이지',
  },
  rightItemContents: {
    type: 'image',
    content: require('../assets/images/cart.png'),
    navigateScreen: 'ReviewScreen',
  },
};

export const ProfileScreen = props => {
  const st = useSelector(st => st);
  console.log('STORE', st);

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

  const handleLogout = () => {
    dispatch(logout());
    ToastAndroid.showWithGravity(
      'Logged Out Successfully',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
  };

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
                      {`${userName.toUpperCase()} 님` || '김그린 님'}
                    </Text>
                  )}
                </View>
                <View style={textWrapperIII}>
                  <Text style={[statusText, greyColor]}>최근주문</Text>
                  <Text style={statusText}>0건 입금대기</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={secondParentWrapper}>
            <View style={secondContainer}>
              <View style={globalStyle.mainContainerWrapper}>
                <View style={secondTextWrapper}>
                  <Text style={secondText}>나의 쇼핑정보</Text>
                </View>
                <View style={secondTextWrapper}>
                  <Text style={secondTextII}>캠핑장 예약내역 조회</Text>
                </View>
                <View style={secondTextWrapper}>
                  <Text style={secondTextII}>캠핑용품 대여내역 조회</Text>
                </View>
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  textWrapperIV: {
    width: widthPercentageToDP('50%'),
  },
  statusText: {
    fontSize: FONTSIZE.xm,
    color: COLOR.compGreen,
    fontWeight: '800',
    paddingHorizontal: widthPercentageToDP('3%'),
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
  },
  secondTextII: {
    fontSize: FONTSIZE.xl,
    fontWeight: '500',
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
