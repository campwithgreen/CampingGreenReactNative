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
import React, { useEffect } from 'react';
import { useState } from 'react';
import Header from '../layout/Header';
import { getAllUsers } from '../apis/admin';
import { showDefaultErrorAlert } from '../global/global';

const headerContent = {
  middleItemContents: {
    type: 'text',
    content: '용품 올리기',
    navigateScreen: 'RoomScreen',
  },
};

const data = [
  {
    h1: '김그린 회원',
    text11: '회원코드',
    text12: '2022-2202',
    text21: '전화번호',
    text22: '010101001101',
    text31: '구매내역',
    text32: '별빛 캠핑장 외 1 건',
  },
  {
    h1: '김그린 회원',
    text11: '회원코드',
    text12: '2022-2202',
    text21: '전화번호',
    text22: '010101001101',
    text31: '구매내역',
    text32: '별빛 캠핑장 외 1 건',
  },
  {
    h1: '김그린 회원',
    text11: '회원코드',
    text12: '2022-2202',
    text21: '전화번호',
    text22: '010101001101',
    text31: '구매내역',
    text32: '별빛 캠핑장 외 1 건',
  },
  {
    h1: '김그린 회원',
    text11: '회원코드',
    text12: '2022-2202',
    text21: '전화번호',
    text22: '010101001101',
    text31: '구매내역',
    text32: '별빛 캠핑장 외 1 건',
  },
  {
    h1: '김그린 회원',
    text11: '회원코드',
    text12: '2022-2202',
    text21: '전화번호',
    text22: '010101001101',
    text31: '구매내역',
    text32: '별빛 캠핑장 외 1 건',
  },
  {
    h1: '김그린 회원',
    text11: '회원코드',
    text12: '2022-2202',
    text21: '전화번호',
    text22: '010101001101',
    text31: '구매내역',
    text32: '별빛 캠핑장 외 1 건',
  },
  {
    h1: '김그린 회원',
    text11: '회원코드',
    text12: '2022-2202',
    text21: '전화번호',
    text22: '010101001101',
    text31: '구매내역',
    text32: '별빛 캠핑장 외 1 건',
  },
  {
    h1: '김그린 회원',
    text11: '회원코드',
    text12: '2022-2202',
    text21: '전화번호',
    text22: '010101001101',
    text31: '구매내역',
    text32: '별빛 캠핑장 외 1 건',
  },
];

const NineteenthScreen = () => {

  const getUsers = async () => {
    await getAllUsers().then((res) => {
      if (res) {
        console.log("USERS", res);
      }
    }).catch((err) => {
      console.log("ERR", err);
      showDefaultErrorAlert();
    });
  };

  useEffect(() => {
    getUsers();
  }, []);



  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingBottom: hp('17%'),
        height: '100%',
      }}>
      <Header headerContent={headerContent} />
      <Text style={{ borderBottomWidth: 2, borderBottomColor: '#F8F8F8' }}></Text>
      <ScrollView>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'grey',
            paddingHorizontal: wp('5%'),
            marginHorizontal: wp('5%'),
            marginVertical: wp('5%'),
            height: 40,
          }}
        />
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
            <Text style={{ fontWeight: 'bold' }}>
              최신순
            </Text>
            {/* <Text
              style={{
                paddingLeft: wp('4%'),
                fontWeight: 'bold',
                color: 'black',
              }}>
              오래된순
            </Text> */}
          </View>
          <View></View>
        </View>
        {data.map((ele, i) => (
          <Comp1 item={ele} key={i} />
        ))}
      </ScrollView>
      {/* <Comp2 /> */}
    </View>
  );
};

const Comp1 = ({ flag, item }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: wp('5%'),
        borderWidth: 2,
        borderColor: flag ? '#4AAC82' : 'lightgrey',
        backgroundColor: flag ? '#4AAC82' : 'white',
        paddingHorizontal: wp('3%'),
        paddingVertical: wp('2%'),
        marginTop: hp('3%'),
      }}>
      <View style={{ display: 'flex' }}>
        <Text style={[styles.text1, { color: flag ? 'white' : 'black' }]}>
          {item.h1}
        </Text>
        <Text></Text>
        <Text></Text>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: wp('5%'),
        }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={[styles.text3, { color: flag ? 'lightgrey' : '' }]}>
            {item.text11} :{' '}
          </Text>
          <Text style={[styles.text2, { color: flag ? 'white' : 'black' }]}>
            {item.text12}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Text style={[styles.text3, { color: flag ? 'lightgrey' : '' }]}>
            {item.text21} :{' '}
          </Text>
          <Text style={[styles.text2, { color: flag ? 'white' : 'black' }]}>
            {item.text22}
          </Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={[styles.text3, { color: flag ? 'lightgrey' : '' }]}>
            {item.text31} :{' '}
          </Text>
          <Text style={[styles.text2, { color: flag ? 'white' : 'black' }]}>
            {item.text32}
          </Text>
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
      setBtn({ btn1: true, btn2: false, btn3: false, btn4: false });
    } else if (btn == 2) {
      setBtn({ btn1: false, btn2: true, btn3: false, btn4: false });
    } else if (btn == 3) {
      setBtn({ btn1: false, btn2: false, btn3: true, btn4: false });
    } else {
      setBtn({ btn1: false, btn2: false, btn3: false, btn4: true });
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

export default NineteenthScreen;

const styles = StyleSheet.create({
  text1: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  text3: {
    fontSize: 10,
    fontWeight: 'bold',
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
