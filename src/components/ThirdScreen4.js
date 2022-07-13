import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';

const ThirdScreen4 = (props) => {
  const { itemData } = props;
  const data = itemData?.itemId;
  return (
    <View
      style={{
        marginHorizontal: wp('5%'),
        borderBottomWidth: 2,
        borderBottomColor: '#EFF0F2',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginVertical: hp('3%'),
        }}>
        <Image
          source={{ uri: data.carousel[0] }}
          style={{ marginRight: wp('5%'), height: 100, width: 100 }}
        />
        <View style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text
            style={{ paddingRight: '5%', color: '#222222', fontWeight: 'bold' }}>
            {data.title}
          </Text>
          <View>
            <Text style={{ fontWeight: 'bold', paddingBottom: hp('0.5%') }}>
              {data.price * itemData.units}원
            </Text>
            <Text style={{ fontWeight: 'bold' }}>수량 {itemData.units}개</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ThirdScreen4;
