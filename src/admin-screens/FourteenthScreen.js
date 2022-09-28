import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../layout/Header';
import {getAllProducts} from '../apis/product';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setLocationData} from '../redux/actions/product';
import {showDefaultErrorAlert} from '../global/global';
import Loader from '../components/common/Loader';
import CheckBox from '@react-native-community/checkbox';
import FONTSIZE from '../constants/fontSize';
import COLOR from '../constants/colors';
import {deleteItem} from '../apis/admin';
import {navigateTo} from '../navigation/utils/RootNavigation';

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
  const [fetch, setFetch] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const deleteItems = async () => {
    if (selectedProductIds.length >= 1) {
      let payload = {
        ids: selectedProductIds,
      };
      Alert.alert(
        'Confirm Product  Deletion',
        'Are you sure you want to delete the selected products, This will be permanently deleted if you proceed',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Deletion Cancelled'),
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              await deleteItem(payload)
                .then(res => {
                  if (res) {
                    console.log('DELETED', res);
                  }
                  setFetch(!fetch);
                  setSelectedProductIds([]);
                })
                .catch(err => {
                  showDefaultErrorAlert();
                  setSelectedProductIds([]);
                });
            },
          },
        ],
      );
    } else {
      ToastAndroid.showWithGravity(
        'Please select at least one item to delete',
        ToastAndroid.TOP,
        ToastAndroid.LONG,
      );
      setSelectedProductIds([]);
      setFetch(!fetch);
    }
  };

  useEffect(() => {
    (async function getAllProductsData() {
      let data = {type: 'LOCATION'};
      setLoading(true);
      await getAllProducts(data)
        .then(res => {
          if (res) {
            dispatch(setLocationData(res.data.data));
            setLoading(false);
          }
        })
        .catch(err => {
          if (err) {
            console.log('ERROR', err);
            showDefaultErrorAlert();
            setLoading(false);
          }
        });
    })();
  }, [fetch]);

  return (
    <View style={{backgroundColor: COLOR.white, minHeight: hp('100%')}}>
      <Header headerContent={headerContent} />
      <Text
        style={{
          borderBottomWidth: 2,
          borderBottomColor: '#F8F8F8',
          color: COLOR.black,
        }}></Text>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          style={{marginBottom: hp('15%')}}
          keyboardShouldPersistTaps="always">
          <View style={styles.view1}>
            <TouchableOpacity
              onPress={() => {
                deleteItems();
              }}>
              <Text style={styles.text1}>- 삭제하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigateTo('FixRentalEquipmentNewScreen', {
                  type: 'LOCATION',
                });
              }}>
              <Text style={styles.text1}>+ 캠핑장 추가하기</Text>
            </TouchableOpacity>
          </View>
          {location && location?.length >= 1 ? (
            location.map((item, i) => (
              <Comp1
                item={item}
                key={i}
                setSelectedProductIds={setSelectedProductIds}
                selectedProductIds={selectedProductIds}
              />
            ))
          ) : (
            <View>
              <Text style={{textAlign: 'center', color: COLOR.black}}>
                No Camps Available
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const Comp1 = props => {
  let {item, selectedProductIds, setSelectedProductIds} = props;
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
          uri: item?.carousel[0],
        }}
        resizeMode="stretch"
        style={{width: wp('33%'), height: hp('15%')}}>
        <CheckBox
          value={isSelected}
          onValueChange={value => {
            if (value) {
              let newSelectedProductIds = [...selectedProductIds, item._id];
              setSelectedProductIds(newSelectedProductIds);
              setIsSelected(value);
            } else {
              let newSProductIds = [...selectedProductIds];
              let filteredProduct = newSProductIds.filter(
                it => it !== item._id,
              );
              setSelectedProductIds(filteredProduct);
              setIsSelected(value);
            }
          }}
          style={{padding: 0, margin: 0, backgroundColor: '#E5E5E5'}}
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
          <Text
            style={{
              color: COLOR.black,
              fontWeight: 'bold',
              fontSize: FONTSIZE.xl,
              maxWidth: wp('40%'),
            }}>
            {item?.title}
          </Text>
          <TouchableOpacity
            style={{backgroundColor: '#E5E5E5', width: 20, height: 30}}
            onPress={() => {
              navigateTo('EditFirstScreen', {
                product: item,
                updateId: item?._id,
                type: 'LOCATION',
              });
            }}>
            <Image
              style={{width: 20, height: 30, resizeMode: 'contain'}}
              source={require('../assets/images/pencil.png')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontWeight: '600',
              maxWidth: wp('45%'),
              fontSize: FONTSIZE.l,
              color: COLOR.grey,
            }}>
            위치 {item?.description}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontWeight: '600',
              fontSize: FONTSIZE.l,
              color: COLOR.grey,
            }}>
            위치 {item?.phone || item?.contactNumber}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigateTo('FixRentalEquipmentNewScreen', {
              type: 'SUBLOCATION',
              parLocId: item?._id,
            });
          }}>
          <Text
            style={{
              color: COLOR.compGreen,
              fontWeight: 'bold',
              fontSize: FONTSIZE.l,
            }}>
            Add Sub Location
          </Text>
        </TouchableOpacity>
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
