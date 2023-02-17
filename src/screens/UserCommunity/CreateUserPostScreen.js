import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {useDispatch, useSelector} from 'react-redux';
import closeIcon from '../../assets/communityIcons/closeIcon.png';
import photoUploadIcon from '../../assets/communityIcons/photoUpload.png';
import backIcon from '../../assets/images/arrow-left.png';
import {navigateTo} from '../../navigation/utils/RootNavigation';
import Toast from 'react-native-toast-message';
import {launchImageLibrary} from 'react-native-image-picker';

import Header from '../../layout/Header';
import {showDefaultErrorAlert} from '../../global/global';
import {createPost} from '../../apis/community';

const CreateUserPostScreen = ({navigation, route}) => {
  const user_id = useSelector(st => st?.oauth?.user_data?.data?._id);
  const [formData, setFormData] = useState(route?.params?.editPostData);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [totalTextLength, setTotalTextLength] = useState(0);

  const [loading, setLoading] = useState(false);

  const _createPost = async () => {
    setLoading(true);

    await uploadImage(selectedFiles)
      .then(upURL => {
        const data = {
          user_id: user_id,
          content: formData.content,
          imageList: upURL,
        };
        createPost(data)
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
              showDefaultErrorAlert('서버 임시적인 오류');
              setLoading(false);
            }
          });
      })
      .catch(err => {
        console.log('Image Upload Error', err);
        showDefaultErrorAlert('Image Upload Error');
      });
  };

  useEffect(() => {
    setFormData({...formData, selectedFiles});

    return () => {};
  }, [selectedFiles]);

  const uploadImage = async image => {
    let urlsList = [];
    for (let i = 0; i < image.length; i++) {
      const uri = image[i].uri;
      const type = image[i].type;
      const name = image[i].fileName;
      const source = {
        uri,
        type,
        name,
      };
      let uploadedUrl = '';
      const data = new FormData();
      data.append('file', source);
      data.append('upload_preset', 'campingGreenposts');
      data.append('cloud_name', 'campwithgreen');
      await fetch('https://api.cloudinary.com/v1_1/campwithgreen/upload', {
        method: 'post',
        body: data,
      })
        .then(resp => resp.json())
        .then(data => {
          console.log('UPLOADED', data);
          let sliceUrl = data.url.slice(4);

          uploadedUrl = `https${sliceUrl}`;
        })
        .catch(err => {
          console.log('error', err);
        });
      urlsList.push(uploadedUrl);
    }
    return urlsList;
  };

  //picking image and setting up to newItem
  const pickImage = async () => {
    let options = {
      saveToPhotos: true,
      mediaType: 'photo',
      selectionLimit: 10,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const result = await launchImageLibrary(options);
    console.log('result', result);
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.error) {
      console.log('ImagePicker Error: ', result.error);
    } else if (result) {
      setSelectedFiles(result.assets);
    }
  };

  const _onPressRemove = img => {
    const filteredList = selectedFiles.filter(item => {
      return item !== img;
    });

    setSelectedFiles(filteredList);
  };
  const headerContent = {
    leftItemContents: {
      type: 'image',
      content: backIcon,
      navigateScreen: 'CommunityScreen',
    },
    middleItemContents: {
      type: 'text',
      content: '게시글 작성',
    },
  };
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Header headerContent={headerContent} />

      <TouchableOpacity
        onPress={() => {
          if (formData.content === undefined) {
            return alert('게시글의 내용을 입력하세요');
          } else {
            _createPost();
          }
        }}
        style={{
          position: 'absolute',
          top: Platform.OS === 'android' ? 15 : 50,
          right: 10,
          zIndex: 90000,
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: Platform.OS === 'android' ? 9 : 15,

          paddingBottom: 15,
        }}>
        <Text style={{fontSize: 15, color: 'gray', fontWeight: '500'}}>
          완료
        </Text>
      </TouchableOpacity>

      <View
        style={{
          width: '100%',
          borderColor: '#D9D9D9',
          borderWidth: 0.7,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View style={{flex: 1, height: hp(45)}}>
          <View
            style={{
              marginVertical: 3,
              height: hp(10),
              backgroundColor: 'red',
              flex: 1,
            }}>
            <TextInput
              autoCorrect={false}
              value={formData?.content}
              multiline={true}
              style={{
                flex: 1,
                color: '#000000',
                lineHeight: 30,
                backgroundColor: '#FFFFFF',
                paddingHorizontal: 15,
              }}
              textAlignVertical="center"
              autoCapitalize="none"
              onChangeText={value => {
                if (value.length <= 3000) {
                  setFormData({...formData, content: value});

                  let textlen = value.length;

                  setTotalTextLength(textlen);
                } else {
                  Toast.show({
                    type: 'info',
                    text1: '글자 한도가 3000자입니다.',
                    visibilityTime: 2000,
                  });
                }
              }}
              placeholder={'내용을 입력해주세요.'}
            />
            <View
              style={{
                backgroundColor: 'white',
                position: 'absolute',
                right: 5,
                bottom: 2,
              }}>
              <Text style={{color: '#A4A4A4', fontSize: 15}}>
                {totalTextLength}/3000
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              borderColor: '#D9D9D9',
              borderWidth: 1,
            }}
          />
          <View style={{marginVertical: 1}}>
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', flexBasis: 3}}>
              <TouchableOpacity
                onPress={() => {
                  if (selectedFiles?.length <= 10) {
                    pickImage();
                  } else {
                    Toast.show({
                      type: 'info',
                      text1: '한번에 최대 10개 사진만 선택 가능합니다.',
                      visibilityTime: 2000,
                    });
                  }
                }}
                style={{
                  width: 106,
                  height: 106,
                  backgroundColor: '#F4F7F9',
                  marginHorizontal: 14,
                  marginTop: 14,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#D9D9D9',
                }}>
                <Image
                  source={photoUploadIcon}
                  style={{
                    width: 50,
                    height: 50,

                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,

                    color: '#A4A4A4',
                  }}>
                  사진(최대 10장)
                </Text>
              </TouchableOpacity>
              {selectedFiles?.length <= 0
                ? null
                : selectedFiles?.map(img => (
                    <View style={{alignItems: 'flex-end'}}>
                      <TouchableOpacity
                        style={{top: 10, zIndex: 90000, right: 2}}
                        onPress={() => {
                          _onPressRemove(img);
                        }}>
                        <Image
                          source={closeIcon}
                          style={{
                            width: 12,
                            height: 12,
                            resizeMode: 'contain',
                          }}
                        />
                      </TouchableOpacity>
                      <Image
                        source={{
                          uri: img.uri,
                        }}
                        style={{
                          width: 100,
                          height: 100,
                          marginHorizontal: 5,
                          marginVertical: 5,
                          borderRadius: 20,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  ))}
            </View>
          </View>
          {/* <View
            style={{
              width: '100%',
              borderColor: '#F4F7F9',
              borderWidth: 1,
              marginTop: 13,
            }}
          /> */}
        </View>
      </ScrollView>

      {loading && (
        <ActivityIndicator
          size="small"
          color="#55C595"
          style={{
            flex: 1,
            alignItems: 'center',
            top: 150,
            left: 180,
            position: 'absolute',
            zIndex: 9000,
          }}
        />
      )}
    </View>
  );
};

export default CreateUserPostScreen;

const styles = StyleSheet.create({});
