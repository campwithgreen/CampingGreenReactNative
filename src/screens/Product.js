import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../layout/Header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ProductDetail from '../components/ProductDetail';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Carousel from '../components/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/oauth';
import { getAllProducts } from '../apis/product';
import { setProductData } from '../redux/actions/product';

const headerContent = {
  leftItemContents: {
    type: 'text',
    content: 'CAMPING GREEEN',
    navigateScreen: 'HomeScreenDetail1',
  },
  rightItemContents: {
    type: 'image',
    content: require('../assets/images/cart.png'),
    navigateScreen: 'LoginScreen',
  },
};

export const Product = props => {
  const { container } = styles;
  const dispatch = useDispatch();

  const st = useSelector((st) => st);
  console.log("STORE", st);


  useEffect(() => {
    (async function getAllProductsData() {
      await getAllProducts().then((res) => {
        console.log("PRODUCTS", res.data.data);
        if (res) {
          dispatch(setProductData(res.data.data));
        }
      });
    })();
  }, []);

  return (
    <View style={container}>
      <Header headerContent={headerContent} />
      <ScrollView>
        <View style={{ marginHorizontal: wp('5%') }}>
          <Text
            style={{
              color: '#1B1D1F',
              fontSize: RFPercentage(2.5),
              fontWeight: 'bold',
            }}>
            전체 214
          </Text>
          <ProductDetail />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: hp('10%') },
});
