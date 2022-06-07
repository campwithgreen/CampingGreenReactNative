import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Header from '../layout/Header';
import { goBack, navigateTo } from '../navigation/utils/RootNavigation';

const headerContent = {
  leftItemContents: {
    type: "text",
    content: "CAMPING GREEEN",
  },
  rightItemContents: {
    type: "image",
    content: require("../assets/images/cart.png"),
    navigateScreen: "LoginScreen"
  },
}


export const HomeScreen = props => {
  const { container } = styles;
  return (
    <View style={container}>
      <Header headerContent={headerContent} />
      <TouchableOpacity
        onPress={() => {
          navigateTo('HomeScreenDetail1');
        }}>
        <View>
          <ImageBackground
            source={require('../assets/images/homepage1.png')}
            style={styles.backgroundImage}>
            <View>
              <Text
                style={{
                  paddingRight: 96,
                  paddingBottom: 16,
                  fontSize: 24,
                  fontWeight: 'bold',
                }}>
                나만 알고싶은{'\n'}힙한 캠핑장 지금 공개
              </Text>
            </View>
            <View>
              <Text style={{ paddingRight: 92, fontSize: 14, fontWeight: '300' }}>
                바퀴달린집 출연 캠핑장 최대 할인가로{'\n'}떠나보면 어때요?
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  backgroundImage: {
    display: 'flex',
    height: 352,
    paddingLeft: 60,
    paddingTop: 72,
  },
});
