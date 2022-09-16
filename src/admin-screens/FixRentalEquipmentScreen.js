import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Button,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import React from 'react';
import { useState } from 'react';
import { goBack } from '../navigation/utils/RootNavigation';
import Header from '../layout/Header';
import FONTSIZE from '../constants/fontSize';
import COLOR from '../constants/colors';

const FixRentalEquipmentScreen = (props) => {

  let { product } = props?.route?.params;
  const [selectedProduct, setSelectedProduct] = useState(product);

  console.log("THE PRODUCT", product);
  console.log("THE SELECTED PRODUCT ====>", selectedProduct);

  const headerContent = {
    leftItemContents: {
      type: 'image',
      content: require('../assets/images/arrow-left.png'),
      navigateScreen: () => goBack(),
    },
    middleItemContents: {
      type: "text",
      content: "용품대여 수정하기"
    }
  };

  const [count, setCount] = useState(selectedProduct?.stock);
  const decrement = () => {
    if (count > 0) {
      setCount(i => i - 1);
    } else {
      ToastAndroid.showWithGravity("Stock unit cannot be lower than 0", ToastAndroid.LONG, ToastAndroid.TOP);
    }
  };
  return (
    <View style={{ backgroundColor: 'white' }}>
      <Header headerContent={headerContent} />
      <ScrollView >
        <Comp1 isProductName={true} selectedProduct={selectedProduct} setSelectedProduct={selectedProduct} />
        <Comp1 isPrice={true} selectedProduct={selectedProduct} setSelectedProduct={selectedProduct} />
        <View style={styles.view1}>
          <Text style={styles.text1}>잔여수량</Text>
          <View style={{ width: wp('70%') }}>
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
            fontSize: FONTSIZE.m
          }}>
          카테고리
        </Text>
        {Object?.keys(selectedProduct?.specifications)?.map((key) => {
          return <Comp2 p1="Ex) 색상" p2="코랄" t1="삭제" att={key} attValue={selectedProduct?.specifications[key]} />;
        })}
        <Comp3 t1="카테고리 추가하기" selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
        <Text
          style={[
            styles.text1,
            {
              paddingHorizontal: wp('5%'),
              paddingTop: hp('4%'),
              paddingBottom: hp('1%'),
            },
          ]}>
          사진 업로드
        </Text>
        {/* image upload */}
        {selectedProduct?.carousel.map((image, index) => {
          return <View style={{ marginVertical: hp("2%") }}>
            <ImageBackground
              source={{ uri: image }}
              style={{
                height: hp("30%"),
                width: wp('90%'),
                borderWidth: 1,
                borderColor: 'lightgrey',
                marginHorizontal: wp('5%'),
              }}
              resizeMode="stretch"
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 7,
                    paddingVertical: 2,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: 'black',
                  }}>
                  {index + 1}
                </Text>
              </View>
              {/* <Text
                style={{
                  color: 'white',
                  transform: [{ rotate: '45deg' }],
                  fontSize: 40,
                  position: 'absolute',
                  right: 5,
                  top: -12,
                }}>
                +
              </Text> */}
              {/* <Text
                style={{
                  position: 'absolute',
                  left: '50%',
                  color: 'white',
                  transform: [{ translateX: -50 }, { translateY: 53 }],
                }}>
                설명 추가 …
              </Text> */}
            </ImageBackground>
            {/* <TextInput
              placeholder="설명 추가 …"
              style={{
                backgroundColor: '#F8F8F8',
                fontWeight: '600',
                marginHorizontal: wp('5%'),
                paddingLeft: wp('4%'),
                marginTop: hp('3%'),
              }}
            /> */}
          </View>;

        })}
        <View style={{ paddingBottom: hp('20%') }}>
          <Comp3 t1="사진 추가하기" addImage={true} />
          <View style={{ marginTop: hp("10%"), marginHorizontal: wp("2%") }}>
            <Button title='NEXT' color={COLOR.lgrey} ></Button>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btn}>
        <TouchableOpacity>
          <Text style={styles.btnText}>수정 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Comp1 = ({ isPrice, isProductName, selectedProduct, setSelectedProduct }) => {
  return (
    <View style={styles.view1}>
      <Text style={styles.text1}>{isPrice ? "가격" : "상품명"}</Text>
      <TextInput
        keyboardType={isPrice ? "number-pad" : "email-address"}
        style={styles.textinput1}
        defaultValue={isPrice ? selectedProduct?.price?.toString() : selectedProduct?.title}
      />
    </View>
  );
};
const Comp2 = ({ p1, p2, t1, att, attValue }) => {
  return (
    <View style={[styles.view1, { paddingBottom: 0, paddingTop: hp('0.1%') }]}>
      <TextInput
        style={{
          backgroundColor: '#F8F8F8',
          width: wp('23%'),
          height: '80%',
          paddingLeft: wp('3%'),
          fontWeight: '600',
        }}
        placeholder={p1}
        defaultValue={att}
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
        defaultValue={attValue}
      />
      <Text style={{ fontWeight: '600' }}>{t1}</Text>
    </View>
  );
};
const Comp3 = ({ t1, selectedProduct, setSelectedProduct, addImage }) => {

  const handleAddNewSpecifications = () => {

    let newSelectedProduct = { ...selectedProduct };
    //Adding New Text Field for  adding new specification
    newSelectedProduct.specifications = { ...newSelectedProduct?.specifications, "": "" };
    setSelectedProduct(newSelectedProduct);

  };


  const handleAddImage = () => {
    console.log("ADDING AND PICKING IMAGES");
  };


  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp('1%'),
      }}>
      <TouchableOpacity onPress={() => {
        if (addImage) {
          handleAddImage();
        } else {
          handleAddNewSpecifications();
        }
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
      </TouchableOpacity>
      <Text>{t1}</Text>
    </View>
  );
};
export default FixRentalEquipmentScreen;

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
