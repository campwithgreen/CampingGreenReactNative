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
    content: '캠핑장 수정하기',
    navigateScreen: 'RoomScreen',
  },
};

const headerContent2 = {
  middleItemContents: {
    type: 'text',
    content: '객실 추가하기',
    navigateScreen: 'RoomScreen',
  },
};

const ThirteenScreen = () => {
  const [count, setCount] = useState(0);
  const decrement = () => {
    if (count > 0) {
      setCount(i => i - 1);
    }
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        paddingBottom: wp('24%'),
      }}>
      <Header headerContent={headerContent} />
      <Text style={{borderBottomWidth: 2, borderBottomColor: '#F8F8F8'}}></Text>
      <ScrollView>
        <Comp1 t1="캠핑장명" />
        <Comp1 t1="전화번호" />
        <View style={styles.view1}>
          <Text style={styles.text1}>위치</Text>
          <View
            style={{display: 'flex', flexDirection: 'row', width: wp('70%')}}>
            <TextInput style={[styles.textinput1, {width: wp('25%')}]} />
            <Text
              style={{
                borderWidth: 1,
                borderColor: 'lightgrey',
                textAlign: 'center',
                textAlignVertical: 'center',
                marginLeft: wp('2%'),
                paddingHorizontal: wp('4%'),
                backgroundColor: '#F8F8F8',
                fontWeight: 'bold',
                color: '#C1C1C1',
              }}>
              우편번호
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            paddingHorizontal: wp('5%'),
            paddingVertical: hp('1%'),
          }}>
          <TextInput style={[styles.textinput1, {width: wp('33%')}]} />
          <TextInput
            style={[
              styles.textinput1,
              {width: wp('33%'), marginRight: wp('4%')},
            ]}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp('5%'),
            paddingTop: hp('4%'),
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
          }}>
          <ImageComp />
          <WithoutImageComp />
          <WithoutImageComp />
        </View>
        <Text
          style={[
            styles.text1,
            {
              paddingHorizontal: wp('5%'),
              paddingTop: hp('4%'),
            },
          ]}>
          상세설명
        </Text>
        <Comp4 hText="캠핑장 소개" pHolder="캠핑장 소개를 작성해주세요." />
        <Comp4 hText="이용시설 안내" pHolder="이용시설 안내를 작성해주세요." />
        <Comp4 hText="이용 안내" pHolder="이용 안내를 작성해주세요." />
        <Header headerContent={headerContent2} />
        <View
          style={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            marginHorizontal: wp('5%'),
            paddingTop: wp('10%'),
            borderRadius: 10,
            paddingBottom: wp('6%'),
            marginBottom: wp('4%'),
          }}>
          <Text style={{position: 'absolute', right: wp('5%'), top: wp('3%')}}>
            삭제
          </Text>
          <Comp5 t1="상품명" />
          <Comp5 t1="가격" />
          <View style={styles.view1}>
            <Text style={styles.text1}>잔여수량</Text>
            <View style={{width: wp('60%')}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity>
                  <Text
                    style={[styles.text2, {height: 35}]}
                    onPress={decrement}>
                    -
                  </Text>
                </TouchableOpacity>

                <Text style={[styles.text2, styles.text1, {height: 35}]}>
                  {count}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={[styles.text2, {height: 35}]}
                    onPress={() => setCount(i => i + 1)}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={[styles.text1, {paddingHorizontal: wp('5%')}]}>
            기본정보
          </Text>
          <Text
            style={{
              paddingHorizontal: wp('5%'),
              fontSize: 12,
              paddingTop: wp('4%'),
              fontWeight: 'bold',
              paddingBottom: wp('2%'),
            }}>
            카테고리
          </Text>
          <Comp6 placeholder1="Ex) 인원" placeholder2="2-3인" text="삭제" />
          <Comp6 placeholder1="Ex) 차량" placeholder2="기본 1대" text="삭제" />
          <Comp7 t1="카테고리 추가하기" />
          <Comp4 hText="추가옵션" pHolder="추가옵션을 작성해주세요." />
          <Text
            style={[
              styles.text1,
              {
                paddingHorizontal: wp('5%'),
                paddingTop: wp('7%'),
                paddingBottom: wp('2%'),
              },
            ]}>
            사진 업로드
          </Text>
          <ImageComp8 />
          <TextInput
            style={{
              backgroundColor: '#F8F8F8',
              height: 35,
              textAlignVertical: 'top',
              paddingLeft: wp('3%'),
              marginTop: wp('3%'),
              marginHorizontal: wp('5%'),
            }}
            placeholder="설명 추가 …"
          />
          <Comp7 t1="사진 추가하기" />
        </View>
        <Comp7 t1="객실 추가" />
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
      <Text
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 7,
          paddingVertical: 2,
          textAlign: 'center',
          textAlignVertical: 'center',
          color: 'black',
          position: 'absolute',
          left: 0,
          top: 0,
        }}>
        1
      </Text>
      <Text
        style={{
          color: 'white',
          transform: [{rotate: '45deg'}],
          fontSize: 24,
          position: 'absolute',
          right: 5,
          top: -8,
        }}>
        +
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
      <Text
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 7,
          paddingVertical: 2,
          textAlign: 'center',
          textAlignVertical: 'center',
          color: 'white',
          position: 'absolute',
          left: 0,
          top: 0,
        }}>
        1
      </Text>
    </View>
  );
};

