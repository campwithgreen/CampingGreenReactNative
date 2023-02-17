import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Animated,
  ActivityIndicator,
  useWindowDimensions,
  Modal,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Avatar} from '@rneui/themed';
import heartIcon from '../assets/communityIcons/heart.png';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';

import CommentComponent from '../screens/UserCommunity/CommentComponent';
import Header from '../layout/Header';
import {showDefaultErrorAlert} from '../global/global';
import {goBack, navigateTo} from '../navigation/utils/RootNavigation';
import {deletePostByAdmin, fetchPostComments} from '../apis/community';

const AdminReportPostDetailScreen = ({route}) => {
  const [postData, setpostData] = useState(route?.params?.data);
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector(st => st?.oauth?.user_data?.data);
  const [currentUser, setCurrentUser] = useState(user);

  const [deleteCommentId, setDeleteCommentId] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  let {width: windowWidth, height: windowHeight} = useWindowDimensions();
  windowHeight = windowHeight - 300;

  const [postCommentList, setPostCommentList] = useState([]);

  useEffect(() => {
    (async function getPostCommentdata() {
      setLoading(true);
      let postId = {};
      Object.assign(postId, {
        postId: postData.postId._id,
      });

      fetchPostComments(postId)
        .then(res => {
          if (res.data.success) {
            setPostCommentList(res.data.data);

            setLoading(false);
          }
        })
        .catch(err => {
          if (err) {
            showDefaultErrorAlert('인터넷 상태가 불안정합니다.');
            setLoading(false);
          }
        });
    })();

    return () => {};
  }, []);

  const deleteReportPost = async postId => {
    setLoading(true);

    await deletePostByAdmin(postId)
      .then(res => {
        if (res.data.success) {
          Toast.show({
            type: 'success',
            text1: res.data.message,
            visibilityTime: 2000,
          });
          navigateTo('AdminReportPost', {refreshFlag: true});
        }
      })
      .catch(err => {
        if (err) {
          console.log(err);
          showDefaultErrorAlert(err.response.data.error);
        }
      });
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      // navigateTo('CommunityScreen', {refreshFlag: true});
    };
  }, []);

  const headerContent = {
    leftItemContents: {
      type: 'image',
      content: require('../assets/images/arrow-left.png'),
      navigateScreen: () => {
        goBack();
      },
    },
    middleItemContents: {
      type: 'text',
      content: '글 내용',
    },
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header headerContent={headerContent} />

      {loading ? (
        <ActivityIndicator
          size="small"
          color="#204EE2"
          style={{flex: 1, alignItems: 'center'}}
        />
      ) : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: '#FFFFFF',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: hp(2),
            marginVertical: hp(1),
          }}>
          <Avatar
            size={35}
            rounded
            source={{
              uri: 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg',
            }}
          />

          <View style={{marginLeft: hp(1), justifyContent: 'center'}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              {postData?.userId?.firstName || '김그린'}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.caption}>
                {moment(postData?.postId?.created_at).toString().slice(0, -12)}
              </Text>
              <Image
                source={require('../assets/communityIcons/verticalBar.png')}
                style={{resizeMode: 'contain', marginHorizontal: hp(1)}}
              />

              <TouchableOpacity
                style={{marginLeft: wp(2)}}
                onPress={() => {
                  const postdatas = {};
                  Object.assign(postdatas, {
                    postId: postData._id,
                  });
                  deleteReportPost(postdatas);
                }}>
                <Text
                  style={{color: '#878787', fontSize: 12, fontWeight: '500'}}>
                  삭제
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{marginHorizontal: hp(2), marginVertical: hp(1)}}>
          <Text style={{color: '#525252', fontSize: 13, marginVertical: 2}}>
            {postData?.postId?.content}
          </Text>
        </View>
        {postData?.postId?.imageList?.length > 0 && (
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
                marginHorizontal: hp(2),
              }}>
              {postData?.postId?.imageList?.map(img => (
                <Animated.View
                  style={{
                    width: windowWidth - 34.1601,
                    height: 270,
                  }}
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
              ))}
            </ScrollView>
            <View style={styles.indicatorContainer}>
              {postData?.postId?.imageList?.map((img, index) => {
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

            marginHorizontal: 30,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={heartIcon}
              style={{
                width: 18,
                height: 18,
                resizeMode: 'contain',
              }}
            />

            <Text
              style={{
                color: '#878787',
                fontSize: 10,

                marginLeft: 4,
              }}>
              {postData?.postId?.myLikes?.length}
            </Text>
          </View>
        </View>
        {postCommentList?.length > 0 ? (
          <>
            {postCommentList?.map(comment => (
              <CommentComponent
                postCommentData={comment}
                setDeleteCommentId={setDeleteCommentId}
              />
            ))}
          </>
        ) : (
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image
              source={require('../assets/communityIcons/commentIcon.png')}
              style={{width: 30, height: 30}}
              resizeMode="contain"
            />
            <Text style={{color: '#A4A4A4', fontSize: 16, marginTop: hp(1)}}>
              아직 등록된 댓글이 없습니다.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AdminReportPostDetailScreen;

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 11,
    color: 'black000',
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 10,
    fontWeight: '400',
    color: '#878787',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalDots: {
    width: 8,
    height: 9,
    borderRadius: 4,
    marginTop: 6,
    marginHorizontal: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    marginHorizontal: 30,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },

  textStyle: {
    color: 'black',

    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    textAlign: 'center',
    color: '#5C6990',
    marginVertical: 30,
    fontSize: 17,
  },
  button: {
    padding: 12,
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#D9D9D9',
  },
});
