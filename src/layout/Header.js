import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image,
} from 'react-native';
import {goBack, navigateTo} from '../navigation/utils/RootNavigation';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {navigateHandler} from '../utils/global';
import COLOR from '../constants/colors';
import FONTSIZE from '../constants/fontSize';
import {connect, useDispatch} from 'react-redux';
import {setMainCartItems} from '../redux/actions/common';

const mapStateToProps = (state, ownProps) => {
  const isLogin = state?.oauth?.isLogin;
  const cartData = state?.common?.cart_history;
  const mainCartItems = state?.common?.main_cart_items;

  return {
    isLogin,
    cartData,
    mainCartItems,
  };
};

const Header = props => {
  const {initial, wrapper, headerIcon, container, headerTitle, wrapperC, span} =
    styles;
  const {mainCartItems, headerContent, isLogin, cartData} = props;

  const dispatch = useDispatch();

  // console.log('HEADER ISLOGIN', mainCartItems);

  const filterCartItems = cartData => {
    let filteredBag = cartData?.filter(
      item => item.paymentStatus === 'CHECKOUT_PENDING',
    );
    dispatch(setMainCartItems(filteredBag));
  };

  useEffect(() => {
    if (isLogin) {
      filterCartItems(cartData);
    }
  }, [cartData]);

  const renderItem = itemContents => {
    switch (itemContents.type) {
      case 'text':
        return (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigateHandler(itemContents);
              }}>
              <Text style={headerTitle}>{itemContents.content}</Text>
            </TouchableOpacity>
          </View>
        );
      case 'image':
        return (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigateHandler(itemContents);
              }}>
              <Image source={itemContents.content} style={headerIcon} />
            </TouchableOpacity>
          </View>
        );
      case 'cart':
        return isLogin ? (
          <TouchableOpacity
            onPress={() => {
              navigateHandler(itemContents);
            }}>
            <View style={wrapperC}>
              <Image source={itemContents.content} style={headerIcon} />
              {mainCartItems && mainCartItems[0]?.items.length > 0 && (
                <View style={span}>
                  <Text
                    style={{
                      fontSize: FONTSIZE.sm,
                    }}>
                    {mainCartItems && mainCartItems[0]?.items.length}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ) : (
          <View></View>
        );
      default:
        break;
    }
  };

  return (
    <SafeAreaView>
      <View style={initial}>
        <View style={wrapper}>
          <View style={container}>
            {headerContent?.leftItemContents ? (
              renderItem(headerContent.leftItemContents)
            ) : (
              <View></View>
            )}
            {headerContent?.middleItemContents ? (
              renderItem(headerContent.middleItemContents)
            ) : (
              <View></View>
            )}
            {headerContent?.rightItemContents ? (
              renderItem(headerContent.rightItemContents)
            ) : (
              <View></View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps, null)(Header);

const styles = StyleSheet.create({
  initial: {
    backgroundColor: '#fff',
  },
  wrapper: {
    height: hp('9%'),
    backgroundColor: '#ffff',
    width: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('5%'),
    alignItems: 'center',
  },
  headerIcon: {
    height: hp('4%'),
    width: hp('4%'),
  },
  headerTitle: {
    fontWeight: '900',
    fontSize: 16,
    color: 'black',
  },
  wrapperC: {
    position: 'relative',
  },
  span: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: COLOR.red,
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
