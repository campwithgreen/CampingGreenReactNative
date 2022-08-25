import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React from 'react';
import { navigateTo } from '../navigation/utils/RootNavigation';
import { cancelOrder } from '../apis/cart';
import { showDefaultErrorAlert } from '../global/global';
import { getAllOrders, updateOrderStatus } from '../apis/admin';
import { useDispatch } from 'react-redux';
import { setUserCartHistory } from '../redux/actions/common';

const ThirdScreen3 = (props) => {


  const dispatch = useDispatch();
  const { currentCartData, isOrder, orderStatus } = props;

  const handleCancelOrder = async (orderId) => {
    console.log("CANCELLING", orderId);

    await cancelOrder(orderId).then((res) => {
      console.log("CANCEL RES", res);
      if (res) {
        navigateTo('RoomReservationListScreen');
      }
    }).catch((err) => {
      console.log("err", err);
      showDefaultErrorAlert();
    });

  };

  const handleOrderStatus = async (orderStatus) => {
    let query = {
      "status": orderStatus
    };
    await updateOrderStatus(query, currentCartData?._id).then(async (res) => {
      if (res) {
        console.log("UPDATE RES", res);
        await getAllOrders().then((r) => {
          dispatch(setUserCartHistory(r?.data?.data));
        });
        ToastAndroid.showWithGravity("Status Successfully Updated", ToastAndroid.LONG, ToastAndroid.TOP);
      }
    }).catch((err) => {
      showDefaultErrorAlert();
    });
  };

  return (
    <View style={styles.view1}>
      {!isOrder ? <TouchableOpacity
        onPress={() => {
          handleCancelOrder(currentCartData?._id);
        }}>
        <Text style={styles.btn1}> 예약취소</Text>
      </TouchableOpacity> : <View></View>}
      <TouchableOpacity
        onPress={() => {
          if (isOrder) {
            handleOrderStatus(orderStatus);
            console.log(orderStatus);
          } else {
            navigateTo('RoomReservationListScreen');
          }
        }}>
        <Text style={styles.btn2}>주문목록</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThirdScreen3;

const styles = StyleSheet.create({
  view1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    marginVertical: hp('8%'),
  },
  btn1: {
    backgroundColor: '#9EA4AA',
    width: wp('42%'),
    textAlign: 'center',
    paddingVertical: hp('1.5%'),
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 10,
    color: 'white',
  },
  btn2: {
    color: '#56C596',
    borderWidth: 3,
    borderColor: '#56C596',
    width: wp('42%'),
    textAlign: 'center',
    paddingVertical: hp('1.5%'),
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 10,
  },
});
