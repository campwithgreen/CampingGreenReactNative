import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import React, { useState, useEffect } from 'react';
import Header from '../layout/Header';
import FONTSIZE from '../constants/fontSize';
import COLOR from '../constants/colors';
import { getAllOrders } from '../apis/admin';
import { showDefaultErrorAlert } from '../global/global';
import { connect, useDispatch } from 'react-redux';
import { setUserCartHistory } from '../redux/actions/common';
import Loader from '../components/common/Loader';
import moment from 'moment';
import { setCurrentCheckoutCartDetails } from '../redux/actions/common';
import { navigateTo } from '../navigation/utils/RootNavigation';
import { ORDER_STATUS } from "../utils/constants.json";

const headerContent = {
  middleItemContents: {
    type: 'text',
    content: '결제승인',
  },
};


const mapStateToProps = ((sto, ownProps) => {
  const st = sto;
  const cart_history = sto?.common?.cart_history;
  return {
    st,
    cart_history
  };
});

const SixteenScreen = (props) => {

  let { st, cart_history } = props;
  const dispatch = useDispatch();
  const [orderType, setOrderType] = useState("PRODUCT");
  const [loading, setLoading] = useState(false);


  cart_history = cart_history?.filter((item) => item.paymentStatus !== "CHECKOUT_PENDING");

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



  useEffect(() => {

    (async function handleGetAllOrders() {
      setLoading(true);
      await getAllOrders().then((res) => {
        dispatch(setUserCartHistory(res.data.data));
        setLoading(false);
      }).catch((err) => {
        console.log("ERR", err);
        showDefaultErrorAlert();
        setLoading(true);
      });
    })();

  }, []);


  return (
    <View style={{ backgroundColor: COLOR.white, minHeight: hp("100%") }}>
      <Header headerContent={headerContent} />
      <Text style={{ borderBottomWidth: 2, borderBottomColor: '#F8F8F8' }}></Text>
      {loading ? <Loader /> :
        <ScrollView>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: wp('5%'),
            }}>
            {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: wp('5%'),
            }}>
            <TouchableOpacity onPress={() => { setOrderType("LOCATION"); }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: orderType === "LOCATION" ? COLOR.black : COLOR.lgrey
                }}>
                캠핑장
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setOrderType("PRODUCT"); }}>
              <Text
                style={{
                  paddingLeft: wp('4%'),
                  fontWeight: 'bold',
                  color: orderType === "PRODUCT" ? COLOR.black : COLOR.lgrey
                }}>
                캠핑용품
              </Text>
            </TouchableOpacity>
          </View>
          <View></View> */}
          </View>
          <View style={{ marginBottom: hp("30%") }}>
            {(result && Object.keys(result)?.length >= 1) ? Object.keys(result)?.map((key) => {
              return <View >
                <Text style={styles.dateWithBoldLine}>{key?.split('_')[0]}</Text>
                {result[key]?.map((item) => {
                  console.log("THE ITEM", item, key);
                  return <Comp1 flag={item.paymentStatus === "PAYMENT_DONE"} item={item} key={item?._id} />;
                })}
              </View>;
            }) : <View><Text> NO ORDERS</Text></View>}
          </View>
        </ScrollView>}
    </View>
  );
};

const Comp1 = ({ flag, item }) => {
  const dispatch = useDispatch();
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp('5%'),
        borderWidth: 2,
        borderColor: flag ? '#4AAC82' : 'lightgrey',
        backgroundColor: flag ? '#4AAC82' : 'white',
        paddingHorizontal: wp('3%'),
        paddingVertical: wp('2%'),
        marginTop: hp('3%'),
        minHeight: hp("12%")
      }}>
      <View style={{ display: 'flex', width: wp("20%") }}>
        <Text style={[styles.text1, { color: flag ? 'white' : 'black' }]}>
          {item?.userId?.firstName}
        </Text>
        <Text></Text>
        <Text></Text>
      </View>
      <View style={{ display: 'flex', justifyContent: 'space-between' }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={[styles.text3, { color: flag ? 'lightgrey' : '' }]}>
            예약번호 :{' '}
          </Text>
          <Text style={[styles.text2, { color: flag ? 'white' : 'black' }]}>
            {item?._id}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Text style={[styles.text3, { color: flag ? 'lightgrey' : '' }]}>
            회원코드 :{' '}
          </Text>
          <Text style={[styles.text2, { color: flag ? 'white' : 'black' }]}>
            {moment(item?.userId?.createdAt).format("YYYY.MM.DD")}
          </Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={[styles.text3, { color: flag ? 'lightgrey' : '' }]}>
            예약 캠핑장 :{' '}
          </Text>
          <Text style={[styles.text2, { color: flag ? 'white' : 'black' }]}>
            {item?.items[0]?.itemId?.title.length > 19 ? item?.items[0]?.itemId?.title.substring(0, 19) + '...' : item?.items[0]?.itemId?.title}
          </Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={[styles.text3, { color: flag ? 'lightgrey' : '' }]}>
            지불 상태 :{' '}
          </Text>
          <Text style={[styles.text2, { color: flag ? 'white' : 'black' }]}>
            {ORDER_STATUS[item?.paymentStatus]}
          </Text>
        </View>
      </View>
      <View style={{ display: "flex", alignSelf: "center" }}>
        <TouchableOpacity onPress={() => {
          dispatch(setCurrentCheckoutCartDetails(item));
          navigateTo('OrderDetailsScreen');
        }}>
          <Image source={require('../assets/images/icon_movepage.png')} style={{ height: hp("7%"), width: wp("7%") }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const Comp2 = () => {
//   const [btn, setBtn] = useState({
//     btn1: false,
//     btn2: false,
//     btn3: true,
//     btn4: false,
//   });
//   const fun = btn => {
//     if (btn == 1) {
//       setBtn({ btn1: true, btn2: false, btn3: false, btn4: false });
//     } else if (btn == 2) {
//       setBtn({ btn1: false, btn2: true, btn3: false, btn4: false });
//     } else if (btn == 3) {
//       setBtn({ btn1: false, btn2: false, btn3: true, btn4: false });
//     } else {
//       setBtn({ btn1: false, btn2: false, btn3: false, btn4: true });
//     }
//   };
//   return (
//     <View style={styles.comp2View}>
//       <TouchableOpacity>
//         <Text
//           style={btn.btn1 ? styles.btntxt2 : styles.btntxt1}
//           onPress={() => fun(1)}>
//           용품대여
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <Text
//           style={btn.btn2 ? styles.btntxt2 : styles.btntxt1}
//           onPress={() => fun(2)}>
//           캠핑장 예약
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <Text
//           style={btn.btn3 ? styles.btntxt2 : styles.btntxt1}
//           onPress={() => fun(3)}>
//           결제승인
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <Text
//           style={btn.btn4 ? styles.btntxt2 : styles.btntxt1}
//           onPress={() => fun(4)}>
//           회원관리
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

export default connect(mapStateToProps, null)(SixteenScreen);

const styles = StyleSheet.create({
  dateWithBoldLine: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    marginHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('1%'),
    borderBottomWidth: 4,
    borderBottomColor: 'black',
  },
  text1: {
    fontSize: FONTSIZE.m,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: FONTSIZE.sm,
    fontWeight: 'bold',
  },
  text3: {
    fontSize: FONTSIZE.sm,
    fontWeight: 'bold',
  },
  comp2View: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: wp('5%'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    marginBottom: hp('10%'),
    width: '100%',
    height: hp('15%'),
    paddingTop: wp('5%'),
  },
  btntxt1: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  btntxt2: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
});
