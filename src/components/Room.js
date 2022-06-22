import {StyleSheet, Text, View, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React from 'react';
const Room = ({item}) => {
  return (
    <View
      //   elevation={1}
      style={{
        marginHorizontal: wp('5%'),
        marginVertical: hp('2%'),
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'lightgrey',
      }}>
      <View style={styles.view1}>
        <Text style={styles.button1}>{item.btn1}</Text>
        <Text style={styles.button1}>{item.btn2}</Text>
        <Text style={styles.button1}>{item.btn3}</Text>
      </View>
      <Image
        source={item.img}
        style={{
          width: wp('90%'),
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          height: 210,
        }}
      />
      <Text
        style={[styles.text1, {paddingTop: hp('3%'), paddingLeft: wp('5%')}]}>
        {item.heading}
      </Text>
      <Text
        style={[styles.text2, {paddingTop: hp('1%'), paddingLeft: wp('5%')}]}>
        {item.subheading}
      </Text>
      <View style={styles.view2}>
        <Text>
          <Text style={[styles.text1, {fontSize: 20}]}>{item.price}</Text>
          <Text style={{fontSize: 12, fontWeight: '600'}}>{item.currency}</Text>
        </Text>
        <Text
          style={[
            styles.text2,
            {color: '#55C595', textAlignVertical: 'bottom'},
          ]}>
          {item.greenText}
        </Text>
      </View>
    </View>
  );
};

export default Room;
const styles = StyleSheet.create({
  view1: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 22,
    top: 20,
    left: wp('5%'),
  },
  view2: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingRight: wp('35%'),
    paddingLeft: wp('5%'),
    marginTop: hp('3%'),
    marginBottom: hp('2.5%'),
  },
  text1: {
    fontWeight: '900',
    fontSize: 16,
    color: 'black',
  },
  text2: {fontWeight: '600'},
  button1: {
    backgroundColor: 'grey',
    color: 'white',
    marginRight: wp('5%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: 3,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
