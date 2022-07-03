import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React from 'react';
import Header from '../layout/Header';
const headerContent = {
  middleItemContents: {
    type: 'text',
    content: '주문/결제',
    navigateScreen: 'HomeScreenDetail1',
  },
  leftItemContents: {
    type: 'image',
    content: require('../assets/images/icon_cancel.png'),
    navigateScreen: 'LoginScreen',
  },
};

const data = [
  {
    id: '1',
    date: '2022.05.26',
    text: '총 수량 1',
    btnText: '총총수량',
    arrowText: '수량총총',
    items: [
      {
        img: require('../assets/images/tambu.png'),
        text1: '홍천 보리울 캠핑장',
        text2: '예약번호',
        text3: 'ORD20220718-203094',
        text4: '05.06(화) - 05.06(화) 1박 2일',
        text5: '체크인 15:00 | 체크아웃 11:00',
      },
      {
        img: require('../assets/images/tambu.png'),
        text1: '홍천 보리울 캠핑장',
        text2: '예약번호',
        text3: 'ORD20220718-203094',
        text4: '05.06(화) - 05.06(화) 1박 2일',
        text5: '체크인 15:00 | 체크아웃 11:00',
      },
    ],
  },
  {
    id: '2',
    date: '2021.01.06',
    text: '총 수량 2',
    btnText: '총총수량',
    arrowText: '수량총총',
    items: [
      {
        img: require('../assets/images/tambu.png'),
        text1: '홍천 보리울 캠핑장',
        text2: '예약번호',
        text3: 'ORD20220718-203094',
        text4: '05.06(화) - 05.06(화) 1박 2일',
        text5: '체크인 15:00 | 체크아웃 11:00',
      },
    ],
  },
];

const RoomReservationListScreen = () => {
  return (
    <View style={{backgroundColor: 'white'}}>
      {/* <Header headerContent={headerContent} /> */}
      <Text
        style={{borderBottomWidth: 1.5, borderBottomColor: 'lightgrey'}}></Text>
      <ScrollView>
        {data.map((ele, i) => {
          return (
            <View>
              <Comp1 date={ele.date} text={ele.text} key={i} />
              <Comp2
                btnText={ele.btnText}
                arrowText={ele.arrowText}
                key={ele.id}
              />
              {ele.items.map((item, j) => {
                return (
                  <Comp3
                    img={item.img}
                    text1={item.text1}
                    text2={item.text2}
                    text3={item.text3}
                    text4={item.text4}
                    text5={item.text5}
                    key={data.length + j}
                  />
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const Comp1 = ({date, text}) => {
  return (
    <View
      style={[
        styles.compView,
        {
          borderBottomWidth: 6,
          borderBottomColor: 'black',
          paddingBottom: wp('2%'),
          marginBottom: hp('4%'),
          marginTop: hp('5%'),
        },
      ]}>
      <Text style={styles.comp1Text1}>{date}</Text>
      <Text style={styles.comp1Text2}>{text}</Text>
    </View>
  );
};

const Comp2 = ({btnText, arrowText}) => {
  return (
    <View style={[styles.compView, {paddingBottom: hp('3%')}]}>
      <Text style={styles.comp2Text1}>{btnText}</Text>
      <Text style={styles.comp2Text2}>{arrowText} ></Text>
    </View>
  );
};

export default RoomReservationListScreen;

const styles = StyleSheet.create({
  compView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp('5%'),
  },
  comp1Text1: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  comp1Text2: {
    fontWeight: 'bold',
    color: '#1B1D1F',
  },
  comp2Text1: {
    fontWeight: 'bold',
    color: 'red',
    borderWidth: 1,
    borderColor: 'red',
    paddingHorizontal: wp('2%'),
    paddingVertical: wp('1%'),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  comp2Text2: {
    fontWeight: 'bold',
    color: 'green',
  },
  comp3View: {
    marginHorizontal: wp('5%'),
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
    paddingBottom: hp('3.5%'),
    marginBottom: hp('3.5%'),
  },
  comp3Img: {
    height: 100,
    width: 100,
    marginRight: wp('5%'),
  },
  comp3Text1: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  comp3Text2: {
    fontWeight: 'bold',
    color: 'lightgrey',
  },
});

const Comp3 = ({img, text1, text2, text3, text4, text5}) => {
  return (
    <View style={styles.comp3View}>
      <Image source={img} style={styles.comp3Img} />
      <View style={{display: 'flex', justifyContent: 'space-between'}}>
        <Text style={styles.comp3Text1}>{text1}</Text>
        <Text>
          <Text style={{fontWeight: 'bold'}}>{text2} </Text>{' '}
          <Text style={styles.comp3Text1}> {text3}</Text>
        </Text>
        <View>
          <Text style={[styles.comp3Text2, {paddingBottom: hp('0.5%')}]}>
            {text4}
          </Text>
          <Text style={styles.comp3Text2}>{text5}</Text>
        </View>
      </View>
    </View>
  );
};
