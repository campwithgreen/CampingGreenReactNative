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
import {useDispatch} from 'react-redux';
import {setSelectedItem} from '../redux/actions/common';
import {showDefaultErrorAlert} from '../global/global';

const RenderItem = ({item}) => {
  const dispatch = useDispatch();

  return (
    <View style={{marginTop: hp('2.5%'), width: wp('43%')}}>
      <TouchableOpacity
        onPress={() => {
          if (item.stock <= 0) {
            showDefaultErrorAlert('잔여수량이 없습니다.');
          } else {
            dispatch(setSelectedItem(item));
            navigateTo('ProductInfo', item);
          }
        }}>
        <Image
          source={{
            uri: item?.carousel[0],
          }}
          style={{
            width: wp('42.5%'),
            height: hp('27%'),
            backgroundColor: '#fff',
            borderRadius: hp('1.5%'),
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            color: '#000',
            fontSize: RFPercentage(2.1),
            paddingTop: hp('2%'),
          }}>
          {item.title}
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: '#1B1D1F',
            fontSize: RFPercentage(3),
            paddingTop: hp('1%'),
            paddingBottom: hp('.5%'),
            fontWeight: 'bold',
          }}>
          {item.price}원
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: '#000',
            fontSize: RFPercentage(2),
            paddingBottom: hp('1%'),
          }}>
          {`잔여수량 ${item.stock}`}
        </Text>
      </View>
    </View>
  );
};

const ProductDetail = props => {
  const {product} = props;
  // console.log('DETAIL Product', product);
  const ProductData = [
    {
      specifications: {
        color: '#000',
        weight: '40kg',
        dimensions: '4x4x5',
        사이즈: '290*280*115',
        '수납 사이즈': '45*15*15',
        중량: '2.3kg',
        사용인원: '1-2인용',
        내수압: '50000mm',
      },
      carousel: [
        'https://picsum.photos/200/300?grayscale',
        'https://picsum.photos/seed/picsum/200/300',
      ],
      category: [],
      tag: [],
      isDisabled: false,
      _id: '62c18b27fd823414030b1103',
      title: '코베마 수동 텐트',
      description: 'description',
      price: '65,001',
      stock: 84,
      type: 'PRODUCT',
      createdAt: '2022-07-03T12:27:19.407Z',
      updatedAt: '2022-07-07T14:36:42.752Z',
      __v: 1,
      allFeatures: [
        {
          featureName: '1-2freare',
          image:
            'https://res.cloudinary.com/dchcqwskd/image/upload/v1657451428/camping-product-items/tentinfo1_gau9ck.png',
        },
        {
          featureName: '1-2freare',
          image:
            'https://res.cloudinary.com/dchcqwskd/image/upload/v1657451488/camping-product-items/tentinfo2_kkrcwz.png',
        },
        {
          featureName: '경량 테이블',
          image:
            'https://res.cloudinary.com/dchcqwskd/image/upload/v1657451499/camping-product-items/tentinfo3_nyp9dr.png',
          description:
            '경량 테이블은 캠핑 장소 어디서나 사용 가능한 가을 감성의 사용자를 위한 캠핑용 감성 의자 입니다. 자세한 정보는 캠핑그린의 사이트에서 확인하세요.',
        },
      ],
    },
  ];

  return (
    <>
      {product.length > 0 ? (
        <FlatList
          style={{paddingBottom: hp('25%')}}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          data={product}
          columnWrapperStyle={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          renderItem={({item}) => {
            return <RenderItem item={item} key={item.id} />;
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: hp(40),
          }}>
          <Text style={{color: '#000'}}>매칭된 용품이 없습니다.</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default ProductDetail;
