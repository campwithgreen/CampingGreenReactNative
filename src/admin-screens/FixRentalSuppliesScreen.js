import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, { useState, useEffect } from 'react';
import Header from '../layout/Header';
import { goBack, navigateTo } from '../navigation/utils/RootNavigation';
import { connect, useDispatch } from 'react-redux';
import { createNewItemData } from '../redux/actions/common';
import COLOR from '../constants/colors';
import FONTSIZE from '../constants/fontSize';
import { launchImageLibrary } from 'react-native-image-picker';
import { createItem } from '../apis/admin';
import { showDefaultErrorAlert } from '../global/global';
import { getAllProducts } from '../apis/product';
import { setProductData } from '../redux/actions/product';


const mapStateToProps = (st, ownProps) => {
  const storee = st;
  const new_item_data = st?.common?.new_item_data;
  return {
    storee,
    new_item_data
  };
};


const headerContent = {
  leftItemContents: {
    type: 'image',
    content: require('../assets/images/arrow-left.png'),
    navigateScreen: () => goBack(),
  },
};

const FixRentalSuppliesScreen = (props) => {

  const { storee, new_item_data } = props;
  console.log("THE MAIN STORE", storee);
  console.log("Proceeding New Item data", new_item_data);
  const type = new_item_data?.type;
  const dispatch = useDispatch();
  const [newItemHolder, setNewItemHolder] = useState(new_item_data);
  console.log("THE TYPE", type);

  const [allFeatures, setAllFeatures] = useState([
    {
      imgUrl: null,
      description: "",
      id: allFeatures?.length + 1 || 1
    }
  ]);

  useEffect(() => {
    let updateSpec = [];
    const updateSpecificationstoNewItem = () => {
      allFeatures.map((feature, ind) => {
        updateSpec.push(
          {
            featureName: feature.FeatureName,
            description: feature.description,
            image: feature.mainImgUrl
          }
        );
      });
    };
    updateSpecificationstoNewItem();
    let updatedItem = { ...new_item_data, allFeatures: updateSpec };
    setNewItemHolder(updatedItem);
  }, [allFeatures]);


  const fetchAndSetProducts = async () => {
    let data = { type: 'PRODUCT' };
    await getAllProducts(data)
      .then(res => {
        if (res) {
          dispatch(setProductData(res.data.data));
        }
      })
      .catch(err => {
        if (err) {
          showDefaultErrorAlert();
        }
      });
  };

  const createNewItem = async () => {
    await createItem(newItemHolder).then((res) => {
      if (res) {
        if (type === "PRODUCT") {
          fetchAndSetProducts();
          ToastAndroid.showWithGravity(`${type} CREATED SUCCESSFULLY`, ToastAndroid.TOP, ToastAndroid.CENTER);
          navigateTo("EquipmentRentalScreen");
        } else if (type === "LOCATION") {
          Alert.alert("Add Sub Location Details",
            "Please add Sub Location details in the parent location created",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Deletion Cancelled"),
                style: "cancel"
              },
              {
                text: "OK", onPress: () => {
                  navigateTo("FillSubLocationFirstScreen", { type: "SUBLOCATION", parLocId: res?.data?.data._id });
                }
              }
            ]);

        } else if (type === "SUBLOCATION") {

        }
      }
    }).catch((err) => {
      console.log("ERROR", err);
      showDefaultErrorAlert();
    });
  };

  useEffect(() => {
    dispatch(createNewItemData(newItemHolder));
  }, [newItemHolder]);


  console.log("ALL FEATURE", allFeatures);

  return (
    <View style={{
      backgroundColor: COLOR.white,
      flex: 1,
    }}>
      <Header headerContent={headerContent} />
      <View>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={{ marginBottom: hp("15%"), minHeight: hp("100%") }}>
            <View>
              {allFeatures.map((item, i) => {
                return <View key={i} style={{ marginVertical: hp("1%") }}>
                  <Comp
                    img={item.imgUrl}
                    id={i + 1}
                    newItemHolder={newItemHolder}
                    setNewItemHolder={setNewItemHolder}
                    imgIndx={i}
                    allFeatures={allFeatures}
                    setAllFeatures={setAllFeatures}
                  />
                </View>;
              })}
            </View>
            {(type === "LOCATION" || type === "SUBLOCATION") &&
              <View>
                <FieldContainer
                  keyPad="numeric"
                  title={"Contact Number"}
                  onChange={(value) => {
                    let updatedItem = { ...newItemHolder };
                    updatedItem.contactNumber = value;
                    setNewItemHolder(updatedItem);
                  }} />
                <FieldContainer
                  keyPad="numeric"
                  title={"Latitude"}
                  onChange={(value) => {
                    let updatedItem = { ...newItemHolder };
                    updatedItem.latitude = value;
                    setNewItemHolder(updatedItem);
                  }} />
                <FieldContainer
                  keyPad="numeric"
                  title={"Longitude"}
                  onChange={(value) => {
                    let updatedItem = { ...newItemHolder };
                    updatedItem.longitude = value;
                    setNewItemHolder(updatedItem);
                  }} />
              </View>
            }
          </View>

        </ScrollView>
        <View style={styles.btn}>
          <TouchableOpacity onPress={() => {
            createNewItem();
          }}>
            <Text style={styles.btnText}>완료</Text>
          </TouchableOpacity>
        </View>
      </View >
    </View >
  );
};

