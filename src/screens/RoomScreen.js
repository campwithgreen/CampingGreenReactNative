import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SearchInput from '../components/SearchInput';
import Room from '../components/Room';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { getAllProducts } from '../apis/product';
import { useDispatch, useSelector } from 'react-redux';
import { setLocationData } from '../redux/actions/product';
import Loader from '../components/common/Loader';
import { showDefaultErrorAlert } from '../global/global';
import { goBack } from '../navigation/utils/RootNavigation';
import Header from '../layout/Header';

const RoomScreen = () => {


  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function getLocationData() {
      let data = { type: 'LOCATION' };
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
            showDefaultErrorAlert();
            setLoading(false);
          }
        });
    })();
  }, []);

  const location = useSelector(st => st.product.location);

  console.log('LOC', location);
  const st = useSelector(st => st);
  console.log('STORE', st);

  return (
    <View style={{ backgroundColor: 'white' }}>
      <SearchInput />
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          numColumns={1}
          ListHeaderComponent={ListHeaderComponent}
          showsHorizontalScrollIndicator={false}
          data={location}
          renderItem={({ item }) => {
            return <Room item={item} key={item._id} />;
          }}
        />
      )}
    </View>
  );
};

export default RoomScreen;

const ListHeaderComponent = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        ToastAndroid.showWithGravity(
          'Map Feature will be avaiable in next update',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }}>
      <View style={{ paddingBottom: 20, paddingTop: 70 }}>
        <Image
          source={require('../assets/images/map1.png')}
          style={styles.img1}
        />
        {/* <Image
          source={require('../assets/images/map_location.png')}
          style={styles.img2}
        /> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img1: {
    width: wp('100%'),
    height: hp('25%'),
  },
  img2: {
    position: 'absolute',
    bottom: 40,
    left: 170,
  },
});
