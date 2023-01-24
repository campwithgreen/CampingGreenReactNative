import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React from 'react';
import Header from '../layout/Header';
import globalStyle from '../global/globalStyle';
import FONTSIZE from '../constants/fontSize';
import COLOR from '../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {setCurrentCheckoutCartDetails} from '../redux/actions/common';
import {navigateTo} from '../navigation/utils/RootNavigation';
import {ORDER_STATUS} from '../utils/constants.json';

const RoomReservationListScreen = ({route}) => {
  let cart_history = useSelector(st => st?.common?.cart_history);
  const isLoggedIn = useSelector(st => st.oauth?.isLogin);
  //filtering not to show checkout pending items
  cart_history = cart_history?.filter(
    item => item.paymentStatus !== 'CHECKOUT_PENDING',
  );

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
  const headerContent = {
    middleItemContents: {
      type: 'text',
      content: '예약내역',
      navigateScreen: () => goBack(),
    },
    leftItemContents: {
      type: 'image',
      content: require('../assets/images/icon_cancel.png'),
      navigateScreen: 'ProfileScreen',
    },
    rightItemContents: {
      type: 'cart',
      content: require('../assets/images/cart.png'),
      navigateScreen: () => {
        if (!isLoggedIn) {
          Toast.show({
            type: 'error',
            text1: '로그인이 필요합니다.',
            visibilityTime: 2000,
          });
        } else {
          navigateTo('ProductShoppingBagScreen');
        }
      },
    },
  };
  console.log('result', result, route.params.type);
  return (
    <View style={{backgroundColor: 'white', height: hp('100%')}}>
      <Header headerContent={headerContent} />
      <Text style={{borderBottomWidth: 1.5, borderBottomColor: '#515151'}} />
      <ScrollView style={{marginBottom: heightPercentageToDP('15%')}}>
        {result && Object?.keys(result)?.length >= 1 ? (
          Object?.keys(result)?.map(key => {
            return (
              <View style={globalStyle.mainContainerWrapper} key={key}>
                {result[key]?.map(it => {
                  console.log('it', it.items[0].itemId.type);
                  return (
                    <View key={it?.items[0]._id}>
                      {route?.params?.type === it.items[0].itemId.type && (
                        <>
                          <Comp1
                            date={key.split('_')[0]}
                            total={result[key]?.length}
                          />
                          <Comp2
                            btnText={result[key][0].paymentStatus}
                            itemData={it}
                          />
                          <Comp3 key={it?.items[0]._id} itemData={it} />
                        </>
                      )}
                    </View>
                  );
                })}
              </View>
            );
          })
        ) : (
          <View style={styles.emptyCartWrapper}>
            <Text style={styles.emptyCartText}>No Orders Has Been Made</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const Comp1 = ({date, total}) => {
  return (
    <View
      style={[
        styles.compView,
        {
          borderBottomWidth: 6,
          borderBottomColor: '#000',
          paddingBottom: wp('2%'),
          marginBottom: hp('4%'),
          marginTop: hp('5%'),
        },
      ]}>
      <Text style={styles.comp1Text1}>{date}</Text>
      <Text style={styles.comp1Text2}>
        {'총 수량 '}
        {total}
      </Text>
    </View>
  );
};

const Comp2 = ({btnText, itemData}) => {
  const dispatch = useDispatch();
  return (
    <View style={[styles.compView, {paddingBottom: hp('3%')}]}>
      <Text
        style={[
          styles.comp2Text1,
          {
            borderColor:
              btnText === 'PAYMENT_DONE' ? COLOR.compGreenI : COLOR.red,
            color: btnText === 'PAYMENT_DONE' ? COLOR.compGreenI : COLOR.red,
          },
        ]}>
        {ORDER_STATUS[btnText]}
      </Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(setCurrentCheckoutCartDetails(itemData));
          navigateTo('ThirdScreen');
        }}>
        <Text style={styles.comp2Text2}>상세보기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoomReservationListScreen;

const styles = StyleSheet.create({
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
    borderWidth: 1,
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
    paddingBottom: hp('3.5%'),
    marginBottom: hp('3.5%'),
    width: '100%',
  },
  comp3Img: {
    height: 100,
    width: 100,
    marginRight: wp('5%'),
    resizeMode: 'contain',
  },
  comp3Text1: {
    fontWeight: 'bold',
    fontSize: FONTSIZE.xl,
    color: COLOR.black,
    width: wp('55%'),
  },
  comp3Text2: {
    fontWeight: 'bold',
    color: '#515151',
  },
  emptyCartWrapper: {
    minHeight: hp('30%'),
    marginVertical: hp('10%'),
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: FONTSIZE.xl,
  },
});

const Comp3 = ({itemData}) => {
  let directItem = itemData?.items[0]?.itemId;
  return (
    <View style={styles.comp3View}>
      <Image source={{uri: directItem?.carousel[0]}} style={styles.comp3Img} />
      <View style={{display: 'flex', justifyContent: 'space-between'}}>
        <Text style={styles.comp3Text1}>{directItem.title}</Text>
        {directItem.type === 'LOCATION' && (
          <Text>
            <Text style={{fontWeight: 'bold'}}>{'hello'} </Text>
            <Text style={styles.comp3Text1}>{'hello'}</Text>
          </Text>
        )}
        <View>
          <Text style={[styles.comp3Text2, {paddingBottom: hp('0.5%')}]}>
            {itemData?.items[0]?.units * directItem.price}원
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
              }>{`수량 ${itemData?.items[0]?.units}개`}</Text>
          </View>
          {/* <View>
            <View style={{ height: hp("5%"), width: wp("25%"), padding: 10, backgroundColor: COLOR.black }}>
              <Text style={{ color: COLOR.white, fontSize: FONTSIZE.l, justifyContent: "center", alignItems: "center" }}>STATUS</Text>
            </View>
          </View> */}
        </View>
      </View>
    </View>
  );
};
