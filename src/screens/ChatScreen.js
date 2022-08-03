import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../layout/Header';
import {navigateTo} from '../navigation/utils/RootNavigation';
import COLOR from '../constants/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import globalStyle from '../global/globalStyle';

const headerContent = {
  //   leftItemContents: {
  //     type: 'image',
  //     content: require('../assets/images/arrow-left.png'),
  //   },
  middleItemContents: {
    type: 'text',
    content: '커뮤니티',
  },
  rightItemContents: {
    type: 'image',
    content: require('../assets/images/cart.png'),
  },
};

export const ChatScreen = props => {
  const {container, text, wrapper} = styles;
  return (
    <View style={container}>
      <Header headerContent={headerContent} />
      <View style={[globalStyle.mainContainerWrapper, wrapper]}>
        <TouchableOpacity
          onPress={() => {
            navigateTo('Home');
          }}>
          <Text style={text}>서비스 준비중이에요</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    height: hp('100%'),
  },
  text: {
    fontSize: RFPercentage(3),
    fontWeight: '900',
  },
  wrapper: {
    marginVertical: hp('5%'),
  },
});
