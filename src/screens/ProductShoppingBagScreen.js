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
import React, { useState, useEffect } from 'react';
import Header from '../layout/Header';
import ProductShoppingBag from '../components/ProductShoppingBag';
import SecondScreen1 from '../components/SecondScreen1';
import CustomButton from '../components/common/CustomButton';
import { getUserCartHistory } from '../apis/cart';
import { useSelector, useDispatch } from 'react-redux';
import { setUserCartHistory } from '../redux/actions/common';
import moment from 'moment';
import COLOR from '../constants/colors';
import Loader from '../components/common/Loader';
import { goBack } from '../navigation/utils/RootNavigation';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showDefaultErrorAlert } from '../global/global';
import { setCurrentCheckoutCartDetails } from '../redux/actions/common';

const ProductShoppingBagScreen = () => {
  const dispatch = useDispatch();

  const isLogin = useSelector(st => st?.oauth?.isLogin);
  const cart_history = useSelector(st => st.common?.cart_history);
  const main_cart_items = useSelector(st => st.common?.main_cart_items);
  const [cartMainData, setCartMainData] = useState(cart_history);
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
      navigateScreen: () => {
        goBack();
      },
    },
  };

  const [isSelected, setIsSelected] = useState(false);
  const [checkedCount, setCheckedCount] = useState(0);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (isLogin) {
      (async function getCartHistory() {
        setLoading(true);
        await getUserCartHistory()
          .then(res => {
            if (res) {
              setCartMainData(res.data.data);

              dispatch(setUserCartHistory(res.data.data));

              let result = res.data.data?.reduce(function (r, a) {
                r[
                  `${moment(a.createdAt).utc().format('MM-DD-YYYY')}_${a.paymentStatus
                  }`
                ] =
                  r[
                  `${moment(a.createdAt).utc().format('MM-DD-YYYY')}_${a.paymentStatus
                  }`
                  ] || [];
                r[
                  `${moment(a.createdAt).utc().format('MM-DD-YYYY')}_${a.paymentStatus
                  }`
                ].push(a);
                return r;
              }, Object.create(null));

              let bagData = [];
              if (result) {
                Object.keys(result).map(key => {
                  if (key.indexOf('CHECKOUT_PENDING') > -1) {
                    bagData = bagData.concat(result[key]);
                  }
                });
              }
              console.log("bagData =====================", bagData);
              bagData[0]?.items.map((item) => {
                item.isSelected = false;
              });
              setProductList(bagData[0]?.items);
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


  console.log("PRODUCT LIST FIRST", productList, checkedCount);
  const [displayAmount, setDisplayAmount] = useState(null);
  const [displayTotalAmount, setDisplayTotalAmount] = useState(null);

  const generateSelectedPayload = (productList) => {
    let cartPayload = JSON.parse(JSON.stringify(productList));
    cartPayload.map((item) => {
      item.itemId = item.itemId?._id;
    });
    console.log("CART PAYLOAD", cartPayload);
    console.log("GENERATING PAYLOAD", productList);

    let displayAmount = 0;
    let displayTotalAmount = 0;

    productList.map((product) => {
      if (product.isSelected) {
        var start = moment(product.startDate);
        var end = moment(product.endDate);
        var totalDays = end.diff(start, "days") - 1;
        displayAmount += (totalDays * product.units) * product?.itemId?.price;
        //TO DO Add shippingAmount in BE
        // displayTotalAmount += (totalDays * product.units) * product?.itemId?.price + product?.itemId?.shippingAmount;
        displayTotalAmount += (totalDays * product.units) * product?.itemId?.price;
      }
    });
    setDisplayAmount(displayAmount);
    setDisplayTotalAmount(displayTotalAmount);
  };



  useEffect(() => {
    generateSelectedPayload(productList);
  }, [productList]);


  const ListHeaderComponent = () => {
    return (
      <View style={styles.view1}>
        <View style={styles.view2}>
          <CheckBox
            value={checkedCount !== productList.length ? false : isSelected}
            onValueChange={(value) => {
              setIsSelected(value);
              let newData = [...productList];
              newData.map((it) => {
                it.isSelected = value;
              });
              setProductList(newData);
            }}
            style={styles.checkbox}
          />
          <Text
            style={{
              fontWeight: '600',
              color: '#454C53',
            }}>{`전체선택 (${checkedCount}/${productList.length})`}</Text>
        </View>
        <Text style={{ color: '#454C53', alignSelf: "center" }}>선택삭제</Text>
      </View>
    );
  };

  const ListFooterComponent = () => {
    return (
      <View style={{ paddingBottom: hp('13.5%') }}>
        <Div t1="주문상품 수" t2={`총 ${checkedCount}개`} c1={styles.text1} c2={styles.text2} />
        <Div
          t1="총 주문금액"
          t2={`${displayAmount || (main_cart_items && main_cart_items[0]?.totalAmount)}원`}
          c1={styles.text1}
          c2={styles.text2}
        />
        <Div t1="총 배송비" t2={`${main_cart_items && main_cart_items[0]?.shippingAmount || 0}원`} c1={styles.text1} c2={styles.text2} />
        <View style={{ paddingTop: hp('1.5%') }}>
          <Div
            t1="결제금액"
            t2={`${displayTotalAmount || (main_cart_items && main_cart_items[0]?.totalAmount)}원`}
            c1={styles.text1}
            c2={styles.text3}
          />
        </View>
      </View>
    );
  };
  const Div = ({ t1, t2, c1, c2 }) => {
    return (
      <View style={styles.view3}>
        <Text style={c1}>{t1}</Text>
        <Text style={c2}>{t2}</Text>
      </View>
    );
  };


  const getCartId = async () => {
    try {
      const cartId = await AsyncStorage.getItem('@cart_id');
      return cartId != null ? cartId : null;
    } catch (e) {
      console.log("getting cart error", e);
    }
    console.log('Done.');
  };

  const storeCartId = async (value) => {
    console.log("VALUE CARTID", value);
    try {
      await AsyncStorage.setItem('@cart_id', value);
    } catch (e) {
      console.log("STORING CART ID ERROR", e);
    }
  };

  const removeCartId = async (value) => {
    console.log("VALUE CARTID", value);
    try {
      await AsyncStorage.removeItem('@cart_id');
    } catch (e) {
      console.log("STORING CART ID ERROR", e);
    }
  };


  const handleAddToCart = async () => {

    getCartId().then(async (cartId) => {
      console.log("THE CART ID =>", cartId);
      if (cartId) {
        await createOrUpdateCart(cartItems, { "cartId": cartId })
          .then(res => {

            console.log("RESPONSE CART", res);

            storeCartId(res.data.data?._id);
            if (res) {
              ToastAndroid.showWithGravity(
                'Product added to cart',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
              );
              navigateTo('ProductShoppingBagScreen');
              setModalVisible(false);
            }


          })
          .catch(err => {
            if (err) {
              console.log("ERROR", err);
              showDefaultErrorAlert();
              setModalVisible(false);
            }
          });
      } else {
        await createOrUpdateCart(cartItems)
          .then(res => {
            console.log("RESPONSE CART", res);
            storeCartId(res.data.data?._id);
            if (res) {
              ToastAndroid.showWithGravity(
                'Product added to cart',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
              );
              navigateTo('ProductShoppingBagScreen');
              setModalVisible(false);
            }
          })
          .catch(err => {
            if (err) {
              console.log("ERROR", err);
              showDefaultErrorAlert();
              setModalVisible(false);
            }
          });
      }

    });

  };


  const handleCheckout = async () => {
    getCartId().then((cartId) => {
      console.log("HI CART ID", cartId);
    });

    // await createOrUpdateCart(cartItems)
    //   .then(res => {
    //     console.log("RESPONSE CART", res);
    //     if (res) {
    //       dispatch(setCurrentCheckoutCartDetails(res.data.data));
    //       ToastAndroid.showWithGravity(
    //         'Checkout In Progress',
    //         ToastAndroid.SHORT,
    //         ToastAndroid.TOP,
    //       );
    //       navigateTo('RoomPaymentScreen');
    //     }
    //   })
    //   .catch(err => {
    //     if (err) {
    //       showDefaultErrorAlert(err?.response?.data?.error);
    //     }
    //   });


  };

  return (
    <View style={{ flex: 1 }}>
      <Header headerContent={headerContent} />
      <ScrollView>
        {loading ? (
          <Loader />
        ) : (
          productList && <FlatList
            numColumns={1}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            showsHorizontalScrollIndicator={false}
            data={productList}
            renderItem={({ item, index }) => {
              return (
                <ProductShoppingBag
                  index={index}
                  item={item}
                  key={item?._id}
                  productList={productList}
                  setProductList={setProductList}
                  setCheckedCount={setCheckedCount}
                />
              );
            }}
          />
        )}
      </ScrollView>
      <CustomButton
        buttonText={'예약하기'}
        buttonHandler={() => {
          handleCheckout();
        }}
      />
    </View>
  );
};

export default ProductShoppingBagScreen;

const styles = StyleSheet.create({
  text1: {
    fontWeight: '600',
    color: '#454C53',
  },
  text2: {
    fontWeight: 'bold',
    color: '#454C53',
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
    marginVertical: hp('2%'),
  },
  view2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center"
  },
  view3: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('0.6%'),
  },
  checkbox: {
    alignSelf: "center",
  },
});