const Comp = (props) => {
  let { img, id, handleFeatureDescription, handleFeatureTitle, imgIndx, allFeatures, setAllFeatures } = props;

  const uploadImage = async (image) => {
    let uploadedUrl = "";
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "campgreen");
    data.append("cloud_name", "dchcqwskd");
    await fetch("https://api.cloudinary.com/v1_1/dchcqwskd/image/upload", {
      method: "post",
      body: data
    })
      .then(resp => resp.json())
      .then(data => {
        console.log("UPLOADED", data);
        uploadedUrl = data.url;
      })
      .catch(err => console.log(err));
    return uploadedUrl;
  };

  //picking image and setting up to newItem
  const pickImage = async (selectedIndx) => {

    let options = {
      saveToPhotos: true,
      mediaType: "photo"
    };
    const result = await launchImageLibrary(options);
    if (result) {
      let newCarouselImages = [...allFeatures];
      newCarouselImages[selectedIndx].imgUrl = result?.assets[0]?.uri;
      let fName = result?.assets[0]?.fileName.split(".")[0];
      await uploadImage({ ...result.assets[0], name: fName }).then((upURL) => {
        newCarouselImages[selectedIndx].mainImgUrl = upURL;
      }).catch((err) => {
        console.log("Image Upload Error", err);
        showDefaultErrorAlert();
      });
      setAllFeatures(newCarouselImages);
    }
  };

  const handleDeleteImage = (ind) => {

    let newCarouselImages = [...allFeatures];
    if (allFeatures.length > 1) {
      allFeatures.splice(ind, 1);
    } else {
      ToastAndroid.showWithGravity("Pls add atleast one specification", ToastAndroid.LONG, ToastAndroid.TOP);
    }
    setAllFeatures(newCarouselImages);

  };


  const handleAdd = () => {
    let newCarouselImages = [...allFeatures,
    {
      imgUrl: null,
      imgDescription: "",
      id: allFeatures?.length + 1 || 1
    }
    ];
    setAllFeatures(newCarouselImages);

  };

  return (
    <View>
      {img ? <View>
        <ImageBackground
          source={{ uri: img }}
          style={{
            height: 300,
            width: wp('100%'),
            borderWidth: 1,
            borderColor: 'lightgrey',
          }}>
          <View style={styles.view}>
            <Text style={styles.num}>{id}</Text>
            <Text></Text>
          </View>
          <TouchableOpacity onPress={() => {
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
          style={{
            paddingLeft: wp('10%'),
            backgroundColor: 'white',
            height: 35,
            color: 'grey',
          }}
          onChangeText={(value) => {
            let newCarouImage = [...allFeatures];
            newCarouImage[imgIndx].FeatureName = value;
            setAllFeatures(newCarouImage);
          }}
        />
        <TextInput
          placeholder="설명 추가 …"
          style={{
            paddingLeft: wp('10%'),
            backgroundColor: 'white',
            height: 35,
            color: 'grey',
          }}
          onChangeText={(value) => {
            let newCarouImage = [...allFeatures];
            newCarouImage[imgIndx].description = value;
            setAllFeatures(newCarouImage);
          }}
        /></View> : <TouchableOpacity
          onPress={() => {
            pickImage(imgIndx);
          }}>
        {(img === "" || img === null) &&
          <View>
            <View style={{
              height: 140,
              width: wp('90%'),
              borderWidth: 1,
              borderColor: 'lightgrey',
              marginHorizontal: wp('5%'),
              marginVertical: hp("1%"),
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Text style={{ fontSize: FONTSIZE.l, fontWeight: "bold" }}>Pic Image</Text>
            </View>
            {imgIndx !== 0 && <TouchableOpacity
              onPress={() => {
                handleDeleteImage(imgIndx);
              }}>
              <Text
                style={{
                  color: COLOR.black,
                  transform: [{ rotate: '45deg' }],
                  fontSize: 40,
                  position: 'absolute',
                  right: 25,
                  top: -150
                }}>
                +
              </Text>
            </TouchableOpacity>}
          </View>
        }

      </TouchableOpacity>}
      {imgIndx === allFeatures.length - 1 && <View style={{ backgroundColor: COLOR.lgrey, marginHorizontal: wp("5%"), paddingVertical: hp("2%") }}>
        <TouchableOpacity onPress={() => {
          handleAdd();
        }}>
          <Text style={{ textAlign: "center" }}>Add More All Features </Text>
        </TouchableOpacity>
      </View>}
    </View>
  );
};

const FieldContainer = (props) => {
  const { title, onChange, keyPad } = props;
  return <View style={styles.view1}>
    {title !== "" && <Text style={styles.text1}>{title}</Text>}
    <View style={{ height: wp("15%"), width: "100%" }}>
      <TextInput
        keyboardType={keyPad}
        style={styles.textinput1}
        onChangeText={(text) => {
          onChange(text);
        }}
      />
    </View>
  </View>;
};

export default connect(mapStateToProps, null)(FixRentalSuppliesScreen);

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
    transform: [{ rotate: '45deg' }],
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
    color: '#000000',
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
  },
});
