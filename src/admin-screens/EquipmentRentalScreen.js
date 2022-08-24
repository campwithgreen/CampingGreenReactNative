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
import Header from '../layout/Header';
import { getAllProducts } from '../apis/product';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductData } from '../redux/actions/product';
import { showDefaultErrorAlert } from '../global/global';
import Loader from '../components/common/Loader';
import CheckBox from '@react-native-community/checkbox';
import FONTSIZE from '../constants/fontSize';
import COLOR from '../constants/colors';

const data = [
  {
    id: '1',
    img: require('../assets/images/tambu.png'),
    hText: '코베아 텐트',
    mText: '가격',
    bText1: '300,000 ',
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

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const product = useSelector(st => st.product?.product);


  console.log("STORE P", product);

  useEffect(() => {
    (async function getAllProductsData() {
      let data = { type: 'PRODUCT' };
      setLoading(true);
      await getAllProducts(data)
        .then(res => {
          if (res) {
            console.log('product ===>', res);
            dispatch(setProductData(res.data.data));
            setLoading(false);
          }
        })
        .catch(err => {
          if (err) {
            showDefaultErrorAlert();
            setLoading(false);
          }
        });
    })();
  }, []);



  return (
    <View style={{ backgroundColor: COLOR.white, minHeight: hp("100%") }}>
      <Header headerContent={headerContent} />
      <Text style={{ borderBottomWidth: 2, borderBottomColor: '#F8F8F8' }}></Text>
      {loading ? <Loader /> :
        <ScrollView style={{ marginBottom: hp("20%") }}>
          <View style={styles.view1}>
            <Text style={styles.text1}>- 삭제하기</Text>
            <Text style={styles.text1}>+ 용품 올리기</Text>
          </View>
          {product && product?.length >= 1 ? product.map((item, i) => (
            <Comp1 item={item} key={i} />
          )) : <View>
            <Text style={{ textAlign: "center" }}>No Product Available</Text>
          </View>}
        </ScrollView>}
    </View>
  );
};

const Comp1 = ({ item }) => {

  const [isSelected, setIsSelected] = useState(false);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: wp('5%'),
        backgroundColor: '#F8F8F8',
        marginBottom: hp('3%'),
      }}>
      <ImageBackground
        source={{
          uri: item?.carousel[0]
        }}
        resizeMode="stretch"
        style={{ width: wp("33%"), height: hp("15%") }}
      >
        <CheckBox
          value={isSelected}
          onValueChange={(value) => {
            setIsSelected(value);
          }}
          style={{ padding: 0, margin: 0, backgroundColor: COLOR.white }}
        />
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
          <Text style={{ color: '#222222', fontWeight: 'bold', fontSize: FONTSIZE.xl, maxWidth: wp("40%") }}>
            {item?.title}
          </Text>
          <Image source={require('../assets/images/pencil.png')} />
        </View>
        <Text style={{ fontWeight: '600', fontSize: FONTSIZE.l }}>가격</Text>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: FONTSIZE.l }}>
              {item?.price} 원
            </Text>
            <Text style={{ fontWeight: '600', fontSize: FONTSIZE.l }}>남은 수량 총 {item?.stock}개</Text>
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
    fontSize: FONTSIZE.xll,
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
