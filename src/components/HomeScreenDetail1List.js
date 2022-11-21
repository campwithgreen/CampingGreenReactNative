import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';

export default function HomeScreenDetail1List(props) {
  const {HomeScreenDetail1Data} = props;
  const {container} = styles;
  return (
    <View style={container}>
      <View>
        <Text
          style={{
            color: '#1B1D1F',
            fontSize: RFPercentage(2.5),
            paddingLeft: wp('5%'),
            paddingBottom: hp('1.5%'),
          }}>
          {HomeScreenDetail1Data.heading}
        </Text>
      </View>
      <View>
        <ImageBackground
          source={HomeScreenDetail1Data.image}
          style={{height: hp('28%')}}
        />
      </View>
      <View>
        <Text
          style={{
            color: '#454C53',
            fontSize: RFPercentage(2),
            paddingLeft: wp('5%'),
            paddingRight: wp('10%'),
            paddingTop: hp('3%'),
            paddingBottom: hp('4.5%'),
          }}>
          {HomeScreenDetail1Data.content}
        </Text>
      </View>
      <View
        style={{
          paddingLeft: wp('5%'),
          paddingBottom: hp('1%'),
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image source={require('../assets/images/loc.png')} />
        <Text
          style={{
            color: '#9EA4AA',
            fontSize: RFPercentage(2),
            paddingLeft: wp('5%'),
            paddingRight: wp('5%'),
          }}>
          {HomeScreenDetail1Data.location}
        </Text>
        <Image source={require('../assets/images/icon_location.png')} />
      </View>
      <View
        style={{
          paddingLeft: wp('5%'),
          paddingBottom: hp('5%'),
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image source={require('../assets/images/number.png')} />
        <Text
          style={{
            color: '#9EA4AA',
            fontSize: RFPercentage(2),
            paddingLeft: wp('5%'),
            paddingRight: wp('5%'),
          }}>
          {HomeScreenDetail1Data.number}
        </Text>
        <Image source={require('../assets/images/icon_phone.png')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
