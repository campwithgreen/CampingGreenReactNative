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
import {RFPercentage} from 'react-native-responsive-fontsize';

const ThirdScreen4 = () => {
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
          source={require('../assets/images/tambu.png')}
          style={{marginRight: wp('5%'), height: 100, width: 100}}
        />
        <View style={{display: 'flex', justifyContent: 'space-between'}}>
          <Text
            style={{paddingRight: '5%', color: '#222222', fontWeight: 'bold'}}>
            [COVEMA] {'\n'}2인 캠핑 패키지 코베마 수동텐트
          </Text>
          <View>
            <Text style={{fontWeight: 'bold', paddingBottom: hp('0.5%')}}>
              65,000원
            </Text>
            <Text style={{fontWeight: 'bold'}}>수량 1개</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ThirdScreen4;
