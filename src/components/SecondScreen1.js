import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React from 'react';

const SecondScreen1 = ({t1, t2}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text2}>{t1}</Text>
      <Text></Text>

      <Text style={styles.text3}>{t2}</Text>
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

  text2: {fontWeight: '600', color: '#454C53', paddingBottom: hp('2%')},
  text3: {width: 200, textAlign: 'right', fontWeight: '600', color: '#454C53'},
});
