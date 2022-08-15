import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  Animated,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchInput from '../components/SearchInput';
import Room from '../components/Room';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {getAllProducts} from '../apis/product';
import {useDispatch, useSelector} from 'react-redux';
import {setLocationData} from '../redux/actions/product';
import Loader from '../components/common/Loader';
import {showDefaultErrorAlert} from '../global/global';

import Geolocation from 'react-native-geolocation-service';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import map_location from '../assets/images/map_location.png';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const CARD_HEIGHT = 420;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const LATITUD_DELTA = 0.0086111111;
const LONGITUDE_DELTA = LATITUD_DELTA * ASPECT_RATIO;

const RoomScreen = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function getLocationData() {
      let data = {type: 'LOCATION'};
      setLoading(true);
      await getAllProducts(data)
        .then(res => {
          if (res) {
            dispatch(setLocationData(res.data.data));
            setPlaceLoc(res.data.data);
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

  const [placeLoc, setPlaceLoc] = useState(location);

  useEffect(() => {
    setState({...state, markers: placeLoc});

    return () => {};
  }, [placeLoc, location]);

  const st = useSelector(st => st);
  const [error, setError] = useState(null);

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const [state, setState] = React.useState({
    markers: location || placeLoc,
    region: {
      latitude: 37.941235,
      longitude: 127.1266994319,
      latitudeDelta: LATITUD_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  });

  // async function requestPermission() {
  //   try {
  //     if (Platform.OS === 'ios') {
  //       return await Geolocation.requestAuthorization('always');
  //     } // 안드로이드 위치 정보 수집 권한 요청
  //     if (Platform.OS === 'android') {
  //       return await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       );
  //     }
  //   } catch (e) {
  //     alert('위치를 가져오지 못했습니다.');
  //   }
  // }

  // useEffect(() => {
  //   requestPermission().then(result => {
  //     if (result === 'granted') {
  //       Geolocation.getCurrentPosition(
  //         position => {
  //           console.log('postiiton', position);
  //           setState({
  //             ...state,
  //             region: {
  //               latitude: position.coords.latitude,
  //               longitude: position.coords.longitude,
  //               latitudeDelta: LATITUD_DELTA,
  //               longitudeDelta: LONGITUDE_DELTA,
  //             },
  //           });
  //           // very important in real iphone      사용자 위치를 알아보고 해당 위치로 화면 옮긴다.
  //           _map?.current?.animateToRegion({
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //             latitudeDelta: LATITUD_DELTA,
  //             longitudeDelta: LONGITUDE_DELTA,
  //           });
  //           setError(null);
  //         },
  //         error => setError(error.message),
  //         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //       );
  //     }
  //   });

  //   updateListOfPlacesAfterGetUserLocation();
  //   return () => {};
  // }, []);
  //card 위치를 알아 낸다.
  useEffect(() => {
    mapAnimation?.addListener(({value}) => {
      let index = Math.floor(value / CARD_HEIGHT + 0.3); // animate 30% away from landing on the next item
      if (index >= state?.markers?.length) {
        index = state?.markers?.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {coordinate} = state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  });

  const interpolations = state?.markers?.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.8, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

  const onMarkerPress = mapEventData => {
    const markerID = mapEventData._targetInst.return.key;

    let y = markerID * CARD_HEIGHT + markerID * 20;
    if (Platform.OS === 'ios') {
      y = y - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: 0, y: y, animated: true});
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <SearchInput />

      {loading ? (
        <Loader />
      ) : (
        <>
          <MapView
            ref={_map}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{height: 300}}
            initialRegion={state.region}>
            {state?.markers?.length > 0 &&
              state.markers.map((marker, index) => {
                const scaleStyle = {
                  transform: [
                    {
                      scale: interpolations[index].scale,
                    },
                  ],
                };
                return (
                  <Marker
                    key={index}
                    coordinate={marker.coordinate}
                    onPress={e => onMarkerPress(e)}>
                    <Animated.View style={[styles.markerWrap]}>
                      <Animated.Image
                        source={map_location}
                        style={[styles.marker, scaleStyle]}
                        resizeMode="contain"
                      />
                    </Animated.View>
                  </Marker>
                );
              })}
          </MapView>
          {state?.markers?.length > 0 && (
            <Animated.ScrollView
              ref={_scrollView}
              snapToInterval={CARD_HEIGHT + 20}
              snapToAlignment="center"
              pagingEnabled
              vertical
              scrollEventThrottle={1}
              showsVerticalScrollIndicator={true}
              style={styles.scrollView}
              contentInset={{
                top: 0,
                left: SPACING_FOR_CARD_INSET,
                bottom: 0,
                right: SPACING_FOR_CARD_INSET,
              }}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: mapAnimation,
                      },
                    },
                  },
                ],

                {useNativeDriver: true},
              )}>
              {state?.markers?.map((marker, index) => (
                <Room item={marker} key={index} cardHeight={CARD_HEIGHT} />
              ))}
            </Animated.ScrollView>
          )}
        </>
      )}
    </View>
  );
};

export default RoomScreen;

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
  scrollView: {
    flex: 1,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },

  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 25,
    height: 25,
  },
});
