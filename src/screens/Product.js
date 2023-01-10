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
import {useDispatch, useSelector} from 'react-redux';
import {getAllProducts} from '../apis/product';
import {setProductData} from '../redux/actions/product';
import {showDefaultErrorAlert} from '../global/global';
import Loader from '../components/common/Loader';
import FONTSIZE from '../constants/fontSize';
import globalStyle from '../global/globalStyle';
import COLOR from '../constants/colors';
import {navigateTo} from '../navigation/utils/RootNavigation';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-simple-toast';

export const Product = props => {
  const {container, ddCont} = styles;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const st = useSelector(st => st);
  const product = useSelector(st => st.product?.product);
  const isLogin = useSelector(st => st.oauth.isLogin);
  // console.log('STORE', st);

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
          Toast.showWithGravity(
            'Pls Login to View Cart',
            Toast.LONG,
            Toast.TOP,
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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('all');

  const [items, setItems] = useState([
    {label: '전체', value: 'all'},
    {label: '캠핑 세트', value: '캠핑 세트'},
    {label: '텐트', value: '텐트'},
    {label: '타프', value: '타프'},
    {label: '매트', value: '매트'},
    {label: '침낭', value: '침낭'},
    {label: '코펠', value: '코펠'},
    {label: '버너', value: '버너'},
    {label: '취사', value: '취사'},
    {label: '테이블/체어', value: '테이블'},
    {label: '감성소품', value: '감성소품'},
  ]);

  const filterData = async filterValue => {
    let data = (data = {type: 'PRODUCT'});
    console.log('filterdata', filterValue);
    if (filterValue !== 'all') {
      data = {type: 'PRODUCT', filter: filterValue};
    }

    setLoading(true);
    await getAllProducts(data)
      .then(res => {
        if (res) {
          console.log('hello item', res.data.data);
          // if (res.data.data?.length >= 1) {
          dispatch(setProductData(res.data.data));
          // }
          setLoading(false);
        }
      })
      .catch(err => {
        if (err) {
          showDefaultErrorAlert();
          setLoading(false);
        }
      });
  };

  const handleFilter = value => {
    setValue(value);

    filterData(value);
  };

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
            <View style={ddCont}>
              <Text
                style={{
                  fontSize: FONTSIZE.xl,
                  fontWeight: 'bold',
                }}>
                전체 {product?.length}
              </Text>
              <View>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  containerStyle={{
                    width: wp('35%'),
                    zIndex: Platform.OS === 'android' ? 10000 : 90000,
                  }}
                  onChangeValue={value => {
                    handleFilter(value);
                  }}
                />
              </View>
            </View>
          )}
          {loading ? <Loader /> : <ProductDetail product={product} />}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: COLOR.white},
  ddCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: Platform.OS === 'android' ? 10000 : 90000,
  },
});
