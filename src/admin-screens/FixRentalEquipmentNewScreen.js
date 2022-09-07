import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
    Image
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, { useState, useEffect } from 'react';
import { goBack, navigateTo } from '../navigation/utils/RootNavigation';
import Header from '../layout/Header';
import FONTSIZE from '../constants/fontSize';
import COLOR from '../constants/colors';
import { launchImageLibrary } from 'react-native-image-picker';
import { createItem } from '../apis/admin';
import { showDefaultErrorAlert } from '../global/global';
import { connect, useDispatch } from 'react-redux';
import newItem from "../constants/newItem.json";
import newItemLoc from "../constants/newItemLoc.json";



const mapDispatchToProps = (st, ownProps) => {

    const storee = st;
    const new_item_data = st?.common?.new_item_data;
    return {
        storee,
        new_item_data
    };

};

const FixRentalEquipmentNewScreen = (props) => {


    const { storee, new_item_data } = props;
    const { type } = props?.route?.params;
    const dispatch = useDispatch();
    const [newItemHolder, setNewItemHolder] = useState({ ...newItem, type: type });
    const [newItemHolderLoc, setNewItemHolderLoc] = useState(newItemHolderLoc);



    useEffect(() => {

        if (type === "PRODUCT") {
            dispatch(createNewItemData(newItemHolder));
        } else if (type === "LOCATION") {
            dispatch(createNewItemData(newItemHolderLoc));
        }

    }, [type, newItemHolder]);



    console.log("THE STORE ====>", storee);
    console.log("NEW ITEM DATA", new_item_data);

    const headerContent = {
        leftItemContents: {
            type: 'image',
            content: require('../assets/images/arrow-left.png'),
            navigateScreen: () => goBack(),
        },
        middleItemContents: {
            type: "text",
            content: "용품대여 수정하기"
        }
    };

    const [count, setCount] = useState(0);
    // const [newProduct, setNewProduct] = useState(
    //     {
    //         "carousel": [
    //             "https://res.cloudinary.com/campwithgreen/image/upload/v1658571335/camping_items/몬타나_N블랙_텐트_uh142q.png",
    //             "https://res.cloudinary.com/campwithgreen/image/upload/v1658847821/camping_items/2_ghuupy.png"
    //         ],
    //         "category": [
    //             "텐트"
    //         ],
    //         "tag": [],
    //         "subLocations": [],
    //         "hasSublocation": false,
    //         "isDisabled": false,
    //         "title": "DELETING",
    //         "description": "",
    //         "price": 50000,
    //         "stock": 1,
    //         "type": "PRODUCT",
    //         "specifications": {
    //             "크기": "본체 220X250X115cm(설치시),이너텐트 220X150X110cm(설치시),그라운드시트 220X145cm",
    //             "중량": "2.6kg",
    //             "색상": "black",
    //             "재질": "본체 나일론,이너텐트 나일론,바닥 나일론,그라운드시트 폴리에스터,메인폴 알루미늄    "
    //         },
    //         "allFeatures": [
    //             {
    //                 "featureName": "HEY",
    //                 "image": "https://res.cloudinary.com/campwithgreen/image/upload/v1658847995/camping_items/1_zxo1wh.png",
    //                 "description": "01. 고급스러운 탄 컬러의 나일론 원단을 사용하여 유니크한 스타일은 물론 내구성과 안정성이 우수"
    //             },
    //             {
    //                 "featureName": "TEST",
    //                 "image": "https://res.cloudinary.com/campwithgreen/image/upload/v1658848115/camping_items/2_eyuom8.png",
    //                 "description": "02. 이너텐트만 설치하여 피크닉 및 타프가든 내부의 이너텐트로 활용이 가능"
    //             },
    //             {
    //                 "featureName": "CODING_HUMANS",
    //                 "image": "https://res.cloudinary.com/campwithgreen/image/upload/v1658848150/camping_items/3_xsmhxp.png",
    //                 "description": "03. 개방감 탁월한 이너텐트 메쉬창"
    //             },
    //             {
    //                 "featureName": "CODERS",
    //                 "image": "https://res.cloudinary.com/campwithgreen/image/upload/v1658848184/camping_items/4_fcborj.png",
    //                 "description": "04. 빠른 설치를 위한 SR벌트 적용"
    //             },
    //             {
    //                 "featureName": "그라운드시트"
    //             },
    //             {
    //                 "featureName": "수납케이스"
    //             }
    //         ],
    //         "additional_charges": [],
    //     }
    // );




    const decrement = () => {
        if (count > 0) {
            let updatedItem = { ...new_item_data, stock: count - 1 };
            setNewItemHolder(updatedItem);
            setCount(i => i - 1);
        } else {
            ToastAndroid.showWithGravity("Stock unit cannot be lower than 0", ToastAndroid.LONG, ToastAndroid.TOP);
        }
    };

    const [specification, setSpecification] = useState([
        {
            id: specification?.length + 1 || 1,
            p1: "Ex)",
            p2: "코랄",
            keyAtt: "",
            valueAtt: "",
        }
    ]);
    const [category, setCategory] = useState([
        {
            id: category?.length + 1 || 1,
            p1: "Ex)",
            p2: "코랄",
            keyAtt: "",
            valueAtt: "",
        }
    ]);
    const [tag, setTag] = useState([
        {
            id: tag?.length + 1 || 1,
            p1: "Ex)",
            p2: "코랄",
            keyAtt: "",
            valueAtt: "",
        }
    ]);
    const [carouselImages, setCarouselImages] = useState([
        {
            imgUrl: null,
            mainImgUrl: "",
            id: carouselImages?.length + 1 || 1
        }
    ]);
    const [additionalCharges, setAdditionalCharges] = useState([
        {
            add_feature_title: "",
            id: additionalCharges?.length + 1 || 1,
            add_feature_value: [{
                id: additionalCharges?.add_feature_value.length + 1 || 1,
                p1: "Ex)",
                p2: "코랄",
                keyAtt: "",
                valueAtt: "",
            }]
        }
    ]);


    console.log("ADDITIONAL CHARGES", additionalCharges);


    const handleDeleteImage = (ind) => {

        let newCarouselImages = [...carouselImages];
        if (carouselImages.length > 1) {
            newCarouselImages.splice(ind, 1);
        } else {
            ToastAndroid.showWithGravity("Pls add atleast one specification", ToastAndroid.LONG, ToastAndroid.TOP);
        }
        setCarouselImages(newCarouselImages);

    };

    const [selectedURL, setSelectedURL] = useState(null);


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

        setSelectedURL(true);
        let options = {
            saveToPhotos: true,
            mediaType: "photo"
        };
        const result = await launchImageLibrary(options);
        if (result) {
            let newCarouselImages = [...carouselImages];
            newCarouselImages[selectedIndx].imgUrl = result?.assets[0]?.uri;
            let fName = result?.assets[0]?.fileName.split(".")[0];
            await uploadImage({ ...result.assets[0], name: fName }).then((upURL) => {
                newCarouselImages[selectedIndx].mainImgUrl = upURL;
            }).catch((err) => {
                console.log("Image Upload Error", err);
                showDefaultErrorAlert();
            });
            setCarouselImages(newCarouselImages);
        }
    };

    console.log("Carousel Images", category, tag);

    //setting and updatatin specification
    useEffect(() => {

        let updateSpec = {};
        const updateSpecificationstoNewItem = () => {
            specification.map((item, index) => {
                updateSpec[item.keyAtt] = item.valueAtt;
            });

        };
        updateSpecificationstoNewItem();
        console.log("UPDATED SPEC", updateSpec);
        let updatedItem = { ...new_item_data, specifications: updateSpec };
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
        console.log("UPDATED SPEC", updateCaro);
        let updatedItem = { ...new_item_data, carousel: updateCaro };
        setNewItemHolder(updatedItem);

    }, [carouselImages]);

    //setting and updataing category data
    useEffect(() => {

        let updateCat = [];
        const updateCategorytoNewItem = () => {
            category.map((item) => {
                updateCat.push(item.keyAtt);
            });
        };
        updateCategorytoNewItem();
        let updatedItem = { ...new_item_data, category: updateCat };
        setNewItemHolder(updatedItem);

    }, [category]);


    //setting and updataing category data
    useEffect(() => {

        let updateTag = [];
        const updateTagtoNewItem = () => {
            category.map((item) => {
                updateTag.push(item.keyAtt);
            });
        };
        updateTagtoNewItem();
        let updatedItem = { ...new_item_data, tag: updateTag };
        setNewItemHolder(updatedItem);

    }, [tag]);

    useEffect(() => {

        let updateAdditional = [];
        const updateAdditionalToNew = () => {
            additionalCharges.map((item, index) => {
                let newIt = { ...item };
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
        let updatedItem = { ...new_item_data, additional_charges: updateAdditional };
        setNewItemHolder(updatedItem);

    }, [additionalCharges]);




    return (
        <View style={{ backgroundColor: COLOR.white }}>
            <Header headerContent={headerContent} />
            <ScrollView>
                <Comp1
                    isProductName={true}
                    onChange={async (value) => {
                        let updatedItem = { ...new_item_data, title: value, type: type };
                        setNewItemHolder(updatedItem);
                    }}
                />
                <Comp1
                    isPrice={true}
                    onChange={(value) => {
                        let updatedItem = { ...new_item_data, price: Number(value) };
                        setNewItemHolder(updatedItem);
                    }}
                    type="number"
                />
                <View style={styles.view1}>
                    <Text style={styles.text1}>잔여수량</Text>
                    <View style={{ width: wp('70%') }}>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity>
                                <Text style={styles.text2}
                                    onPress={decrement}>
                                    -
                                </Text>
                            </TouchableOpacity>

                            <Text style={[styles.text2, styles.text1]}>{count}</Text>
                            <TouchableOpacity>
                                <Text
                                    style={styles.text2}
                                    onPress={() => {
                                        setCount(i => i + 1);
                                        let updatedItem = { ...new_item_data, stock: count + 1 };
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
                        }
                    ]}>
                    상세설명
                </Text>
                <Text
                    style={{
                        paddingHorizontal: wp('5%'),
                        fontWeight: '600',
                        paddingVertical: hp('0.7%'),
                        fontSize: FONTSIZE.m
                    }}>
                    카테고리
                </Text>
                {specification.map((sp, index) => {
                    return <Comp2
                        key={sp.id}
                        p1={sp.p1}
                        p2={sp.p2}
                        t1={sp.t1}
                        ind={index}
                        specification={specification}
                        setSpecification={setSpecification}
                        type="specification"
                    />;
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
                    return <View key={imgIndx}>
                        {img?.imgUrl ?
                            <ImageBackground
                                source={{ uri: img?.imgUrl || img?.mainImgUrl }}
                                style={{
                                    height: 140,
                                    width: wp('90%'),
                                    borderWidth: 1,
                                    borderColor: 'lightgrey',
                                    marginHorizontal: wp('5%'),
                                    marginVertical: hp("1%"),
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
                                            color: COLOR.black
                                        }}>
                                        {imgIndx + 1}
                                    </Text>
                                    <Text></Text>
                                </View>
                                {imgIndx !== 0 &&
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleDeleteImage(imgIndx);
                                        }}>
                                        <Text
                                            style={{
                                                color: COLOR.white,
                                                transform: [{ rotate: '45deg' }],
                                                fontSize: 40,
                                                position: 'absolute',
                                                right: 5,
                                                top: -35,
                                            }}>
                                        </Text>
                                    </TouchableOpacity>}
                                <Text
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        color: 'white',
                                        transform: [
                                            { translateX: -50 },
                                            { translateY: 53 }
                                        ],
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
                            :
                            <TouchableOpacity
                                onPress={() => {
                                    pickImage(imgIndx);
                                }}>
                                {(img?.imgUrl === "" || img?.imgUrl === null) &&
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

                            </TouchableOpacity>

                        }
                    </View>;
                })}
                <View >
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
                    onChange={(value) => {
                        let updatedItem = { ...new_item_data, description: value };
                        setNewItemHolder(updatedItem);
                    }}
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
                        return <Comp2
                            key={sp.id}
                            p1={sp.p1}
                            p2={sp.p2}
                            t1={sp.t1}
                            ind={index}
                            specification={category}
                            setSpecification={setCategory}
                            type="category"
                        />;
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
                        return <Comp2
                            key={sp.id}
                            p1={sp.p1}
                            p2={sp.p2}
                            t1={sp.t1}
                            ind={index}
                            specification={tag}
                            setSpecification={setTag}
                            type="tag"
                        />;
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
                        }
                    ]}>
                    Additional Charges
                </Text>
                {additionalCharges.map((sp, index) => {
                    return <View key={sp.id}>
                        <View style={{ width: hp("8%") }}>
                            <TextInput style={{
                                backgroundColor: '#F8F8F8',
                                width: wp("70%"),
                                marginLeft: wp('5%'),
                                fontWeight: '600',
                            }}
                                placeholder={"AC Title"}
                                defaultValue={additionalCharges[index]?.add_feature_title}
                                onChangeText={(text) => {
                                    let newSpecification = [...additionalCharges];
                                    newSpecification[index].add_feature_title = text;
                                    setAdditionalCharges(newSpecification);
                                }} />
                        </View>
                        {sp?.add_feature_value?.map((it, ind) => {
                            return <Comp2
                                key={ind}
                                parInd={index}
                                p1={it.p1}
                                p2={it.p2}
                                t1={it.t1}
                                ind={ind}
                                specification={additionalCharges}
                                setSpecification={setAdditionalCharges}
                                type="additionalCharges"
                            />;
                        })}
                        <Comp3
                            t1="Add additional feature"
                            addAdditionalChargeFeature={true}
                            specification={additionalCharges}
                            setSpecification={setAdditionalCharges}
                            parentIndex={index}
                        />
                    </View>;
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
                    onChange={async (value) => {
                        let updatedItem = { ...new_item_data, campLink: value };
                        setNewItemHolder(updatedItem);
                    }}
                />
                <View style={{ paddingBottom: hp('20%') }}>

                    <TouchableOpacity onPress={() => {
                        navigateTo("FixRentalSuppliesScreen");
                        // createNewItem();
                    }}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>수정 완료</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
};
const Comp1 = (props) => {

    const { isPrice, onChange, isCampLink, isDescription } = props;

    let title = "가격";
    let keyPad = "email-address";

    if (isPrice) {
        title = "가격";
        keyPad = "number-pad";
    } else if (isCampLink) {
        title = "";
        keyPad = "email-address";
    } else if (isDescription) {
        title = "";
        keyPad = "email-address";
    } else {
        title = "상품명";
        keyPad = "email-address";
    }

    return (
        <View style={styles.view1}>
            {title !== "" && <Text style={styles.text1}>{title}</Text>}
            <TextInput
                keyboardType={keyPad}
                style={styles.textinput1}
                onChangeText={(text) => {
                    onChange(text);
                }}
            />
        </View>
    );
};
const Comp2 = (props) => {

    let { p1, p2, t1, ind, specification, setSpecification, type, parInd } = props;

    let showSecondField = false;
    if (type === "specification" || type === "additionalCharges") {
        showSecondField = true;
    }

    const handleDeleteSpecification = () => {
        console.log("THE INDEX", ind);
        let newSpecification = [...specification];
        if (specification.length > 1) {
            newSpecification.splice(ind, 1);
        } else {
            ToastAndroid.showWithGravity("Pls add atleast one specification", ToastAndroid.LONG, ToastAndroid.TOP);
        }
        setSpecification(newSpecification);
    };

    return (
        <View style={[styles.view1, { paddingBottom: 0, paddingTop: hp('0.1%') }]}>
            <TextInput
                style={{
                    backgroundColor: '#F8F8F8',
                    width: type === "specification" || type === "additionalCharges" ? wp('23%') : wp("70%"),
                    height: '80%',
                    paddingLeft: wp('3%'),
                    fontWeight: '600',
                }}
                placeholder={p1}
                defaultValue={specification[ind]?.keyAtt}
                onChangeText={(text) => {
                    if (type === "additionalCharges") {
                        let newSpecification = [...specification];
                        newSpecification[parInd].add_feature_value[ind].keyAtt = text;
                        setSpecification(newSpecification);
                    } else {
                        let newSpecification = [...specification];
                        newSpecification[ind].keyAtt = text;
                        setSpecification(newSpecification);
                    }

                }}
            />
            {showSecondField &&
                <TextInput
                    style={{
                        backgroundColor: '#F8F8F8',
                        width: wp('55%'),
                        height: '80%',
                        paddingLeft: wp('3%'),
                        fontWeight: '600',
                    }}
                    placeholder={p2}
                    defaultValue={specification[ind]?.valueAtt}
                    onChangeText={(text) => {
                        if (type === "additionalCharges") {
                            let newSpecification = [...specification];
                            newSpecification[parInd].add_feature_value[ind].valueAtt = text;
                            setSpecification(newSpecification);
                        } else {
                            let newSpecification = [...specification];
                            newSpecification[ind].valueAtt = text;
                            setSpecification(newSpecification);
                        }

                    }}
                />}
            <TouchableOpacity onPress={() => {
                handleDeleteSpecification();
            }}>
                <Text style={{ fontWeight: '600' }}>{t1}</Text>
            </TouchableOpacity>
        </View>
    );
};
const Comp3 = (props) => {


    let { t1,
        addSpecification,
        specification, setSpecification, addImage, carouselImages,
        setCarouselImages, addTag, addCategory,
        addAdditionalCharge,
        addAdditionalChargeFeature,
        parentIndex
    } = props;

    const handleAddSpecificaiton = () => {
        if (addAdditionalChargeFeature) {
            let newSpecification = [...specification];
            newSpecification[parentIndex].add_feature_title = newSpecification[parentIndex].add_feature_title;
            newSpecification[parentIndex].add_feature_value = [...newSpecification[parentIndex].add_feature_value, {
                p1: "Ex)",
                p2: "코랄",
                keyAtt: "",
                valueAtt: ""
            }];
            setSpecification(newSpecification);
        } else if (addAdditionalCharge) {
            let sp = {
                add_feature_title: "",
                add_feature_value: [{
                    p1: "Ex)",
                    p2: "코랄",
                    keyAtt: "",
                    valueAtt: ""
                }]
            };
            let newSpecification = [...specification, sp];
            setSpecification(newSpecification);
        } else {
            let sp = {
                p1: "Ex)",
                p2: "코랄",
                t1: "삭제"
            };
            let newSpecification = [...specification, sp];
            setSpecification(newSpecification);
        }

    };


    const handleAddImage = () => {
        let ci = {
            imgUrl: "",
            id: carouselImages?.length
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
            <TouchableOpacity onPress={() => {
                if (addSpecification || addCategory || addTag || addAdditionalCharge || addAdditionalChargeFeature) {
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

export default connect(mapDispatchToProps, null)(FixRentalEquipmentNewScreen);

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
        marginVertical: hp("5%")
    },
    btnText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: COLOR.black,
    },
});
