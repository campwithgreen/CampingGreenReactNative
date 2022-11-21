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

const ForthScreen1 = () => {
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
          source={require('../assets/images/forth1.png')}
          style={{marginRight: wp('5%'), height: 100, width: 100}}
        />
        <View style={{display: 'flex', justifyContent: 'space-between'}}>
          <Text
            style={{paddingRight: '5%', color: '#222222', fontWeight: 'bold'}}>
            홍천 보리울 캠핑장
          </Text>
          <View>
            <Text style={{fontWeight: 'bold', paddingBottom: hp('0.5%')}}>
              글램핑 A
            </Text>
            <Text style={{fontWeight: 'bold', paddingBottom: hp('0.5%')}}>
              2022.07.18 (월) - 2022.07.19 (화)
            </Text>
            <Text style={{fontWeight: 'bold'}}>1박 2일</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ForthScreen1;
