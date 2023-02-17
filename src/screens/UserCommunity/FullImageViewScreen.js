import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {goBack} from '../../navigation/utils/RootNavigation';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
//이미지를 전체 스크린에 크게 보여줌
export default function FullImageViewScreen({route}) {
  console.log(route.params.data);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        // 취소버튼
        style={{
          zIndex: 9000,
          position: 'absolute',
          left: 15,
          top: 60,
          backgroundColor: '#fff',
          opacity: 0.6,
          borderRadius: 50,
        }}
        onPress={() => {
          goBack();
        }}>
        <Image
          source={require('../../assets/images/cancel.png')}
          resizeMode="cover"
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
      <Image source={{uri: route?.params?.data}} style={styles.ImageBackground}>
        {/* TODO: something goes here  */}
      </Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#000',
  },
  ImageBackground: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});
