import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React from 'react';
import moment from 'moment';
import {useSelector} from 'react-redux';

const ThirdScreen1 = props => {
  const {currentCartData} = props;
  const user_name = useSelector(st => st.oauth?.user_data?.data?.firstName);
  console.log('currentCartData', currentCartData);
  return (
    <View style={styles.view1}>
      <Text
        style={{
          fontWeight: 'bold',
          color: '#FFFFFF',
          fontSize: 18,
          textAlign: 'center',
          marginTop: hp('3%'),
          marginBottom: hp('1%'),
        }}>
        주문이 완료되었습니다.
      </Text>
      <Text
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'row',
          textAlign: 'center',
          marginBottom: hp('5%'),
        }}>
        <Text style={[styles.text2]}>주문번호 </Text>
        <Text style={[styles.text2, {color: '#56C596'}]}>
          {currentCartData._id}
        </Text>
      </Text>
      {currentCartData?.items.map(item => {
        return (
          <View key={item._id}>
            <View style={styles.view2}>
              <Text style={styles.text2}>예약자</Text>
              <Text style={styles.text2}>총계</Text>
              <Text style={styles.text2}>예약기간</Text>
            </View>
            <View style={styles.view2}>
              <Text style={[styles.text2, {color: '#E8EBED'}]}>
                {user_name || currentCartData?.shipping_data?.name}
              </Text>
              <Text style={[styles.text2, {color: '#E8EBED'}]}>
                {item.units * item?.itemId?.price}
              </Text>
              <Text style={[styles.text2, {color: '#E8EBED'}]}>
                {moment(item.startDate).utc().format('MM.DD')} -{' '}
                {moment(item.endDate).utc().format('MM.DD')}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ThirdScreen1;

const styles = StyleSheet.create({
  view1: {
    backgroundColor: '#26282B',
    paddingVertical: hp('5%'),
    width: '100%',
  },
  view2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('5%'),
    paddingBottom: hp('1%'),
  },
  text2: {
    fontWeight: '600',
    color: '#9EA4AA',
    width: wp('30%'),
    textAlign: 'center',
  },
});