const Comp4 = ({hText, pHolder}) => {
  return (
    <View style={{paddingHorizontal: wp('5%')}}>
      <Text
        style={[
          styles.text1,
          {fontSize: 14, fontWeight: '600', paddingVertical: wp('2%')},
        ]}>
        {hText}
      </Text>
      <TextInput
        style={{
          borderRightWidth: 1,
          borderColor: 'grey',
          backgroundColor: '#F8F8F8',
          height: 80,
          textAlignVertical: 'top',
          paddingLeft: wp('3%'),
        }}
        numberOfLines={10}
        multiline={true}
        placeholder={pHolder}
      />
    </View>
  );
};

const Comp5 = ({t1}) => {
  return (
    <View style={styles.view1}>
      <Text style={styles.text1}>{t1}</Text>
      <TextInput style={[styles.textinput1, {width: wp('60%')}]} />
    </View>
  );
};

const Comp6 = ({placeholder1, placeholder2, text}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: wp('5%'),
        alignItems: 'center',
        marginVertical: wp('2%'),
      }}>
      <TextInput
        style={[
          styles.textinput1,
          {
            width: wp('20%'),
            marginRight: wp('3%'),
            backgroundColor: '#F8F8F8',
            paddingLeft: wp('3%'),
          },
        ]}
        placeholder={placeholder1}
      />
      <TextInput
        style={[
          styles.textinput1,
          {
            width: wp('46%'),
            marginRight: wp('3%'),
            backgroundColor: '#F8F8F8',
            paddingLeft: wp('3%'),
          },
        ]}
        placeholder={placeholder2}
      />
      <Text>{text}</Text>
    </View>
  );
};

const Comp7 = ({t1}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp('1%'),
        paddingBottom: wp('5%'),
      }}>
      <Text
        style={{
          backgroundColor: 'lightgrey',
          borderRadius: 50,
          color: 'white',
          fontSize: 24,
          fontWeight: 'bold',
          paddingHorizontal: wp('2.6%'),
          textAlign: 'center',
          textAlignVertical: 'center',
          marginRight: wp('4%'),
        }}>
        +
      </Text>
      <Text>{t1}</Text>
    </View>
  );
};

const ImageComp8 = () => {
  return (
    <ImageBackground
      source={require('../assets/images/jorgen.jpg')}
      style={{
        height: 96,
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginHorizontal: wp('5%'),
      }}>
      <Text
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 7,
          paddingVertical: 2,
          textAlign: 'center',
          textAlignVertical: 'center',
          color: 'black',
          position: 'absolute',
          left: 0,
          top: 0,
        }}>
        1
      </Text>
      <Text
        style={{
          color: 'white',
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
          height: 96,
          width: wp('80%'),
          textAlign: 'center',
          textAlignVertical: 'center',
          color: 'white',
        }}>
        사진 업로드하기
      </Text>
    </ImageBackground>
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

export default ThirteenScreen;

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
    color: 'black',
    fontSize: 16,
    textAlignVertical: 'center',
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
    height: 35,
  },
  btn: {
    backgroundColor: '#E5E5E5',
    position: 'absolute',
    bottom: 15,
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
