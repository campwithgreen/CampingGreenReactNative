import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  useWindowDimensions,
  Animated,
} from 'react-native';
import {Avatar} from '@rneui/themed';
import React, {useState, useEffect, useRef} from 'react';
import moment from 'moment';

import {navigateTo} from '../../navigation/utils/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {likePost} from '../../apis/community';
import {showDefaultErrorAlert} from '../../global/global';
import {setLikepostAction} from '../../redux/actions/community';

const UserPostList = ({postData}) => {
  const user = useSelector(st => st?.oauth?.user_data?.data);
  const [currentUser, setCurrentUser] = useState(user);
  const scrollX = useRef(new Animated.Value(0)).current;
  let {width: windowWidth, height: windowHeight} = useWindowDimensions();
  windowHeight = windowHeight - 300;

  useEffect(() => {
    setCurrentUser(user);
    return () => {};
  }, [user]);

  const dispatch = useDispatch();

  const _likefunction = async data => {
    await likePost(data)
      .then(res => {
        if (res.data.success) {
          dispatch(setLikepostAction(res.data.data));
        }
      })
      .catch(err => {
        if (err) {
          console.log(err);
          showDefaultErrorAlert(err.response.data.error);
        }
      });
  };

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        marginVertical: 4,
        marginHorizontal: hp(2),
      }}>
      <View
        style={{
          marginVertical: 10,
          paddingHorizontal: hp(1),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Avatar
            size={34}
            rounded
            source={{
              uri: 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg',
            }}
            key={1}
          />

          <View style={{marginLeft: hp(1)}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              {postData.userId?.firstName}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigateTo('UserPostDetailScreen', {
            data: postData,
          });
        }}>
        {postData?.content && (
          <View style={{marginBottom: hp(1), paddingHorizontal: hp(1)}}>
            <Text style={{color: '#525252', fontSize: 13, marginVertical: 2}}>
              {postData?.content?.slice(0, 150)}...
            </Text>
          </View>
        )}
      </TouchableOpacity>
      {postData?.imageList?.length > 0 && (
        <>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            style={{
              flex: 1,
            }}>
            {postData?.imageList?.map(img => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigateTo('UserPostDetailScreen', {
                      data: postData,
                    });
                  }}>
                  <Animated.View
                    style={{width: windowWidth - 34.1601, height: 270}}
                    key={img}>
                    <Image
                      source={{uri: img}}
                      style={{
                        resizeMode: 'cover',
                        borderRadius: 3,
                        height: 270,
                        width: windowWidth - 34.1601,
                      }}
                    />
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={styles.indicatorContainer}>
            {postData?.imageList?.map((img, index) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (index - 1),
                  windowWidth * index,
                  windowWidth * (index + 1),
                ],
                outputRange: [8, 16, 8],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  style={[
                    styles.normalDots,
                    {width},
                    {backgroundColor: '#c7c6c3'},
                  ]}
                />
              );
            })}
          </View>
        </>
      )}

      <View
        style={{
          height: 30,
          paddingHorizontal: hp(1),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              const postdatas = {}; //if you pass id direct postData._id then server side not able to get id in proper way
              Object.assign(postdatas, {
                postId: postData._id,
                userId: currentUser?._id,
              });
              _likefunction(postdatas);
            }}>
            <Text
              style={{
                color: '#878787',
                fontSize: 10,

                marginLeft: 4,
              }}>
              좋아요
            </Text>

            <Text
              style={{
                color: '#878787',
                fontSize: 10,

                marginLeft: 4,
              }}>
              {postData?.myLikes?.length}
            </Text>
            {/* )} */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: hp(2),
            }}
            onPress={() => {
              navigateTo('UserPostDetailScreen', {
                data: postData,
              });
            }}>
            <Text style={{color: '#878787', fontSize: 12}}>댓글</Text>
            <Text
              style={{
                fontSize: 10,
                width: 20,
                height: 12,
                marginLeft: 4,
                color: '#878787',
              }}>
              {postData?.commentList?.length}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 4}}>
          <Text style={{color: '#8A8D95', fontSize: 10}}>
            {moment(postData?.created_at).fromNow()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserPostList;

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(1),
  },
  normalDots: {
    width: 8,
    height: 9,
    borderRadius: 4,
    marginTop: 6,
    marginHorizontal: 4,
  },
});
