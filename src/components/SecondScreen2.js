import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React from 'react';

const SecondScreen2 = ({t1, t2, t3}) => {
  return (
    <View style={styles.container}>
      <Text style={{width: wp('30%'), textAlign: 'center'}}>{t1}</Text>
      <Text style={{width: wp('30%'), textAlign: 'center'}}>{t2}</Text>
      <Text style={{width: wp('30%'), textAlign: 'center'}}>{t3}</Text>
    </View>
  );
};

export default SecondScreen2;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#EFF0F2',
    paddingVertical: hp('2%'),
  },
});
