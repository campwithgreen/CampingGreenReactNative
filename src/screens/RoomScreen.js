import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import SearchInput from '../components/SearchInput';
import Room from '../components/Room';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const RoomScreen = () => {
  const roomData = [
    {
      id: '1',
      btn1: '홍천',
      btn2: '보리 울캠핑장',
      btn3: '홍천',
      heading: '홍천 보리울 캠핑장',
      subheading: '경기도 과천시 과천동 과천1로 산림휴양소',
      greenText: '남은자리 23개',
      price: '77,000',
      currency: '원~',
      img: require('../assets/images/map_below_house.png'),
    },
    {
      id: '2',
      btn1: '홍천',
      btn2: '보리 울캠핑장',
      btn3: '홍천',
      heading: '홍천 보리울 캠핑장',
      subheading: '경기도 과천시 과천동 과천1로 산림휴양소',
      greenText: '남은자리 23개',
      price: '89,000',
      currency: '원~',
      img: require('../assets/images/map_below_house.png'),
    },
    {
      id: '3',
      btn1: '홍천',
      btn2: '보리 울캠핑장',
      btn3: '홍천',
      heading: '홍천 보리울 캠핑장',
      subheading: '경기도 과천시 과천동 과천1로 산림휴양소',
      greenText: '남은자리 23개',
      price: '89,000',
      currency: '원~',
      img: require('../assets/images/map_below_house.png'),
    },
    {
      id: '4',
      btn1: '홍천',
      btn2: '보리 울캠핑장',
      btn3: '홍천',
      heading: '홍천 보리울 캠핑장',
      subheading: '경기도 과천시 과천동 과천1로 산림휴양소',
      greenText: '남은자리 23개',
      price: '89,000',
      currency: '원~',
      img: require('../assets/images/map_below_house.png'),
    },
    {
      id: '5',
      btn1: '홍천',
      btn2: '보리 울캠핑장',
      btn3: '홍천',
      heading: '홍천 보리울 캠핑장',
      subheading: '경기도 과천시 과천동 과천1로 산림휴양소',
      greenText: '남은자리 23개',
      price: '89,000',
      currency: '원~',
      img: require('../assets/images/map_below_house.png'),
    },
  ];
  return (
    <View style={{backgroundColor: 'white'}}>
      <SearchInput />
      <ScrollView>
        <View style={{paddingBottom: 20}}>
          <Image
            source={require('../assets/images/map.png')}
            style={styles.img1}
          />
          <Image
            source={require('../assets/images/map_location.png')}
            style={styles.img2}
          />
        </View>
        <FlatList
          numColumns={1}
          showsHorizontalScrollIndicator={false}
          data={roomData}
          renderItem={({item}) => {
            return <Room item={item} key={item.id} />;
          }}
        />
      </ScrollView>
    </View>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  img1: {
    width: wp('100%'),
    height: hp('25%'),
  },
  img2: {
    position: 'absolute',
    bottom: 40,
    left: 170,
  },
});
