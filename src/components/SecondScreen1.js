import { StyleSheet, Text, View, Platform } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';




const SecondScreen1 = ({ isOrder, t1, t2, setOrderStatus }) => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(t2);
  const [items, setItems] = useState([
    { label: '결제대기', value: 'PAYMENT_PENDING' },
    { label: '결제완료', value: 'PAYMENT_DONE' },
    { label: '배송준비', value: 'PAYMENT_PREPARATION' },
    { label: '배송 완료', value: 'DELIVERY_DONE' },
    { label: '이용완료', value: 'RESERVATION_COMPLETED' },
    { label: '취소완료', value: 'CANCELLED' },
  ]);

  return (
    !isOrder ?
      <View style={styles.container}>
        <Text style={styles.text2}>{t1}</Text>
        <Text></Text>
        <Text style={styles.text3}>{t2}</Text>
      </View> :
      <View style={styles.container}>
        <Text style={styles.text2}>{t1}</Text>
        <Text></Text>
        <View style={{
          width: wp("30%"),
          height: hp("5%")
        }}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            containerStyle={{
              zIndex: Platform.OS === 'android' ? 10000 : 90000,
            }}
            onChangeValue={(value) => {
              setOrderStatus(value);
            }}
          />
        </View>
      </View>
  );
};

export default SecondScreen1;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
  },

  text2: { fontWeight: '600', color: '#454C53', paddingBottom: hp('2%') },
  text3: { width: 200, textAlign: 'right', fontWeight: '600', color: '#454C53' },
});
