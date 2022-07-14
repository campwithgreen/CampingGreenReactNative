import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, {useState, useEffect} from 'react';
import Header from '../layout/Header';
import ProductShoppingBag from '../components/ProductShoppingBag';
import SecondScreen1 from '../components/SecondScreen1';
import CustomButton from '../components/common/CustomButton';
import {getUserCartHistory} from '../apis/cart';
import {useSelector, useDispatch} from 'react-redux';
import {setUserCartHistory} from '../redux/actions/common';
import moment from 'moment';
import COLOR from '../constants/colors';
import Loader from '../components/common/Loader';

const ProductShoppingBagScreen = () => {
  const dispatch = useDispatch();

  const isLogin = useSelector(st => st?.oauth?.isLogin);
  const cart_history = useSelector(st => st.common?.cart_history);
  const [loading, setLoading] = useState(false);

  const headerContent = {
    middleItemContents: {
      type: 'text',
      content: '주문/결제',
      navigateScreen: 'HomeScreenDetail1',
    },
    leftItemContents: {
      type: 'image',
      content: require('../assets/images/icon_cancel.png'),
      navigateScreen: 'HomeScreen',
    },
    rightItemContents: {
      type: 'image',
      content: require('../assets/images/cart.png'),
      navigateScreen: 'ProductShoppingBagScreen',
    },
  };

  const [isSelected, setSelection] = useState(false);

  useEffect(() => {
    if (isLogin) {
      (async function getCartHistory() {
        setLoading(true);
        await getUserCartHistory()
          .then(res => {
            if (res) {
              dispatch(setUserCartHistory(res.data.data));
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
    }
  }, [isLogin]);

  let result = cart_history?.reduce(function (r, a) {
    r[`${moment(a.createdAt).utc().format('MM-DD-YYYY')}_${a.paymentStatus}`] =
      r[
        `${moment(a.createdAt).utc().format('MM-DD-YYYY')}_${a.paymentStatus}`
      ] || [];
    r[
      `${moment(a.createdAt).utc().format('MM-DD-YYYY')}_${a.paymentStatus}`
    ].push(a);
    return r;
  }, Object.create(null));

  console.log('GROPUPED IN BAG', result);

  let bagData = [];

  if (result) {
    Object.keys(result).map(key => {
      if (key.indexOf('CHECKOUT_PENDING') > -1) {
        console.log('WENT IN');
        bagData = bagData.concat(result[key]);
      }
    });
  }

  console.log('BAG DATE', bagData);

  const [checkedCount, setCheckedCount] = useState(0);
  const [productList, setProductList] = useState(bagData);

  const ListHeaderComponent = () => {
    return (
      <View style={styles.view1}>
        <View style={styles.view2}>
          <Text style={{marginRight: wp('2%')}}>check</Text>
          <Text
            style={{
              fontWeight: '600',
            }}>{`전체선택 (${checkedCount}/${bagData.length})`}</Text>
        </View>
        <Text>선택삭제</Text>
      </View>
    );
  };

  const ListFooterComponent = () => {
    return (
      <View style={{paddingBottom: hp('13.5%')}}>
        <Div t1="주문상품 수" t2="총 2개" c1={styles.text1} c2={styles.text2} />
        <Div
          t1="총 주문금액"
          t2="130,000원"
          c1={styles.text1}
          c2={styles.text2}
        />
        <Div t1="총 배송비" t2="0원" c1={styles.text1} c2={styles.text2} />
        <View style={{paddingTop: hp('1.5%')}}>
          <Div
            t1="결제금액"
            t2="130,000원"
            c1={styles.text1}
            c2={styles.text3}
          />
        </View>
      </View>
    );
  };
  const Div = ({t1, t2, c1, c2}) => {
    return (
      <View style={styles.view3}>
        <Text style={c1}>{t1}</Text>
        <Text style={c2}>{t2}</Text>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: COLOR.white, marginBottom: hp('9%')}}>
      <Header headerContent={headerContent} />
      <ScrollView>
        <View style={styles.border2}></View>
        {loading ? (
          <Loader />
        ) : (
          <FlatList
            numColumns={1}
            ListHeaderComponent={ListHeaderComponent}
            // ListFooterComponent={ListFooterComponent}
            showsHorizontalScrollIndicator={false}
            data={productList}
            renderItem={({item, index}) => {
              return (
                <ProductShoppingBag
                  index={index}
                  item={item}
                  key={item?.items[0]._id}
                  productList={productList}
                  setProductList={setProductList}
                />
              );
            }}
          />
        )}
      </ScrollView>
      <CustomButton
        buttonText={'예약하기'}
        buttonHandler={() => {
          ToastAndroid.showWithGravity(
            'Checkout from Cart is Now Available Now, Pls checkout Directly',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }}
      />
    </View>
  );
};

export default ProductShoppingBagScreen;

const styles = StyleSheet.create({
  text1: {
    fontWeight: '600',
  },
  text2: {
    fontWeight: 'bold',
    color: 'black',
  },
  text3: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#55C595',
  },
  border1: {
    borderBottomWidth: 10,
    borderColor: 'lightgrey',
    marginVertical: hp('5%'),
  },
  border2: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    marginVertical: hp('3%'),
  },
  view1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('5%'),
    marginBottom: hp('3%'),
  },
  view2: {
    display: 'flex',
    flexDirection: 'row',
  },
  view3: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('0.6%'),
  },
});
