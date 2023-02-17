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
import Header from '../../layout/Header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Avatar} from '@rneui/themed';
import heartIcon from '../../assets/communityIcons/heart.png';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';

import {goBack, navigateTo} from '../../navigation/utils/RootNavigation';
import {
  createCommentOnPost,
  deletePost,
  fetchPostComments,
  likePost,
  deleteComment,
  reportPost,
} from '../../apis/community';
import {showDefaultErrorAlert} from '../../global/global';

import CommentComponent from './CommentComponent';

const UserPostDetailScreen = ({route}) => {
  const [postData, setpostData] = useState(route?.params?.data);
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector(st => st?.oauth?.user_data?.data);
  const [currentUser, setCurrentUser] = useState(user);
  const [deleteCommentId, setDeleteCommentId] = useState('');
  const [totalTextLength, setTotalTextLength] = useState(0);

  const [loading, setLoading] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;

  let {width: windowWidth, height: windowHeight} = useWindowDimensions();
  windowHeight = windowHeight - 300;

  const [commentData, setCommentData] = useState({
    commentContent: '',
    postId: postData._id,
    userId: currentUser?._id,
  });
  const reportItem = [
    {label: '스팸', value: 1},
    {label: '상업적 광고 및 판매', value: 2},
    {label: '낚시/놀람/도배', value: 3},
    {label: '음란물/불건전한 만남 및 대화', value: 4},
    {label: '혐오 발언 또는 상징', value: 5},
    {label: '자살, 자해 및 섭식 장애', value: 6},
    {label: '타인 사칭/사기', value: 7},
  ];
  const [postCommentList, setPostCommentList] = useState([]);

  const commentInputRef = useRef(null);
  const _reportPostToAdmin = async reason => {
    setLoading(true);
    const reportObj = {};
    Object.assign(reportObj, {
      postId: postData._id,
      userId: currentUser?._id,
      reason: reason,
    });
    console.log('reportObj', reportObj);
    await reportPost(reportObj)
      .then(res => {
        if (res.data.success) {
          Toast.show({
            type: 'success',
            text1: res.data.message,
            visibilityTime: 2000,
          });
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
  const _deleteComment = async () => {
    setLoading(true);

    await deleteComment(deleteCommentId)
      .then(res => {
        if (res.data.success) {
          Toast.show({
            type: 'success',
            text1: res.data.message,
            visibilityTime: 2000,
          });
          setLoading(false);
          if (res.data.data != undefined) {
            let indx = -1;
            let preState = [...postCommentList];
            preState.map((item, index) => {
              if (res.data.data?._id === item._id) {
                indx = index;
              }
            });
            if (indx > -1) {
              // only splice array when item is found
              preState.splice(indx, 1); // 2nd parameter means remove one item only
            }
            console.log('indx', indx, preState);

            setPostCommentList(preState);
          }
        }
      })
      .catch(err => {
        if (err) {
          console.log(err);
          showDefaultErrorAlert(err.response.data.error);
          setLoading(false);
        }
      });
    setDeleteCommentId('');
  };
  useEffect(() => {
    if (deleteCommentId != '') {
      _deleteComment();
    }

    return () => {};
  }, [deleteCommentId]);

  useEffect(() => {
    (async function getPostCommentdata() {
      setLoading(true);
      let postId = {};
      Object.assign(postId, {
        postId: postData._id,
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

  const _likefunction = async data => {
    await likePost(data)
      .then(res => {
        if (res.data.success) {
          setpostData(res.data.data);
        }
      })
      .catch(err => {
        if (err) {
          console.log(err);
          showDefaultErrorAlert(err.response.data.error);
        }
      });
  };

  const _deletePost = async postId => {
    setLoading(true);
    console.log('delete post id', postId);
    await deletePost({postId})
      .then(res => {
        if (res.data.success) {
          Toast.show({
            type: 'success',
            text1: res.data.message,
            visibilityTime: 2000,
          });
          setLoading(false);
          navigateTo('CommunityScreen', {refreshFlag: true});
        }
      })
      .catch(err => {
        if (err) {
          console.log(err);
          showDefaultErrorAlert(err.response.data.error);
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    commentInputRef.current.focus();

    return () => {
      // navigateTo('CommunityScreen', {refreshFlag: true});
    };
  }, []);

  const _createComment = () => {
    if (currentUser?._id === '') {
      alert('로그인이 필요합니다.');
      return;
    }
    if (commentData.commentContent === '') {
      alert('댓글 입력해주세요');
      return;
    } else {
      setLoading(true);

      createCommentOnPost(commentData)
        .then(res => {
          if (res.data.success) {
            Toast.show({
              type: 'success',
              text1: res.data.message,
              visibilityTime: 2000,
            });
            setPostCommentList([...postCommentList, res.data.data]);

            setLoading(false);
          }
        })
        .catch(err => {
          if (err) {
            console.log(err);
            showDefaultErrorAlert(err.response.data.error);
            setLoading(false);
          }
        });
    }

    setCommentData({...commentData, commentContent: ''});
  };

  const headerContent = {
    leftItemContents: {
      type: 'image',
      content: require('../../assets/images/arrow-left.png'),
      navigateScreen: 'CommunityScreen',
    },
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header headerContent={headerContent} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',

                width: wp(80),
              }}>
              <View
                style={{
                  width: wp(70),
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    paddingLeft: 30,
                  }}>
                  신고하기
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Image
                  onPress={() => {
                    console.log('clicked');
                  }}
                  source={require('../../assets/images/cancel.png')}
                  resizeMode="contain"
                  style={{width: 38, height: 38}}
                />
              </TouchableOpacity>
            </View>
            {reportItem?.map(item => (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  _reportPostToAdmin(item.label);
                  setModalVisible(false);
                }}>
                <Text style={styles.textStyle}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
                {moment(postData?.created_at).toString().slice(0, -12)}
              </Text>
              <Image
                source={require('../../assets/communityIcons/verticalBar.png')}
                style={{resizeMode: 'contain', marginHorizontal: hp(1)}}
              />
              {postData?.userId?._id === currentUser?._id ? (
                <TouchableOpacity
                  style={{marginLeft: wp(2)}}
                  onPress={() => {
                    _deletePost(postData._id);
                  }}>
                  <Text
                    style={{color: '#878787', fontSize: 12, fontWeight: '500'}}>
                    삭제
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{marginLeft: wp(2)}}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text
                    style={{color: '#878787', fontSize: 12, fontWeight: '500'}}>
                    신고
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View style={{marginHorizontal: hp(2), marginVertical: hp(1)}}>
          <Text style={{color: '#525252', fontSize: 13, marginVertical: 2}}>
            {postData?.content}
          </Text>
        </View>
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
                marginHorizontal: hp(2),
              }}>
              {postData?.imageList?.map(img => (
                <Animated.View
                  style={{
                    width: windowWidth - 34.1601,
                    height: 270,
                  }}
                  key={img.fileLocation}>
                  <TouchableOpacity
                    style={{
                      height: 270,
                      width: windowWidth - 34.1601,
                    }}
                    onPress={() => {
                      navigateTo('FullImageViewScreen', {data: img});
                    }}>
                    <Image
                      source={{uri: img}}
                      style={{
                        resizeMode: 'cover',
                        borderRadius: 3,
                        height: 270,
                        width: windowWidth - 34.1601,
                      }}
                    />
                  </TouchableOpacity>
                </Animated.View>
              ))}
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
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                const postdatas = {};
                Object.assign(postdatas, {
                  postId: postData._id,
                  userId: currentUser?._id,
                });
                _likefunction(postdatas);
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
                {postData?.myLikes?.length}
              </Text>
              {/* )} */}
            </TouchableOpacity>
          </View>
        </View>
        {postCommentList?.length > 0 ? (
          <>
            {postCommentList?.map(comment => (
              <CommentComponent
                postCommentData={comment}
                setCommentData={setCommentData}
                commentData={commentData}
                commentInputRef={commentInputRef}
                setDeleteCommentId={setDeleteCommentId}
              />
            ))}
          </>
        ) : (
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image
              source={require('../../assets/communityIcons/commentIcon.png')}
              style={{width: 30, height: 30}}
              resizeMode="contain"
            />
            <Text style={{color: '#A4A4A4', fontSize: 16, marginTop: hp(1)}}>
              아직 등록된 댓글이 없습니다.
            </Text>
          </View>
        )}
      </ScrollView>
      {/* bottom comment input container */}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View
          style={{
            backgroundColor: '#fff',

            marginHorizontal: hp(2),
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            width: wp(90),
            height: 110,
          }}>
          <TextInput
            autoCorrect={false}
            ref={commentInputRef}
            value={commentData.commentContent}
            multiline={true}
            style={{
              color: 'black',
              width: wp(90),
              //   width: Platform.OS === 'android' ? 270 : 300,
              borderWidth: 1,
              borderColor: '#878787',
              backgroundColor: '#fff',
              paddingLeft: 10,
              paddingRight: 65,
              height: 84,
            }}
            autoCapitalize="none"
            onChangeText={value => {
              if (value.length <= 500) {
                setCommentData({...commentData, commentContent: value});

                let textlen = value.length;

                setTotalTextLength(textlen);
              } else {
                Toast.show({
                  type: 'info',
                  text1: '글자 한도가 500자입니다.',
                  visibilityTime: 2000,
                });
              }
            }}
            placeholder="댓글을 입력하세요..."
            textAlignVertical="center"
          />
          <View
            style={{
              position: 'absolute',
              right:
                totalTextLength == 0 ? -32 : totalTextLength > 100 ? -20 : -24,
              bottom: 17,
              width: 80,
            }}>
            <Text style={{color: '#A4A4A4', fontSize: 15}}>
              {totalTextLength}/500
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              _createComment();
            }}
            style={{
              //   borderColor: '#878787',
              position: 'absolute',
              right: 10,
              top: 0,
              paddingLeft: 10,
              paddingVertical: Platform.OS === 'android' ? 10 : 10,
            }}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#204EE2"
                style={{
                  flex: 1,
                  alignItems: 'center',
                  top: 150,
                  left: 180,
                  position: 'absolute',
                  zIndex: 9000,
                }}
              />
            ) : (
              <Text
                style={{
                  color: '#8A8D95',
                  fontSize: 16,
                  position: 'absolute',
                  top: 20,
                  right: 0,
                }}>
                {'입력'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default UserPostDetailScreen;

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 11,
    color: '#000000',
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
    shadowColor: '#000',
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
    color: '#000',

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
