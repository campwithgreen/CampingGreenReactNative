import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
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
const headerContent = {
  middleItemContents: {
    type: 'text',
    content: '주문/결제',
    navigateScreen: 'ProfileScreen',
  },
  leftItemContents: {
    type: 'image',
    content: require('../assets/images/icon_cancel.png'),
    navigateScreen: 'ProductShoppingBagScreen',
  },
};

const RoomReservationListScreen = () => {
  const cart_history = useSelector(st => st.common?.cart_history);

  let result = cart_history.reduce(function (r, a) {
    r[`${moment(a.createdAt).utc().format('MM-DD-YYYY')}_${a.paymentStatus}`] =
      r[
        `${moment(a.createdAt).utc().format('MM-DD-YYYY')}_${a.paymentStatus}`
      ] || [];
    r[
      `${moment(a.createdAt).utc().format('MM-DD-YYYY')}_${a.paymentStatus}`
    ].push(a);
    return r;
  }, Object.create(null));

  console.log('GROPUPED', result);

  return (
    <View style={{backgroundColor: 'white', height: hp('100%')}}>
      <Header headerContent={headerContent} />
      <Text style={{borderBottomWidth: 1.5, borderBottomColor: 'lightgrey'}} />
      <ScrollView style={{marginBottom: heightPercentageToDP('15%')}}>
        {Object.keys(result).map(key => {
          return (
            <View style={globalStyle.mainContainerWrapper} key={key}>
              <Comp1 date={key.split('_')[0]} total={result[key].length} />
              {result[key].map(it => {
                return (
                  <View key={it?.items[0]._id}>
                    <Comp2
                      btnText={result[key][0].paymentStatus}
                      itemData={it}
                    />
                    <Comp3 key={it?.items[0]._id} itemData={it} />
                  </View>
                );
              })}
            </View>
          );
        })}
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
          borderBottomColor: 'black',
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
      <Text style={styles.comp2Text1}>{btnText}</Text>
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
    paddingBottom: hp('3.5%'),
    marginBottom: hp('3.5%'),
    width: '100%',
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
    color: 'lightgrey',
  },
});

const Comp3 = ({itemData}) => {
  let directItem = itemData?.items[0]?.itemId;
  return (
    <View style={styles.comp3View}>
      <Image source={{uri: directItem.carousel[0]}} style={styles.comp3Img} />
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
