import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, {useState, useEffect} from 'react';
import {goBack, navigateTo} from '../navigation/utils/RootNavigation';
import Header from '../layout/Header';
import FONTSIZE from '../constants/fontSize';
import COLOR from '../constants/colors';
import {launchImageLibrary} from 'react-native-image-picker';
import {showDefaultErrorAlert} from '../global/global';
import {connect, useDispatch} from 'react-redux';
import newItem from '../constants/newItem.json';
import {createNewItemData} from '../redux/actions/common';
import Toast from 'react-native-toast-message';

const mapDispatchToProps = (st, ownProps) => {
  const storee = st;
  const new_item_data = st?.common?.new_item_data;
  return {
    storee,
    new_item_data,
  };
};

const EditFirst = props => {
  const {storee, new_item_data} = props;
  const {type, updateId, product} = props?.route?.params;
  const dispatch = useDispatch();
  const [newItemHolder, setNewItemHolder] = useState({...newItem, type: type});

  useEffect(() => {
    dispatch(createNewItemData(newItemHolder));
  }, [type, newItemHolder]);

  // console.log("THE STORE ====>", storee);
  // console.log('NEW ITEM DATA', new_item_data);

  const headerContent = {
    leftItemContents: {
      type: 'image',
      content: require('../assets/images/arrow-left.png'),
      navigateScreen: () => goBack(),
    },
    middleItemContents: {
      type: 'text',
      content: '용품대여 수정하기',
    },
  };

  const [count, setCount] = useState(product?.stock || 0);

  const decrement = () => {
    if (count > 0) {
      let updatedItem = {...new_item_data, stock: count - 1};
      setNewItemHolder(updatedItem);
      setCount(i => i - 1);
    } else {
      Toast.show({
        type: 'error',
        text1: '0보다 적을 수 없습니다.',
        visibilityTime: 2000,
      });
    }
  };

  let spp = [];
  if (product?.specifications) {
    Object?.keys(product?.specifications)?.map((key, ind) => {
      spp.push({
        id: ind + 1,
        p1: '',
        p2: '',
        d1: key,
        d2: product.specifications[key],
        keyAtt: key,
        valueAtt: product.specifications[key],
      });
    });
  }
  // console.log('spp', spp);
  const [specification, setSpecification] = useState(spp);

  let cc = [];
  product.category.map((cat, ind) => {
    cc.push({
      id: ind + 1,
      p1: '',
      p2: '',
      d1: cat,
      d2: cat,
      keyAtt: cat,
      valueAtt: cat,
    });
  });

  const [category, setCategory] = useState(cc);

  let tt = [];
  product.tag.map((tagg, ind) => {
    tt.push({
      id: ind + 1,
      p1: '',
      p2: '',
      d1: tagg,
      d2: tagg,
      keyAtt: tagg,
      valueAtt: tagg,
    });
  });
  const [tag, setTag] = useState(tt);

  let ci = [];
  product.carousel.map((imU, ind) => {
    ci.push({
      imgUrl: imU,
      mainImgUrl: imU,
      id: ind + 1,
    });
  });

  const [carouselImages, setCarouselImages] = useState(ci);
  let af = [];
  if (product.additional_charges) {
    let afv = [];
    product.additional_charges.map((ac, ind) => {
      Object?.keys(ac?.add_feature_value)?.map((key, indd) => {
        afv.push({
          id: indd + 1,
          p1: '',
          p2: '',
          d1: key,
          d2: ac?.add_feature_value[key],
          keyAtt: key,
          valueAtt: ac?.add_feature_value[key],
        });
      });
      af.push({
        add_feature_title: ac.add_feature_title,
        id: ind + 1,
        add_feature_value: afv,
      });
    });
  }
  const [additionalCharges, setAdditionalCharges] = useState(af);

  // console.log('THE SPEC +++++++++++++++++++', specification);

  const handleDeleteImage = ind => {
    let newCarouselImages = [...carouselImages];
    if (carouselImages.length > 1) {
      newCarouselImages.splice(ind, 1);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Specification을 하나 이상 있어야 합니다.',
        visibilityTime: 2000,
      });
    }
    setCarouselImages(newCarouselImages);
  };

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
      let newCarouselImages = [...carouselImages];
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
      setCarouselImages(newCarouselImages);
    }
  };

  //setting and updatatin specification
  useEffect(() => {
    let updateSpec = {};
    const updateSpecificationstoNewItem = () => {
      specification.map((item, index) => {
        updateSpec[item.keyAtt] = item.valueAtt;
      });
    };
    updateSpecificationstoNewItem();
    // console.log('UPDATED SPEC', updateSpec);
    let updatedItem = {...new_item_data, specifications: updateSpec};
    setNewItemHolder(updatedItem);
  }, [specification]);

  //setting and updatatin carousel data
  useEffect(() => {
    let updateCaro = [];
    const updateCarouseltoNewItem = () => {
      carouselImages.map((item, index) => {
        updateCaro.push(item.mainImgUrl);
      });
    };
    updateCarouseltoNewItem();
    let updatedItem = {...new_item_data, carousel: updateCaro};
    setNewItemHolder(updatedItem);
  }, [carouselImages]);

  //setting and updataing category data
  useEffect(() => {
    let updateCat = [];
    const updateCategorytoNewItem = () => {
      category.map(item => {
        updateCat.push(item.keyAtt);
      });
    };
    updateCategorytoNewItem();
    let updatedItem = {...new_item_data, category: updateCat};
    setNewItemHolder(updatedItem);
  }, [category]);

  //setting and updataing category data
  useEffect(() => {
    let updateTag = [];
    const updateTagtoNewItem = () => {
      category.map(item => {
        updateTag.push(item.keyAtt);
      });
    };
    updateTagtoNewItem();
    let updatedItem = {...new_item_data, tag: updateTag};
    setNewItemHolder(updatedItem);
  }, [tag]);

  useEffect(() => {
    let updateAdditional = [];
    const updateAdditionalToNew = () => {
      additionalCharges.map((item, index) => {
        let newIt = {...item};
        let updateSpec = {};
        const updateSpecificationstoNewItem = () => {
          item.add_feature_value.map((item, index) => {
            updateSpec[item.keyAtt] = item.valueAtt;
          });
        };
        updateSpecificationstoNewItem();
        newIt.add_feature_value = updateSpec;
        updateAdditional.push(newIt);
      });
    };
    updateAdditionalToNew();
    let updatedItem = {...new_item_data, additional_charges: updateAdditional};
    setNewItemHolder(updatedItem);
  }, [additionalCharges]);

  return (
    <View style={{backgroundColor: COLOR.white, flex: 1}}>
      <Header headerContent={headerContent} />
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={{minHeight: hp('100%')}}>
          <Comp1
            isProductName={true}
            onChange={async value => {
              let updatedItem = {...new_item_data, title: value, type: type};
              setNewItemHolder(updatedItem);
            }}
            defaultValue={product?.title}
          />
          <Comp1
            isPrice={true}
            onChange={value => {
              let updatedItem = {...new_item_data, price: Number(value)};
              setNewItemHolder(updatedItem);
            }}
            type="number"
            defaultValue={Number(product?.price)}
          />
          <View style={styles.view1}>
            <Text style={styles.text1}>잔여수량</Text>
            <View style={{width: wp('70%')}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity>
                  <Text style={styles.text2} onPress={decrement}>
                    -
                  </Text>
                </TouchableOpacity>

                <Text style={[styles.text2, styles.text1]}>{count}</Text>
                <TouchableOpacity>
                  <Text
                    style={styles.text2}
                    onPress={() => {
                      setCount(i => i + 1);
                      let updatedItem = {...new_item_data, stock: count + 1};
                      setNewItemHolder(updatedItem);
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text
            style={[
              styles.text1,
              {
                paddingTop: hp('4%'),
                paddingHorizontal: wp('5%'),
                paddingBottom: hp('1%'),
              },
            ]}>
            상세설명
          </Text>
          <Text
            style={{
              paddingHorizontal: wp('5%'),
              fontWeight: '600',
              paddingVertical: hp('0.7%'),
              fontSize: FONTSIZE.m,
            }}>
            카테고리
          </Text>
          {specification.map((sp, index) => {
            return (
              <Comp2
                key={index}
                p1={sp.p1}
                p2={sp.p2}
                d1={sp.d1}
                d2={sp.d2}
                t1={sp.t1}
                ind={index}
                specification={specification}
                setSpecification={setSpecification}
                type="specification"
              />
            );
          })}

          <Comp3
            t1="카테고리 추가하기"
            addSpecification={true}
            specification={specification}
            setSpecification={setSpecification}
          />

          <Text
            style={[
              styles.text1,
              {
                paddingHorizontal: wp('5%'),
                paddingTop: hp('4%'),
                paddingBottom: hp('1%'),
              },
            ]}>
            사진 업로드
          </Text>
          {carouselImages?.map((img, imgIndx) => {
            return (
              <View key={imgIndx}>
                {img?.imgUrl ? (
                  <ImageBackground
                    source={{uri: img?.imgUrl || img?.mainImgUrl}}
                    style={{
                      height: 140,
                      width: wp('90%'),
                      borderWidth: 1,
                      borderColor: 'lightgrey',
                      marginHorizontal: wp('5%'),
                      marginVertical: hp('1%'),
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          backgroundColor: COLOR.white,
                          paddingHorizontal: 7,
                          paddingVertical: 2,
                          textAlign: 'center',
                          textAlignVertical: 'center',
                          color: COLOR.black,
                        }}>
                        {imgIndx + 1}
                      </Text>
                      <Text></Text>
                    </View>
                    {imgIndx !== 0 && (
                      <TouchableOpacity
                        onPress={() => {
                          handleDeleteImage(imgIndx);
                        }}>
                        <Text
                          style={{
                            color: COLOR.white,
                            transform: [{rotate: '45deg'}],
                            fontSize: 40,
                            position: 'absolute',
                            right: 5,
                            top: -35,
                          }}></Text>
                      </TouchableOpacity>
                    )}
                    <Text
                      style={{
                        position: 'absolute',
                        left: '50%',
                        color: 'white',
                        transform: [{translateX: -50}, {translateY: 53}],
                      }}>
                      사진 업로드하기
                    </Text>
                    {/* <TextInput
                        placeholder="설명 추가 …"
                        style={{
                            backgroundColor: '#F8F8F8',
                            fontWeight: '600',
                            marginHorizontal: wp('5%'),
                            paddingLeft: wp('4%'),
                            marginTop: hp('3%'),
                        }}
                    /> */}
                  </ImageBackground>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      pickImage(imgIndx);
                    }}>
                    {(img?.imgUrl === '' || img?.imgUrl === null) && (
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
                          <Text
                            style={{fontSize: FONTSIZE.l, fontWeight: 'bold'}}>
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
              </View>
            );
          })}
          <View>
            <Comp3
              t1="사진 추가하기"
              addImage={true}
              carouselImages={carouselImages}
              setCarouselImages={setCarouselImages}
            />
          </View>
          <Text
            style={[
              styles.text1,
              {
                paddingHorizontal: wp('5%'),
                paddingTop: hp('4%'),
                paddingBottom: hp('1%'),
              },
            ]}>
            Description
          </Text>
          <Comp1
            isDescription={true}
            onChange={value => {
              let updatedItem = {...new_item_data, description: value};
              setNewItemHolder(updatedItem);
            }}
            defaultValue={product.description}
          />
          <View>
            <Text
              style={[
                styles.text1,
                {
                  paddingHorizontal: wp('5%'),
                  paddingTop: hp('4%'),
                  paddingBottom: hp('1%'),
                },
              ]}>
              Category
            </Text>
            {category.map((sp, index) => {
              return (
                <Comp2
                  key={index}
                  p1={sp.p1}
                  p2={sp.p2}
                  t1={sp.t1}
                  d1={sp.d1}
                  d2={sp.d2}
                  ind={index}
                  specification={category}
                  setSpecification={setCategory}
                  type="category"
                />
              );
            })}
            <Comp3
              t1="Add Category"
              addCategory={true}
              specification={category}
              setSpecification={setCategory}
            />
            <Text
              style={[
                styles.text1,
                {
                  paddingHorizontal: wp('5%'),
                  paddingTop: hp('4%'),
                  paddingBottom: hp('1%'),
                },
              ]}>
              Tag
            </Text>
            {tag.map((sp, index) => {
              return (
                <Comp2
                  key={sp.id}
                  p1={sp.p1}
                  p2={sp.p2}
                  d1={sp.d1}
                  d2={sp.d2}
                  t1={sp.t1}
                  ind={index}
                  specification={tag}
                  setSpecification={setTag}
                  type="tag"
                />
              );
            })}
            <Comp3
              t1="Add Tag"
              addTag={true}
              specification={tag}
              setSpecification={setTag}
            />
          </View>
          <Text
            style={[
              styles.text1,
              {
                paddingTop: hp('4%'),
                paddingHorizontal: wp('5%'),
                paddingBottom: hp('1%'),
              },
            ]}>
            Additional Charges
          </Text>
          {additionalCharges.map((sp, index) => {
            return (
              <View key={sp.id}>
                <View style={{width: hp('8%')}}>
                  <TextInput
                    style={{
                      backgroundColor: '#F8F8F8',
                      width: wp('70%'),
                      marginLeft: wp('5%'),
                      fontWeight: '600',
                    }}
                    placeholder={'AC Title'}
                    defaultValue={additionalCharges[index]?.add_feature_title}
                    onChangeText={text => {
                      let newSpecification = [...additionalCharges];
                      newSpecification[index].add_feature_title = text;
                      setAdditionalCharges(newSpecification);
                    }}
                  />
                </View>
                {sp?.add_feature_value?.map((it, ind) => {
                  return (
                    <Comp2
                      key={ind}
                      parInd={index}
                      p1={it.p1}
                      p2={it.p2}
                      d1={it.d1}
                      d2={it.d2}
                      t1={it.t1}
                      ind={ind}
                      specification={additionalCharges}
                      setSpecification={setAdditionalCharges}
                      type="additionalCharges"
                    />
                  );
                })}
                <Comp3
                  t1="Add additional feature"
                  addAdditionalChargeFeature={true}
                  specification={additionalCharges}
                  setSpecification={setAdditionalCharges}
                  parentIndex={index}
                />
              </View>
            );
          })}

          <Comp3
            t1="Add additional Charges"
            addAdditionalCharge={true}
            specification={additionalCharges}
            setSpecification={setAdditionalCharges}
          />
          <Text
            style={[
              styles.text1,
              {
                paddingHorizontal: wp('5%'),
                paddingTop: hp('4%'),
                paddingBottom: hp('1%'),
              },
            ]}>
            Camp Link
          </Text>
          <Comp1
            isCampLink={true}
            onChange={async value => {
              let updatedItem = {...new_item_data, campLink: value};
              setNewItemHolder(updatedItem);
            }}
            defaultValue={product.campLink}
          />
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity
          onPress={() => {
            // let res = false;
            // if (type == 'LOCATION' || type === 'SUBLOCATION') {
            //   category.map(item => {
            //     console.log('into item ', item);
            //     if (item?.p1 != '') {
            //
            //       res = false;
            //       return res;
            //     } else {
            //       res = true;
            //       return res;
            //     }
            //   });

            //   tag.map(item => {
            //     // console.log('into item ', item);
            //     if (item?.p1 != '') {
            //
            //       res = false;
            //       return res;
            //     } else {
            //       res = true;
            //       return res;
            //     }
            //   });
            //   additionalCharges.map(item => {
            //     // console.log('into item ', item);
            //     if (item?.p1 != '') {
            //
            //       res = false;
            //       return res;
            //     } else {
            //       res = true;
            //       return res;
            //     }
            //   });
            //   if (res) {
            //     navigateTo('EditSecondScreen', {
            //       type: type,
            //       updateId: updateId,
            //       product: product,
            //     });
            //   }
            // } else {
            navigateTo('EditSecondScreen', {
              type: type,
              updateId: updateId,
              product: product,
            });
            // }
          }}>
          <View style={[styles.btn, {bottom: 0}]}>
            <Text style={styles.btnText}>수정 완료</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Comp1 = props => {
  const {isPrice, onChange, isCampLink, isDescription, defaultValue} = props;

  let title = '가격';
  let keyPad = 'email-address';

  if (isPrice) {
    title = '가격';
    keyPad = 'number-pad';
  } else if (isCampLink) {
    title = '';
    keyPad = 'email-address';
  } else if (isDescription) {
    title = '';
    keyPad = 'email-address';
  } else {
    title = '상품명';
    keyPad = 'email-address';
  }

  return (
    <View style={styles.view1}>
      {title !== '' && <Text style={styles.text1}>{title}</Text>}
      <TextInput
        keyboardType={keyPad}
        style={styles.textinput1}
        onChangeText={text => {
          onChange(text);
        }}
        defaultValue={isPrice ? defaultValue?.toString() : defaultValue}
      />
    </View>
  );
};
const Comp2 = props => {
  let {p1, p2, d1, d2, t1, ind, specification, setSpecification, type, parInd} =
    props;

  let showSecondField = false;
  if (type === 'specification' || type === 'additionalCharges') {
    showSecondField = true;
  }

  const handleDeleteSpecification = () => {
    console.log('THE INDEX', ind);
    let newSpecification = [...specification];
    if (specification.length > 1) {
      newSpecification.splice(ind, 1);
    } else if (specification.length == 1) {
      if (newSpecification.p1 == undefined) {
        newSpecification.splice(ind);
      }
    }
    setSpecification(newSpecification);
  };

  return (
    <View style={[styles.view1, {paddingBottom: 0, paddingTop: hp('0.1%')}]}>
      <TextInput
        style={{
          backgroundColor: '#F8F8F8',
          width:
            type === 'specification' || type === 'additionalCharges'
              ? wp('23%')
              : wp('70%'),
          height: '80%',
          paddingLeft: wp('3%'),
          fontWeight: '600',
          color: 'black',
        }}
        placeholder={p1}
        defaultValue={d1}
        onChangeText={text => {
          if (type === 'additionalCharges') {
            let newSpecification = [...specification];
            newSpecification[parInd].add_feature_value[ind].keyAtt = text;
            setSpecification(newSpecification);
          } else {
            // console.log('THE SPECIFICATION INDEX', specification, ind);
            let newSpecification = [...specification];
            newSpecification[ind].keyAtt = text;
            setSpecification(newSpecification);
          }
        }}
      />
      {showSecondField && (
        <TextInput
          style={{
            backgroundColor: '#F8F8F8',
            width: wp('55%'),
            height: '80%',
            paddingLeft: wp('3%'),
            fontWeight: '600',
            color: 'black',
          }}
          placeholder={p2}
          defaultValue={d2}
          onChangeText={text => {
            if (type === 'additionalCharges') {
              let newSpecification = [...specification];
              newSpecification[parInd].add_feature_value[ind].valueAtt = text;
              setSpecification(newSpecification);
            } else {
              let newSpecification = [...specification];
              newSpecification[ind].valueAtt = text;
              setSpecification(newSpecification);
            }
          }}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          handleDeleteSpecification();
        }}>
        <Text style={{fontWeight: '600', color: 'black'}}>{t1}</Text>
      </TouchableOpacity>
    </View>
  );
};
const Comp3 = props => {
  let {
    t1,
    addSpecification,
    specification,
    setSpecification,
    addImage,
    carouselImages,
    setCarouselImages,
    addTag,
    addCategory,
    addAdditionalCharge,
    addAdditionalChargeFeature,
    parentIndex,
  } = props;

  const handleAddSpecificaiton = () => {
    if (addAdditionalChargeFeature) {
      let newSpecification = [...specification];
      newSpecification[parentIndex].add_feature_title =
        newSpecification[parentIndex].add_feature_title;
      newSpecification[parentIndex].add_feature_value = [
        ...newSpecification[parentIndex].add_feature_value,
        {
          p1: 'Ex)',
          p2: '코랄',
          keyAtt: '',
          valueAtt: '',
        },
      ];
      setSpecification(newSpecification);
    } else if (addAdditionalCharge) {
      let sp = {
        add_feature_title: '',
        add_feature_value: [
          {
            p1: 'Ex)',
            p2: '코랄',
            keyAtt: '',
            valueAtt: '',
          },
        ],
      };
      let newSpecification = [...specification, sp];
      setSpecification(newSpecification);
    } else {
      let sp = {
        p1: 'Ex)',
        p2: '코랄',
        t1: '삭제',
      };
      let newSpecification = [...specification, sp];
      setSpecification(newSpecification);
    }
  };

  const handleAddImage = () => {
    let ci = {
      imgUrl: '',
      id: carouselImages?.length,
    };
    let newsetCarouselImages = [...carouselImages, ci];
    setCarouselImages(newsetCarouselImages);
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp('1%'),
      }}>
      <TouchableOpacity
        onPress={() => {
          if (
            addSpecification ||
            addCategory ||
            addTag ||
            addAdditionalCharge ||
            addAdditionalChargeFeature
          ) {
            handleAddSpecificaiton();
          } else if (addImage) {
            handleAddImage();
          }
        }}>
        <Text
          style={{
            backgroundColor: 'lightgrey',
            borderRadius: 50,
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            paddingHorizontal: wp('2.6%'),
            textAlign: 'center',
            textAlignVertical: 'center',
            marginRight: wp('4%'),
          }}>
          +
        </Text>
      </TouchableOpacity>
      <Text>{t1}</Text>
    </View>
  );
};

export default connect(mapDispatchToProps, null)(EditFirst);

const styles = StyleSheet.create({
  view1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: wp('70%'),
    height: '80%',
  },
  btn: {
    backgroundColor: '#E5E5E5',
    paddingVertical: hp('2%'),
    width: wp('90%'),
    marginHorizontal: wp('5%'),
    // marginBottom: hp('3%'),
  },
  btnText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: COLOR.black,
  },
});
