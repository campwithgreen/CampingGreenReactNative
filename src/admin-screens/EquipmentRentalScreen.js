import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {iteratorSymbol} from 'immer/dist/internal';
import Header from '../layout/Header';

const data = [
  {
    id: '1',
    img: require('../assets/images/tambu.png'),
    hText: '코베아 텐트',
    mText: '가격',
    bText1: '300,000 원',
    bText2: '남은 수량 총 3개',
  },
  {
    id: '2',
    img: require('../assets/images/tambu.png'),
    hText: '코베아 텐트',
    mText: '가격',
    bText1: '300,000 원',
    bText2: '남은 수량 총 3개',
  },
  {
    id: '3',
    img: require('../assets/images/tambu.png'),
    hText: '코베아 텐트',
    mText: '가격',
    bText1: '300,000 원',
    bText2: '남은 수량 총 3개',
  },
  {
    id: '4',
    img: require('../assets/images/tambu.png'),
    hText: '코베아 텐트',
    mText: '가격',
    bText1: '300,000 원',
    bText2: '남은 수량 총 3개',
  },
  {
    id: '5',
    img: require('../assets/images/tambu.png'),
    hText: '코베아 텐트',
    mText: '가격',
    bText1: '300,000 원',
    bText2: '남은 수량 총 3개',
  },
  {
    id: '6',
    img: require('../assets/images/tambu.png'),
    hText: '코베아 텐트',
    mText: '가격',
    bText1: '300,000 원',
    bText2: '남은 수량 총 3개',
  },
];
const headerContent = {
  middleItemContents: {
    type: 'text',
    content: '용품 대여',
    navigateScreen: 'RoomScreen',
  },
};
const EquipmentRentalScreen = () => {
  return (
    <View style={{backgroundColor: 'white', paddingBottom: 130}}>
      <Header headerContent={headerContent} />
      <Text style={{borderBottomWidth: 2, borderBottomColor: '#F8F8F8'}}></Text>
      <ScrollView>
        <View style={styles.view1}>
          <Text style={styles.text1}>- 삭제하기</Text>
          <Text style={styles.text1}>+ 용품 올리기</Text>
        </View>
        {data.map((item, i) => (
          <Comp1 item={item} key={i} />
        ))}
      </ScrollView>
      <View style={styles.bottomView}>
        <Text style={{fontWeight: 'bold', color: '#222222'}}>용품대여</Text>
        <Text style={{fontWeight: '600'}}>캠핑장 예약</Text>
        <Text style={{fontWeight: '600'}}>결제승인</Text>
        <Text style={{fontWeight: '600'}}>회원관리</Text>
      </View>
    </View>
  );
};

const Comp1 = ({item}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: wp('5%'),
        backgroundColor: '#F8F8F8',
        marginBottom: hp('3%'),
      }}>
      <ImageBackground source={item.img} style={{width: 120, height: 110}}>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'grey',
            backgroundColor: 'white',
            position: 'absolute',
            top: 1,
            left: 0,
            color: 'black',
            fontWeight: 'bold',
            paddingHorizontal: wp('2%'),
            paddingVertical: wp('1%'),
          }}>
          V
        </Text>
      </ImageBackground>
      <View
        style={{
          paddingLeft: wp('5%'),
          display: 'flex',
          justifyContent: 'space-between',
          paddingVertical: hp('1%'),
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: wp('55%'),
            paddingRight: wp('4%'),
          }}>
          <Text style={{color: '#222222', fontWeight: 'bold', fontSize: 18}}>
            {item.hText}
          </Text>
          <Image source={require('../assets/images/pencil.png')} />
        </View>
        <Text style={{fontWeight: '600'}}>{item.mText}</Text>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              {item.bText1}
            </Text>
            <Text style={{fontWeight: '600'}}>{item.bText2}</Text>
            <Text></Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default EquipmentRentalScreen;

const styles = StyleSheet.create({
  view1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('3%'),
  },
  text1: {
    fontWeight: '600',
    color: 'grey',
    fontSize: 18,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#E5E5E5',
    width: wp('100%'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 130,
    paddingHorizontal: wp('4%'),
    paddingTop: hp('3%'),
  },
});
