import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React from 'react';

const ThirdScreen5 = ({t1, t2}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text2}>{t1}</Text>
      <Text></Text>
      <Text style={styles.text2}>{t2}</Text>
    </View>
  );
};

export default ThirdScreen5;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('5%'),
    borderBottomWidth: 1.8,
    borderBottomColor: '#9EA4AA',
    paddingBottom: hp('1%'),
    marginBottom: hp('1%'),
  },
  text2: {fontWeight: '600', color: '#454C53'},
});
