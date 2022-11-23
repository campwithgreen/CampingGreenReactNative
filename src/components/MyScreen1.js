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

const MyScreen1 = () => {
  return (
    <View
      style={{
        marginHorizontal: wp('5%'),
        borderWidth: 1,
        borderColor: '#EFF0F2',
        marginVertical: hp('2%'),
      }}>
      <View
        style={{
          backgroundColor: '#EFF0F2',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '4%',
        }}>
        <Text style={{color: '#454C53', fontWeight: 'bold'}}>COVEMA</Text>
        <Text></Text>
        <Text style={{color: '#454C53', fontWeight: '600'}}>배송비 3000원</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: hp('3%'),
        }}>
        <Image
          source={require('../assets/images/tambu.png')}
          style={{marginLeft: wp('2%')}}
        />
        <View style={{display: 'flex', justifyContent: 'space-between'}}>
          <Text
            style={{paddingRight: '5%', color: '#222222', fontWeight: 'bold'}}>
            [COVEMA] {'\n'}2인 캠핑 패키지 코베마 수동텐트
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold', color: '#55C595'}}>65,000</Text>
            <Text style={{color: '#000'}}>1개</Text>
            <Text></Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyScreen1;
