import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
import editIcon from '../../assets/communityIcons/editIcon.png';
import {RFPercentage} from 'react-native-responsive-fontsize';
import React, {useState, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {navigateTo} from '../../navigation/utils/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../layout/Header';
import {getAllPosts} from '../../apis/community';
import {showDefaultErrorAlert} from '../../global/global';
import {setPostDataAction} from '../../redux/actions/community';
import UserPostList from './UserPostList';

const {width, height} = Dimensions.get('screen');

const Empty = ({message}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        height: 400,
      }}>
      <Text style={{fontSize: 13, color: '#5C6990'}}>{message}</Text>
    </View>
  );
};

const CommunityScreen = ({route}) => {
  const dispatch = useDispatch();
  const isLogin = useSelector(st => st.oauth.isLogin);
  const postsList = useSelector(st => st.community?.posts);
  const updatePosts = useSelector(st => st.community?.updatePosts);
  const [loading, setLoading] = useState(false);

  const [postList, setPostList] = useState(postsList);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setPostList(postsList);

    return () => {};
  }, [postsList]);

  useEffect(() => {
    if (updatePosts != undefined) {
      let indx = 0;
      let preState = [...postList];
      preState.map((item, index) => {
        if (updatePosts?._id === item._id) {
          indx = index;
        }
      });
      console.log('indx', indx, preState);
      preState[indx] = updatePosts;

      setPostList(preState);
    }

    return () => {};
  }, [updatePosts]);

  const getAllPostsDataRefreshing = async () => {
    getAllPosts()
      .then(res => {
        if (res.data.success) {
          console.log('into if 183 community screen', res.data);
          dispatch(setPostDataAction(res.data.data));
          setIsFetching(false);
        }
      })
      .catch(err => {
        if (err) {
          showDefaultErrorAlert('인터넷 상태가 불안정합니다.');
          setIsFetching(false);
        }
      });
  };
  useEffect(() => {
    if (route.params) {
      if (route?.params?.refreshFlag === true) {
        getAllPostsDataRefreshing();
      }
    }

    return () => {};
  }, [route.params]);

  const onRefresh = async () => {
    setIsFetching(true);
    getAllPostsDataRefreshing();
  };
  const renderItem = ({item}) => <UserPostList postData={item} />;
  const headerContent = {
    middleItemContents: {
      type: 'text',
      content: '커뮤니티',
    },
  };

  useEffect(() => {
    (async function getAllPostsData() {
      setLoading(true);
      await getAllPosts()
        .then(res => {
          if (res.data.success) {
            dispatch(setPostDataAction(res.data.data));
            setLoading(false);
          }
        })
        .catch(err => {
          if (err) {
            showDefaultErrorAlert(err.response.data.error);
            setLoading(false);
          }
        });
    })();
    return () => {};
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header headerContent={headerContent} />

      {loading ? (
        <ActivityIndicator
          size="small"
          color="#204EE2"
          style={{flex: 1, alignItems: 'center'}}
        />
      ) : null}

      <View style={{flex: 1}}>
        {!loading && postList.length > 0 ? (
          <FlatList
            style={{
              flex: 1,
            }}
            data={postList}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={() => {
                  onRefresh();
                }}
              />
            }
            progressViewOffset={100}
          />
        ) : (
          <>{!loading && <Empty message={'등록된 글이 없습니다. '} />}</>
        )}
      </View>
      {/* create post button  */}

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0.2,
            height: 0.2,
          },
          shadowOpacity: 0.65,
          shadowRadius: 0.24,
          borderRadius: 100,
          elevation: 10,
          backgroundColor: '#D0F32E',
        }}>
        <TouchableOpacity
          onPress={() => {
            console.log('click');
            if (!isLogin) {
              Alert.alert(
                '로그인 필요한 서비스입니다.',
                '로그인 하시겠습니까?',
                [
                  {
                    text: '취소',
                    onPress: () => {
                      return null;
                    },
                  },
                  {
                    text: '확인',
                    onPress: () => {
                      navigateTo('LoginScreen');
                    },
                  },
                ],
                {cancelable: false},
              );
            } else {
              navigateTo('CreatePost');
            }
          }}>
          <View
            style={{
              width: 55,
              height: 55,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={editIcon}
              style={{width: wp(6), height: hp(5), resizeMode: 'contain'}}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#F4F7F9',
    height: height,
  },

  text: {
    fontSize: RFPercentage(2.0),

    color: '#9293B4',
  },
  chipsScrollView: {
    position: 'absolute',
    paddingHorizontal: 20,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#9DDADD',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 7,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  selectedCat: {
    backgroundColor: '#F49186',
  },
});
