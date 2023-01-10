import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, {useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import ThirdScreen1 from '../components/ThirdScreen1';
import ThirdScreen2 from '../components/ThirdScreen2';
import ThirdScreen3 from '../components/ThirdScreen3';
import Header from '../layout/Header';
import ThirdScreen5 from '../components/ThirdScreen5';
import SecondScreen1 from '../components/SecondScreen1';
import ThirdScreen4 from '../components/ThirdScreen4';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
const headerContent = {
  leftItemContents: {
    type: 'image',
    content: require('../assets/images/icon_cancel.png'),
    navigateScreen: 'Heart',
  }, //put flag here
  rightItemContents: {
    type: 'image',
    content: require('../assets/images/cart.png'),
    navigateScreen: 'ProductShoppingBagScreen',
  },
};
import {getUserCartHistory} from '../apis/cart';
import {setUserCartHistory} from '../redux/actions/common';
import {showDefaultErrorAlert} from '../global/global';
import {ORDER_STATUS} from '../utils/constants.json';
import FONTSIZE from '../constants/fontSize';

export default function ThirdScreen() {
  const dispatch = useDispatch();
  const current_cart_details = useSelector(
    st => st.common.current_cart_details,
  );
  console.log('hello current_cart_details', current_cart_details.itemId);
  useEffect(() => {
    return () => {
      (async function getCartHistory() {
        await getUserCartHistory()
          .then(res => {
            if (res) {
              // console.log('USer History', res.data);
              dispatch(setUserCartHistory(res.data.data));
            }
          })
          .catch(err => {
            if (err) {
              showDefaultErrorAlert();
            }
          });
      })();
    };
  }, []);
  // console.log('current_cart_details', current_cart_details);
  return (
    <View style={{backgroundColor: '#fff'}}>
      <ScrollView>
        <Header headerContent={headerContent} />
        <ThirdScreen1 currentCartData={current_cart_details} />
        <Text
          style={{
            fontWeight: 'bold',
            color: '#1B1D1F',
            fontSize: 18,
            marginHorizontal: wp('5%'),
            paddingTop: hp('6%'),
          }}>
          주문상품 {current_cart_details?.items.length}
        </Text>
        <View style={styles.border1}></View>
        {current_cart_details?.items.map(it => {
          return <ThirdScreen4 itemData={it} />;
        })}
        <Text
          style={{
            fontWeight: 'bold',
            color: '#1B1D1F',
            fontSize: 18,
            marginHorizontal: wp('5%'),
            paddingTop: hp('3%'),
          }}>
          결제정보
        </Text>
        <View style={styles.border1}></View>
        <View style={{paddingTop: hp('3.5%')}}>
          <SecondScreen1
            t1="결제금액"
            t2={`${current_cart_details?.totalAmount}원`}
          />
        </View>
        <View style={styles.border2}></View>
        <SecondScreen1 t1="결제방법" t2="무통장입금" />
        <View style={styles.border2}></View>
        <SecondScreen1
          t1="결제마감일"
          t2={`${moment(
            new Date(current_cart_details?.items[0]?.startDate).setDate(
              new Date(current_cart_details?.items[0]?.startDate).getDate() - 1,
            ),
          )
            .utc()
            .format('YYYY.MM.DD')} 23:59:59`}
        />
        <View style={styles.border2}></View>
        <SecondScreen1
          t1="현재상태"
          t2={ORDER_STATUS[current_cart_details?.paymentStatus]}
        />
        <Text
          style={{
            fontWeight: 'bold',
            color: '#1B1D1F',
            fontSize: 18,
            marginHorizontal: wp('5%'),
            paddingTop: hp('3%'),
          }}>
          배송정보
        </Text>
        <View style={styles.border1}></View>

        <View style={{paddingTop: hp('3.5%')}}>
          <SecondScreen1
            t1="예약자"
            t2={current_cart_details?.shipping_data?.name}
          />
        </View>
        <View style={styles.border2}></View>
        <SecondScreen1
          t1="연락처"
          t2={current_cart_details?.shipping_data?.phoneNumber}
        />
        <View style={styles.border2}></View>
        <SecondScreen1
          t1="배송지"
          t2={current_cart_details?.shipping_data?.address}
        />

        <View style={styles.border2}></View>
        <View style={styles.view1}>
          <Text style={styles.text1}>배송정보 변경은</Text>
          <Text style={[styles.text1, {color: '#56C596'}]}>
            상담센터로{'  '}
          </Text>
          <Text>&#x2192;</Text>
          <Text style={styles.text1}>{'  '}전화바랍니다.</Text>
        </View>
        <ThirdScreen3 currentCartData={current_cart_details} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  border1: {
    borderBottomWidth: 5,
    borderBottomColor: '#1B1D1F',
    marginVertical: hp('1%'),
    marginHorizontal: wp('5%'),
  },
  border2: {
    borderBottomWidth: 1.8,
    borderBottomColor: 'lightgrey',
    marginHorizontal: wp('5%'),
    marginBottom: hp('1%'),
  },
  text1: {
    fontWeight: '600',
    color: '#9EA4AA',
  },
  view1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('3%'),
  },
});
