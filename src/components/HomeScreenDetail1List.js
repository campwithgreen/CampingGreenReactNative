import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import React from 'react';

export default function HomeScreenDetail1List(props) {
  const {HomeScreenDetail1Data} = props;
  const {container} = styles;
  return (
    <View style={container}>
      <View>
        <Text
          style={{
            color: '#1B1D1F',
            fontSize: 18,
            paddingLeft: 20,
            paddingBottom: 9,
          }}>
          {HomeScreenDetail1Data.heading}
        </Text>
      </View>
      <View>
        <ImageBackground
          source={require('../assets/images/martin.png')}
          style={{height: 208}}
        />
      </View>
      <View>
        <Text
          style={{
            color: '#454C53',
            fontSize: 14,
            paddingLeft: 20,
            paddingRight: 34,
            paddingTop: 24,
            paddingBottom: 41,
          }}>
          {HomeScreenDetail1Data.content}
        </Text>
      </View>
      <View
        style={{
          paddingLeft: 20,
          paddingBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image source={require('../assets/images/loc.png')} />
        <Text
          style={{
            color: '#9EA4AA',
            fontSize: 14,
            paddingLeft: 12,
            paddingRight: 11,
          }}>
          {HomeScreenDetail1Data.location}
        </Text>
        <Image source={require('../assets/images/icon_location.png')} />
      </View>
      <View
        style={{
          paddingLeft: 20,
          paddingBottom: 40,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image source={require('../assets/images/number.png')} />
        <Text
          style={{
            color: '#9EA4AA',
            fontSize: 14,
            paddingLeft: 12,
            paddingRight: 8,
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
