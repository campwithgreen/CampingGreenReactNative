import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {navigateTo} from '../navigation/utils/RootNavigation';

const RenderItem = ({item}) => {
  console.log('HELLODetailRitik', item);
  return (
    <View style={{marginTop: hp('2.5%'), width: wp('43%')}}>
      <TouchableOpacity
        onPress={() => {
          navigateTo('ProductInfo', item);
        }}>
        <Image
          source={item.image}
          style={{
            width: wp('42.5%'),
            backgroundColor: '#fff',
            borderRadius: hp('1.5%'),
          }}
        />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: RFPercentage(2.1),
            paddingTop: hp('2%'),
          }}>
          {item.name}
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: RFPercentage(3),
            paddingTop: hp('1%'),
            paddingBottom: hp('.5%'),
            fontWeight: 'bold',
          }}>
          {item.price}
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: RFPercentage(2),
            paddingBottom: hp('1%'),
          }}>
          {item.quantity}
        </Text>
      </View>
    </View>
  );
};

const ProductDetail = () => {
  const ProductData = [
    {
      id: '1',
      name: '코베마 수동 텐트',
      price: '65,001',
      quantity: '잔여수량 4',
      image: require('../assets/images/tentv2.png'),
      detail1: {
        detail1Title: '코베마 텐트 상세정보',
        detail1Value: {
          색상: '코랄',
          사이즈: '290*280*115',
          '수납 사이즈': '45*15*15',
          중량: '2.3kg',
          사용인원: '1-2인용',
          내수압: '50000mm',
        },
      },
      details2: {
        detail2Title: '2인 캠핑 패키지',
        detail2Value: {
          one: '1~2인용 비빅텐트',
          two: '커피포트 버너',
          three: '경량 테이블',
          four: '버너',
        },
      },
    },
    {
      id: '2',
      name: '코베마 수동 텐트',
      price: '65,002',
      quantity: '잔여수량 4',
      image: require('../assets/images/bottle.png'),
      detail1: {
        detail1Title: '코베마 텐트 상세정보',
        detail1Value: {
          색상: '코랄',
          사이즈: '290*280*115',
          '수납 사이즈': '45*15*15',
          중량: '2.3kg',
          사용인원: '1-2인용',
          내수압: '50000mm',
        },
      },
      details2: {
        detail2Title: '2인 캠핑 패키지',
        detail2Value: {
          one: '1~2인용 비빅텐트',
          two: '커피포트 버너',
          three: '경량 테이블',
          four: '버너',
        },
      },
    },
    {
      id: '3',
      name: '코베마 수동 텐트',
      price: '65,003',
      quantity: '잔여수량 5',
      image: require('../assets/images/sleepbag.png'),
      detail1: {
        detail1Title: '코베마 텐트 상세정보',
        detail1Value: {
          색상: '코랄',
          사이즈: '290*280*115',
          '수납 사이즈': '45*15*15',
          중량: '2.3kg',
          사용인원: '1-2인용',
          내수압: '50000mm',
        },
      },
      details2: {
        detail2Title: '2인 캠핑 패키지',
        detail2Value: {
          one: '1~2인용 비빅텐트',
          two: '커피포트 버너',
          three: '경량 테이블',
          four: '버너',
        },
      },
    },
    {
      id: '4',
      name: '[COVEMA] 2인 캠핑 패키지 코베마 수동텐트',
      price: '65,004',
      quantity: '잔여수량 5',
      image: require('../assets/images/tent.png'),
      detail1: {
        detail1Title: '코베마 텐트 상세정보',
        detail1Value: {
          색상: '코랄',
          사이즈: '290*280*115',
          '수납 사이즈': '45*15*15',
          중량: '2.3kg',
          사용인원: '1-2인용',
          내수압: '50000mm',
        },
      },
      details2: {
        detail2Title: '2인 캠핑 패키지',
        detail2Value: {
          one: '1~2인용 비빅텐트',
          two: '커피포트 버너',
          three: '경량 테이블',
          four: '버너',
        },
      },
    },
  ];

  //const {container} = styles;
  return (
    <FlatList
      style={{paddingBottom: hp('25%')}}
      numColumns={2}
      showsHorizontalScrollIndicator={false}
      data={ProductData}
      columnWrapperStyle={{display: 'flex', justifyContent: 'space-between'}}
      renderItem={({item}) => {
        return <RenderItem item={item} key={item.id} />;
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default ProductDetail;
