import React, {useEffect, useState} from 'react';
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
import {RFPercentage} from 'react-native-responsive-fontsize';
import Carousel from '../components/Carousel';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProducts} from '../apis/product';
import {setProductData} from '../redux/actions/product';
import {showDefaultErrorAlert} from '../global/global';
import Loader from '../components/common/Loader';
import FONTSIZE from '../constants/fontSize';
import globalStyle from '../global/globalStyle';
import COLOR from '../constants/colors';
import {navigateTo} from '../navigation/utils/RootNavigation';

export const Product = props => {
  const {container} = styles;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const st = useSelector(st => st);
  const product = useSelector(st => st.product?.product);
  const isLogin = useSelector(st => st.oauth.isLogin);
  console.log('STORE', st);

  const headerContent = {
    leftItemContents: {
      type: 'text',
      content: 'CAMPING GREEEN',
      navigateScreen: 'HomeScreenDetail1',
    },
    rightItemContents: {
      type: 'cart',
      content: require('../assets/images/cart.png'),
      navigateScreen: () => {
        if (!isLogin) {
          ToastAndroid.showWithGravity(
            'Pls Login to View Cart',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        } else {
          navigateTo('ProductShoppingBagScreen');
        }
      },
    },
  };

  useEffect(() => {
    (async function getAllProductsData() {
      let data = {type: 'PRODUCT'};
      setLoading(true);
      await getAllProducts(data)
        .then(res => {
          if (res) {
            console.log('product', res);
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
    <View style={container}>
      <Header headerContent={headerContent} />
      <ScrollView>
        <View
          style={[
            globalStyle.mainContainerWrapper,
            {marginVertical: hp('4%')},
          ]}>
          {!loading && (
            <Text
              style={{
                fontSize: FONTSIZE.xl,
                fontWeight: 'bold',
              }}>
              전체 {product?.length}
            </Text>
          )}
          {loading ? <Loader /> : <ProductDetail product={product} />}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: COLOR.white},
});
