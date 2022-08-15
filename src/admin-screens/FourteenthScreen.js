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
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import React from 'react';
import {useState} from 'react';
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
const FourteenthScreen = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        paddingBottom: hp('15%'),
      }}>
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
      <Comp2 />
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

const Comp2 = () => {
  const [btn, setBtn] = useState({
    btn1: false,
    btn2: false,
    btn3: true,
    btn4: false,
  });
  const fun = btn => {
    if (btn == 1) {
      setBtn({btn1: true, btn2: false, btn3: false, btn4: false});
    } else if (btn == 2) {
      setBtn({btn1: false, btn2: true, btn3: false, btn4: false});
    } else if (btn == 3) {
      setBtn({btn1: false, btn2: false, btn3: true, btn4: false});
    } else {
      setBtn({btn1: false, btn2: false, btn3: false, btn4: true});
    }
  };
  return (
    <View style={styles.comp2View}>
      <TouchableOpacity>
        <Text
          style={btn.btn1 ? styles.btntxt2 : styles.btntxt1}
          onPress={() => fun(1)}>
          용품대여
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={btn.btn2 ? styles.btntxt2 : styles.btntxt1}
          onPress={() => fun(2)}>
          캠핑장 예약
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={btn.btn3 ? styles.btntxt2 : styles.btntxt1}
          onPress={() => fun(3)}>
          결제승인
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={btn.btn4 ? styles.btntxt2 : styles.btntxt1}
          onPress={() => fun(4)}>
          회원관리
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FourteenthScreen;

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
  comp2View: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: wp('5%'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: hp('15%'),
    paddingTop: wp('5%'),
  },
  btntxt1: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  btntxt2: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
});
