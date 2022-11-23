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
  leftItemContents: {
    type: 'image',
    content: require('../assets/images/arrow-left.png'),
    navigateScreen: () => goBack(),
  },
  middleItemContents: {
    type: 'text',
    content: '용품 올리기',
    navigateScreen: 'RoomScreen',
  },
};
const EighthScreen = () => {
  const [count, setCount] = useState(0);
  const decrement = () => {
    if (count > 0) {
      setCount(i => i - 1);
    }
  };
  return (
    <View style={{backgroundColor: '#fff', paddingBottom: hp('15%')}}>
      <Header headerContent={headerContent} />
      <Text style={{borderBottomWidth: 2, borderBottomColor: '#F8F8F8'}}></Text>
      <ScrollView>
        <Comp1 t1="상품명" />
        <Comp1 t1="가격" />
        <View style={styles.view1}>
          <Text style={styles.text1}>잔여수량</Text>
          <View style={{width: wp('70%')}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <TouchableOpacity>
                <Text style={styles.text2} onPress={decrement}>
                  -
                </Text>
              </TouchableOpacity>

              <Text style={[styles.text2, styles.text1]}>{count}</Text>
              <TouchableOpacity>
                <Text style={styles.text2} onPress={() => setCount(i => i + 1)}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text
          style={[
            styles.text1,
            {
              paddingTop: hp('4%'),
              paddingHorizontal: wp('5%'),
              paddingBottom: hp('1%'),
            },
          ]}>
          상세설명
        </Text>
        <Text
          style={{
            paddingHorizontal: wp('5%'),
            fontWeight: '600',
            paddingVertical: hp('0.7%'),
          }}>
          카테고리
        </Text>
        <Comp2 p1="Ex) 색상" p2="코랄" t1="삭제" />
        <Comp2 p1="Ex) 사이즈" p2="XL" t1="삭제" />
        <Comp3 t1="카테고리 추가하기" />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp('5%'),
          }}>
          <Text style={styles.text1}>사진 업로드</Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 14,
                marginRight: wp('3%'),
                fontWeight: 'bold',
              }}>
              +
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              사진 추가하기
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp('5%'),
            paddingTop: wp('1%'),
            paddingBottom: hp('25%'),
          }}>
          <ImageComp />
          <ImageComp />
          <WithoutImageComp />
        </View>
      </ScrollView>
      <Button text="수정 완료" />
    </View>
  );
};

const Comp1 = ({t1}) => {
  return (
    <View style={styles.view1}>
      <Text style={styles.text1}>{t1}</Text>
      <TextInput style={styles.textinput1} />
    </View>
  );
};
const Comp2 = ({p1, p2, t1}) => {
  return (
    <View style={[styles.view1, {paddingBottom: 0, paddingTop: hp('0.1%')}]}>
      <TextInput
        style={{
          backgroundColor: '#F8F8F8',
          width: wp('23%'),
          height: '80%',
          paddingLeft: wp('3%'),
          fontWeight: '600',
        }}
        placeholder={p1}
      />
      <TextInput
        style={{
          backgroundColor: '#F8F8F8',
          width: wp('55%'),
          height: '80%',
          paddingLeft: wp('3%'),
          fontWeight: '600',
        }}
        placeholder={p2}
      />
      <Text style={{fontWeight: '600'}}>{t1}</Text>
    </View>
  );
};
const Comp3 = ({t1}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp('1%'),
      }}>
      <Text
        style={{
          backgroundColor: 'lightgrey',
          borderRadius: 50,
          color: '#fff',
          fontSize: 24,
          fontWeight: 'bold',
          paddingHorizontal: wp('2.6%'),
          textAlign: 'center',
          textAlignVertical: 'center',
          marginRight: wp('4%'),
        }}>
        +
      </Text>
      <Text style={{color: '#000'}}>{t1}</Text>
    </View>
  );
};

const ImageComp = () => {
  return (
    <ImageBackground
      source={require('../assets/images/jorgen.jpg')}
      style={{
        height: 106,
        width: 106,
        borderWidth: 1,
        borderColor: 'lightgrey',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 7,
            paddingVertical: 2,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: '#000',
          }}>
          1
        </Text>
        <Text></Text>
      </View>
      <Text
        style={{
          color: '#fff',
          transform: [{rotate: '45deg'}],
          fontSize: 24,
          position: 'absolute',
          right: 5,
          top: -8,
        }}>
        +
      </Text>
      <Text
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          color: '#fff',
          transform: [{translateX: -30}, {translateY: -10}],
        }}>
        사진 업로드
      </Text>
    </ImageBackground>
  );
};

const WithoutImageComp = () => {
  return (
    <View
      style={{
        height: 106,
        width: 106,
        backgroundColor: '#E5E5E5',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 7,
            paddingVertical: 2,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: '#fff',
          }}>
          1
        </Text>
        <Text></Text>
      </View>
    </View>
  );
};

const Button = ({text}) => {
  return (
    <View style={styles.btn}>
      <TouchableOpacity>
        <Text style={styles.btnText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EighthScreen;

const styles = StyleSheet.create({
  view1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
  },
  text1: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  text2: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('0.7%'),
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textinput1: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    width: wp('70%'),
    height: '80%',
  },
  btn: {
    backgroundColor: '#E5E5E5',
    position: 'absolute',
    bottom: 0,
    zIndex: 22,
    paddingVertical: hp('2%'),
    width: wp('90%'),
    marginHorizontal: wp('5%'),
  },
  btnText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000000',
  },
});
