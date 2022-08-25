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
import { setLocationData } from '../redux/actions/product';
import { showDefaultErrorAlert } from '../global/global';
import Loader from '../components/common/Loader';
import CheckBox from '@react-native-community/checkbox';
import FONTSIZE from '../constants/fontSize';
import COLOR from '../constants/colors';


const headerContent = {
  middleItemContents: {
    type: 'text',
    content: '캠핑장 예약',
  },
};

const LocationRentalSceen = () => {

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useSelector(st => st.product?.location);

  useEffect(() => {
    (async function getAllProductsData() {
      let data = { type: 'LOCATION' };
      setLoading(true);
      await getAllProducts(data)
        .then(res => {
          if (res) {
            console.log('location ===>', res);
            dispatch(setLocationData(res.data.data));
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
        <ScrollView style={{ marginBottom: hp("15%") }}>
          <View style={styles.view1}>
            <Text style={styles.text1}>- 삭제하기</Text>
            <Text style={styles.text1}>+ 용품 올리기</Text>
          </View>
          {location && location?.length >= 1 ? location.map((item, i) => (
            <Comp1 item={item} key={i} />
          )) : <View>
            <Text style={{ textAlign: "center" }}>No Camps Available</Text>
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
        <View>
          <Text style={{ fontWeight: '600', maxWidth: wp("45%"), fontSize: FONTSIZE.l }}>위치  {item?.description}</Text>
        </View>
        <View>
          <Text style={{ fontWeight: '600', fontSize: FONTSIZE.l }}>위치  {item?.phone}</Text>
        </View>
      </View>
    </View>
  );
};
export default LocationRentalSceen;

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
