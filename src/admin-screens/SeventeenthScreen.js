import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
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

const headerContent = {
  middleItemContents: {
    type: 'text',
    content: '결제승인',
    navigateScreen: 'RoomScreen',
  },
};

const data = [
  {
    h1: '김그린 회원',
    text11: '예약번호',
    text12: '10101010101',
    text21: '회원코드',
    text22: '2022-2202',
    text31: '예약 캠핑장',
    text32: '2인 캠핑 패키지 코베마 외 1 건',
  },
  {
    h1: '김그린 회원',
    text11: '예약번호',
    text12: '10101010101',
    text21: '회원코드',
    text22: '2022-2202',
    text31: '예약 캠핑장',
    text32: '2인 캠핑 패키지 코베마 외 1 건',
  },
];

const SeventeenthScreen = () => {
  return (
    <View style={{backgroundColor: '#fff', paddingBottom: hp('25%')}}>
      <Header headerContent={headerContent} />
      <Text style={{borderBottomWidth: 2, borderBottomColor: '#F8F8F8'}}></Text>
      <ScrollView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp('5%'),
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: wp('5%'),
            }}>
            <Text style={{fontWeight: 'bold'}}>캠핑장</Text>
            <Text
              style={{
                paddingLeft: wp('4%'),
                fontWeight: 'bold',
                color: 'black',
              }}>
              캠핑용품
            </Text>
          </View>
          <View></View>
        </View>
        <Text style={styles.dateWithBoldLine}>2022.05.26</Text>
        {data.map((ele, i) => (
          <Comp1 item={ele} key={i} />
        ))}
        <Text style={styles.dateWithBoldLine}>2022.05.25</Text>
        {data.map((ele, i) => (
          <Comp1 flag={true} item={ele} key={i} />
        ))}
        <Text style={{paddingBottom: hp('10%')}}></Text>
      </ScrollView>
      <Comp2 />
    </View>
  );
};

const Comp1 = ({flag, item}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp('5%'),
        borderWidth: 2,
        borderColor: flag ? '#4AAC82' : 'lightgrey',
        backgroundColor: flag ? '#4AAC82' : '#fff',
        paddingHorizontal: wp('3%'),
        paddingVertical: wp('2%'),
        marginTop: hp('3%'),
      }}>
      <View style={{display: 'flex'}}>
        <Text style={[styles.text1]}>{item.h1}</Text>
        <Text></Text>
        <Text></Text>
      </View>
      <View style={{display: 'flex', justifyContent: 'space-between'}}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={[styles.text3]}>{item.text11} : </Text>
          <Text style={[styles.text2]}>{item.text12}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Text style={[styles.text3]}>{item.text21} : </Text>
          <Text style={[styles.text2]}>{item.text22}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={[styles.text3]}>{item.text31} : </Text>
          <Text style={[styles.text2]}>{item.text32}</Text>
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

export default SeventeenthScreen;

const styles = StyleSheet.create({
  dateWithBoldLine: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    marginHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('1%'),
    borderBottomWidth: 4,
    borderBottomColor: 'black',
  },
  text1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  text2: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  text3: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  comp2View: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: wp('5%'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    marginBottom: hp('10%'),
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
