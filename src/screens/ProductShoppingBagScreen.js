import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, {useState} from 'react';
import Header from '../layout/Header';
import ProductShoppingBag from '../components/ProductShoppingBag';
import SecondScreen1 from '../components/SecondScreen1';
import CustomButton from '../components/common/CustomButton';

const ProductShoppingBagScreen = () => {
  const headerContent = {
    middleItemContents: {
      type: 'text',
      content: '주문/결제',
      navigateScreen: 'HomeScreenDetail1',
    },
    leftItemContents: {
      type: 'image',
      content: require('../assets/images/icon_cancel.png'),
      navigateScreen: 'LoginScreen',
    },
    rightItemContents: {
      type: 'image',
      content: require('../assets/images/cart.png'),
      navigateScreen: 'LoginScreen',
    },
  };

  const productList = [
    {
      id: '1',
      btn: '삭제',
      t1: '[COVEMA]',
      t2: '2인 캠핑 패키지 코베마 수동텐트',
      price: '65,000',
      t3: '상품 65,000 + 배송비 3,000 = 68,000',
      img: require('../assets/images/tambu.png'),
    },
    {
      id: '2',
      btn: '삭제',
      t1: '[COVEMA]',
      t2: '2인 캠핑 패키지 코베마 수동텐트',
      price: '65,000',
      t3: '상품 65,000 + 배송비 3,000 = 68,000',
      img: require('../assets/images/tambu.png'),
    },
  ];

  const [isSelected, setSelection] = useState(false);
  return (
    <View style={{backgroundColor: 'white'}}>
      <Header headerContent={headerContent} />
      <View style={styles.border2}></View>
      <FlatList
        numColumns={1}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        showsHorizontalScrollIndicator={false}
        data={productList}
        renderItem={({item}) => {
          return <ProductShoppingBag item={item} key={item.id} />;
        }}
      />
      <CustomButton buttonText={'예약하기'} />
    </View>
  );
};

const ListHeaderComponent = () => {
  return (
    <View style={styles.view1}>
      <View style={styles.view2}>
        <Text style={{marginRight: wp('2%')}}>check</Text>
        <Text style={{fontWeight: '600'}}>전체선택 (1/2)</Text>
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
        <Div t1="결제금액" t2="130,000원" c1={styles.text1} c2={styles.text3} />
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
