import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, {useState, useEffect} from 'react';
import Header from '../layout/Header';
import {goBack, navigateTo} from '../navigation/utils/RootNavigation';
import {connect, useDispatch} from 'react-redux';
import {createNewItemData} from '../redux/actions/common';
import COLOR from '../constants/colors';
import FONTSIZE from '../constants/fontSize';
import {launchImageLibrary} from 'react-native-image-picker';
import {addSubLocation, createItem, updateItem} from '../apis/admin';
import {showDefaultErrorAlert} from '../global/global';
import {getAllProducts} from '../apis/product';
import {setProductData, setLocationData} from '../redux/actions/product';
import Toast from 'react-native-toast-message';

const mapStateToProps = (st, ownProps) => {
  const storee = st;
  const new_item_data = st?.common?.new_item_data;
  return {
    storee,
    new_item_data,
  };
};

const headerContent = {
  leftItemContents: {
    type: 'image',
    content: require('../assets/images/arrow-left.png'),
    navigateScreen: () => goBack(),
  },
};

const EditSecond = props => {
  const {storee, new_item_data} = props;
  // console.log("THE MAIN STORE", storee);
  // console.log('Proceeding New Item data', new_item_data);
  const {type, updateId, product} = props?.route?.params;

  const dispatch = useDispatch();
  const [newItemHolder, setNewItemHolder] = useState(new_item_data);
  const [latitude, setLatitude] = useState(product?.coordinate?.latitude);
  const [longitude, setLongitude] = useState(product?.coordinate?.longitude);

  // console.log('THE TYPE =========>', type, updateId, props);

  // console.log('PROD latitude', latitude, longitude);

  let aff = [];
  if (product.allFeatures) {
    product?.allFeatures?.map((af, ind) => {
      aff.push({
        featureName: af.featureName,
        imgUrl: af.image,
        description: af.description,
        id: ind + 1,
      });
    });
  }
  // console.log('THE AFF ITEM', product.coordinate.latitude);
  const [allFeatures, setAllFeatures] = useState(aff);

  useEffect(() => {
    let updateSpec = [];
    const updateSpecificationstoNewItem = () => {
      allFeatures?.map((feature, ind) => {
        updateSpec.push({
          featureName: feature.FeatureName,
          description: feature.description,
          image: feature.imgUrl,
        });
      });
    };
    updateSpecificationstoNewItem();
    let updatedItem = {...newItemHolder, allFeatures: updateSpec};
    setNewItemHolder(updatedItem);
  }, [allFeatures]);

  const fetchAndSetProducts = async fetchType => {
    let data = {type: fetchType};
    await getAllProducts(data)
      .then(res => {
        if (res) {
          if (fetchType === 'PRODUCT') {
            dispatch(setProductData(res.data.data));
          } else if (fetchType === 'LOCATION') {
            dispatch(setLocationData(res.data.data));
          }
        }
      })
      .catch(err => {
        if (err) {
          showDefaultErrorAlert();
        }
      });
  };

  const updateItemData = async () => {
    if (
      (type == 'LOCATION' || type == 'SUBLOCATION') &&
      latitude &&
      longitude
    ) {
      let coordinates = {
        latitude: latitude || '',
        longitude: longitude || '',
      };
      let updatedItem = {...newItemHolder};
      updatedItem.coordinate = coordinates;

      setNewItemHolder(updatedItem);
    }
    console.log('final newItemHolder', newItemHolder);
    await updateItem(newItemHolder, updateId)
      .then(res => {
        if (res) {
          fetchAndSetProducts(type);
          Toast.show({
            type: 'success',
            text1: '성공적으로 수정되었습니다.',
            visibilityTime: 2000,
          });

          if (type === 'LOCATION') {
            navigateTo('FourteenthScreen');
          } else {
            navigateTo('EquipmentRentalScreen');
          }
        }
      })
      .catch(err => {
        console.log('ERROR', err);
        showDefaultErrorAlert();
      });
  };

  useEffect(() => {
    dispatch(createNewItemData(newItemHolder));
  }, [newItemHolder]);

  return (
    <View
      style={{
        backgroundColor: COLOR.white,
        flex: 1,
      }}>
      <Header headerContent={headerContent} />
      <View>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{marginBottom: 30}}>
          <View style={{marginBottom: hp('15%'), minHeight: hp('100%')}}>
            <View>
              {allFeatures?.map((item, i) => {
                return (
                  <View key={i} style={{marginVertical: hp('1%')}}>
                    <Comp
                      img={item.imgUrl}
                      item={item}
                      id={i + 1}
                      newItemHolder={newItemHolder}
                      setNewItemHolder={setNewItemHolder}
                      imgIndx={i}
                      allFeatures={allFeatures}
                      setAllFeatures={setAllFeatures}
                    />
                  </View>
                );
              })}
            </View>
            {(type === 'LOCATION' || type === 'SUBLOCATION') && (
              <View>
                <FieldContainer
                  keyPad="numeric"
                  title={'Contact Number'}
                  defaultValue={product.phone}
                  onChange={value => {
                    let updatedItem = {...newItemHolder};
                    updatedItem.phone = value;
                    setNewItemHolder(updatedItem);
                  }}
                />

                <FieldContainer
                  keyPad="numeric"
                  title={'Latitude'}
                  defaultValue={product.coordinate.latitude}
                  onChange={value => {
                    setLatitude(value);
                    // let updatedItem = {...newItemHolder};
                    // updatedItem.latitude = value;
                    // setNewItemHolder(updatedItem);
                  }}
                />

                <FieldContainer
                  keyPad="numeric"
                  title={'Longitude'}
                  defaultValue={product.coordinate.longitude}
                  onChange={value => {
                    setLongitude(value);
                    // let updatedItem = {...newItemHolder};
                    // updatedItem.longitude = value;
                    // setNewItemHolder(updatedItem);
                  }}
                />

                <FieldContainer
                  keyPad="numeric"
                  title={'Check In Time'}
                  defaultValue={product.checkinTime}
                  onChange={value => {
                    let updatedItem = {...newItemHolder};
                    updatedItem.checkinTime = value;
                    setNewItemHolder(updatedItem);
                  }}
                />
                <FieldContainer
                  keyPad="numeric"
                  title={'Check Out Time'}
                  defaultValue={product.checkoutTime}
                  onChange={value => {
                    let updatedItem = {...newItemHolder};
                    updatedItem.checkoutTime = value;
                    setNewItemHolder(updatedItem);
                  }}
                />
              </View>
            )}
          </View>
        </ScrollView>
        <View style={[styles.btn, {bottom: 100}]}>
          <TouchableOpacity
            onPress={() => {
              updateItemData();
            }}>
            <Text style={styles.btnText}>완료</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Comp = props => {
  let {
    img,
    id,
    handleFeatureDescription,
    handleFeatureTitle,
    imgIndx,
    allFeatures,
    setAllFeatures,
    item,
  } = props;

  const uploadImage = async image => {
    let uploadedUrl = '';
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'campgreen');
    data.append('cloud_name', 'dchcqwskd');
    await fetch('https://api.cloudinary.com/v1_1/dchcqwskd/image/upload', {
      method: 'post',
      body: data,
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('UPLOADED', data);
        uploadedUrl = data.url;
      })
      .catch(err => console.log(err));
    return uploadedUrl;
  };

  //picking image and setting up to newItem
  const pickImage = async selectedIndx => {
    let options = {
      saveToPhotos: true,
      mediaType: 'photo',
    };
    const result = await launchImageLibrary(options);
    if (result) {
      let newCarouselImages = [...allFeatures];
      newCarouselImages[selectedIndx].imgUrl = result?.assets[0]?.uri;
      let fName = result?.assets[0]?.fileName.split('.')[0];
      await uploadImage({...result.assets[0], name: fName})
        .then(upURL => {
          newCarouselImages[selectedIndx].mainImgUrl = upURL;
        })
        .catch(err => {
          console.log('Image Upload Error', err);
          showDefaultErrorAlert();
        });
      setAllFeatures(newCarouselImages);
    }
  };

  const handleDeleteImage = ind => {
    let newCarouselImages = [...allFeatures];
    if (allFeatures.length > 1) {
      allFeatures.splice(ind, 1);
    } else {
      Toast.show({
        type: 'error',
        text1: '한 개 이상 specification을 입력해주세요.',
        visibilityTime: 2000,
      });
    }
    setAllFeatures(newCarouselImages);
  };

  const handleAdd = () => {
    let newCarouselImages = [
      ...allFeatures,
      {
        imgUrl: null,
        imgDescription: '',
        id: allFeatures?.length + 1 || 1,
      },
    ];
    setAllFeatures(newCarouselImages);
  };

  return (
    <View>
      {img ? (
        <View>
          <ImageBackground
            source={{uri: img}}
            style={{
              height: 300,
              width: wp('100%'),
              borderWidth: 1,
              borderColor: 'lightgrey',
            }}>
            <View style={styles.view}>
              {id && <Text style={styles.num}>{id}</Text>}
              <Text></Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                let newCarouImage = [...allFeatures];
                newCarouImage[imgIndx].imgUrl = null;
                newCarouImage[imgIndx].image = null;
                setAllFeatures(newCarouImage);
              }}>
              <Text style={styles.cross}>+</Text>
            </TouchableOpacity>
          </ImageBackground>
          <TextInput
            placeholder="Add Feature Title…"
            placeholderTextColor={'gray'}
            style={{
              paddingLeft: wp('10%'),
              backgroundColor: 'white',
              height: 35,
              color: 'grey',
            }}
            defaultValue={item?.featureName}
            onChangeText={value => {
              let newCarouImage = [...allFeatures];
              newCarouImage[imgIndx].FeatureName = value;
              setAllFeatures(newCarouImage);
            }}
          />
          <TextInput
            placeholder="설명 추가 …"
            placeholderTextColor={'gray'}
            style={{
              paddingLeft: wp('10%'),
              backgroundColor: 'white',
              height: 35,
              color: 'grey',
            }}
            defaultValue={item.description}
            onChangeText={value => {
              let newCarouImage = [...allFeatures];
              newCarouImage[imgIndx].description = value;
              setAllFeatures(newCarouImage);
            }}
          />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            pickImage(imgIndx);
          }}>
          {(img === '' || img === null) && (
            <View>
              <View
                style={{
                  height: 140,
                  width: wp('90%'),
                  borderWidth: 1,
                  borderColor: 'lightgrey',
                  marginHorizontal: wp('5%'),
                  marginVertical: hp('1%'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: FONTSIZE.l, fontWeight: 'bold'}}>
                  Pic Image
                </Text>
              </View>
              {imgIndx !== 0 && (
                <TouchableOpacity
                  onPress={() => {
                    handleDeleteImage(imgIndx);
                  }}>
                  <Text
                    style={{
                      color: COLOR.black,
                      transform: [{rotate: '45deg'}],
                      fontSize: 40,
                      position: 'absolute',
                      right: 25,
                      top: -150,
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </TouchableOpacity>
      )}
      {imgIndx === allFeatures.length - 1 && (
        <View
          style={{
            backgroundColor: COLOR.lgrey,
            marginHorizontal: wp('5%'),
            paddingVertical: hp('2%'),
          }}>
          <TouchableOpacity
            onPress={() => {
              handleAdd();
            }}>
            <Text style={{textAlign: 'center'}}>Add More All Features </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const FieldContainer = props => {
  const {title, onChange, keyPad, defaultValue} = props;

  return (
    <View style={styles.view1}>
      {title !== '' && <Text style={styles.text1}>{title}</Text>}
      <View style={{height: wp('15%'), width: '100%'}}>
        <TextInput
          keyboardType={keyPad}
          style={styles.textinput1}
          defaultValue={defaultValue}
          // value={defaultValue}
          onChangeText={text => {
            onChange(text);
          }}
        />
      </View>
    </View>
  );
};

export default connect(mapStateToProps, null)(EditSecond);

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    alignItems: 'flex-start',
  },
  num: {
    backgroundColor: 'white',
    paddingHorizontal: 7,
    paddingVertical: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
  },
  cross: {
    color: 'white',
    transform: [{rotate: '45deg'}],
    fontSize: 40,
    position: 'absolute',
    right: 5,
    top: -12,
  },
  btn: {
    backgroundColor: '#E5E5E5',
    position: 'absolute',
    bottom: 80,
    paddingVertical: hp('2%'),
    width: wp('90%'),
    marginHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  btnText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black000',
  },
  view1: {
    display: 'flex',
    marginHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
  },
  text1: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  text2: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('0.7%'),
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textinput1: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    width: '100%',
    height: '80%',
    color: 'black',
  },
});
