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

const ThirdScreen3 = (props) => {


  const { currentCartData } = props;

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

  return (
    <View style={styles.view1}>
      <TouchableOpacity
        onPress={() => {
          handleCancelOrder(currentCartData?._id);
        }}>
        <Text style={styles.btn1}> 예약취소</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigateTo('RoomReservationListScreen');
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
