import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ViewPropTypes,
} from 'react-native';
import Header from '../layout/Header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import COLOR from '../constants/colors';
import { useDispatch } from 'react-redux';
import { navigateTo } from '../navigation/utils/RootNavigation';
import { setSelectedSubLocation } from '../redux/actions/common';

const RenderItem = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity onPress={() => {
      dispatch(setSelectedSubLocation(item));
      navigateTo("SecondScreen");
    }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: COLOR.white
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingBottom: wp('2%'),
          }}>
          <View>
            <Image source={{ uri: item.carousel[0] }} style={{ height: hp("12%"), width: wp("20%") }} />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: wp('60%'),
              paddingLeft: wp('4%'),
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: RFPercentage(2.5),
                    fontWeight: 'bold',
                    color: '#1B1D1F',
                    paddingBottom: hp('1%'),
                  }}>
                  {item.title}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: RFPercentage(1.7),
                    fontWeight: 'bold',
                    color: '#454C53',
                  }}>
                  {item.description}
                </Text>
              </View>
            </View>
            <View>
              <View>
                <View>
                  <Text
                    style={{
                      fontSize: RFPercentage(1.7),
                      color: '#454C53',
                      textAlign: 'right',
                    }}>
                    {item.stock}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: RFPercentage(2.5),
                      fontWeight: 'bold',
                      color: '#1B1D1F',
                      textAlign: 'right',
                    }}>
                    {item.price}
                  </Text>
                </View>
              </View>
              {item.soldout == 'NO' ? (
                <View>
                  <View>
                    <Text
                      style={{
                        fontSize: RFPercentage(1.7),
                        color: '#454C53',
                        textAlign: 'right',
                      }}>
                      {item.quantity}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: RFPercentage(2.5),
                        fontWeight: 'bold',
                        color: '#1B1D1F',
                        textAlign: 'right',
                      }}>
                      {item.price}
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Text
                    style={{
                      fontSize: RFPercentage(2),
                      color: '#454C53',
                      textAlign: 'right',
                    }}>
                    {item.soldout}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#F7F8F9',
          }}>
          <Text
            style={{
              color: '#454C53',
              fontSize: RFPercentage(1.7),
              paddingRight: wp('5%'),
            }}>
            객실정보
          </Text>
          <Text style={{ color: '#454C53', fontSize: RFPercentage(1.7) }}>
            '입실 13:00 퇴실 11:00'
          </Text>
        </View>
        <View style={{ borderBottomWidth: 3, borderColor: COLOR.lgrey, marginVertical: hp("1%") }}></View>
      </View>
    </TouchableOpacity>

  );
};

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

const rental = [
  {
    id: '1',
    image: require('../assets/images/martinrent.png'),
    title: '글램핑 A',
    description: '기준 2인 / 최대 4인',
    quantity: '2개 남음',
    price: '12000 원',
    soldout: 'NO',
    info1: '객실정보',
    info2: '입실 13:00 퇴실 11:00',
  },
  {
    id: '2',
    image: require('../assets/images/martinrent.png'),
    title: '글램핑 B',
    description: '기준 2인 / 최대 4인',
    quantity: '2개 남음',
    price: '12000 원',
    soldout: '예약마감',
    info1: '객실정보',
    info2: '입실 13:00 퇴실 11:00',
  },
  {
    id: '3',
    image: require('../assets/images/martinrent.png'),
    title: '글램핑 C',
    description: '기준 2인 / 최대 4인',
    quantity: '2개 남음',
    price: '12000 원',
    soldout: 'NO',
    info1: '객실정보',
    info2: '입실 13:00 퇴실 11:00',
  },
];

const RentDetail = props => {
  const { container } = styles;
  const { subLocations } = props;

  return (
    <View style={{ backgroundColor: COLOR.white }}>
      <FlatList
        numColumns={1}
        showsHorizontalScrollIndicator={false}
        data={subLocations}
        contentContainerStyle={{
          marginVertical: hp("5%")
        }}
        renderItem={({ item }) => {
          return <RenderItem item={item} key={item._id} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default RentDetail;
