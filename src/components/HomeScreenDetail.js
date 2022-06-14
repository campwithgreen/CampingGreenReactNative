import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {navigateTo} from '../navigation/utils/RootNavigation';

export default function HomeScreenDetail(props) {
  const {HomeScreenDetailData} = props;
  const {container} = styles;
  return (
    <View style={container}>
      <ImageBackground
        source={HomeScreenDetailData.image}
        style={{
          minHeight: hp('27.6%'),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            paddingLeft: wp('5%'),
          }}>
          <View>
            <Text
              style={{
                color: '#E8EBED',
                fontSize: RFPercentage(2),
                paddingTop: hp('2%'),
              }}>
              {HomeScreenDetailData.heading}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: RFPercentage(3.2),
                paddingTop: hp('1.5%'),
                paddingBottom: hp('1.5%'),
              }}>
              {HomeScreenDetailData.heading2}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: RFPercentage(2),
              }}>
              {HomeScreenDetailData.heading3}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: wp('5%'),
            paddingBottom: hp('1%')
          }}>
          <Text
            style={{
              color: '#F7F8F9',
              fontSize: RFPercentage(1.8),
              paddingLeft: wp('5%'),
              paddingRight: wp('1%'),
            }}>
            {HomeScreenDetailData.heading4}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigateTo('HomeScreenDetail1', {
                imageId: HomeScreenDetailData.id,
              });
            }}>
            <Image source={require('../assets/images/icon_movepage.png')} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: wp('5%'),
    overflow: 'hidden',
    marginVertical: hp('1.5%'),
  },
});
