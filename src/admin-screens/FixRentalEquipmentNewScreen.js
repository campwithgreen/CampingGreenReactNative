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
import React from 'react';
import { useState } from 'react';
import { goBack } from '../navigation/utils/RootNavigation';
import Header from '../layout/Header';
import FONTSIZE from '../constants/fontSize';
import COLOR from '../constants/colors';
import { launchImageLibrary } from 'react-native-image-picker';
import { createItem } from '../apis/admin';
import { showDefaultErrorAlert } from '../global/global';

const FixRentalEquipmentNewScreen = (props) => {


    console.log(" PRODUCT PROPS", props);


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

    const [newProduct, setNewProduct] = useState(
        {
            "carousel": [
                "https://res.cloudinary.com/campwithgreen/image/upload/v1659273537/camping_items/1_1main_wrwzjs.png",
                "https://res.cloudinary.com/campwithgreen/image/upload/v1659273557/camping_items/1_2main_lihfiw.png"
            ],
            "category": [
                "수영장",
                "힐링",
                "감성"
            ],
            "tag": [],
            "subLocations": [
                {
                    "carousel": [
                        "https://res.cloudinary.com/campwithgreen/image/upload/v1659274695/camping_items/A%CC%81%C3%9FI%CC%A8u%CC%881_wahvet.png",
                        "https://res.cloudinary.com/campwithgreen/image/upload/v1659274699/camping_items/A%CC%81%C3%9FI%CC%A8u%CC%882_tyupsh.png",
                        "https://res.cloudinary.com/campwithgreen/image/upload/v1659274717/camping_items/A%CC%81%C3%9FI%CC%A8u%CC%883_izv5si.png"
                    ],
                    "category": [],
                    "tag": [],
                    "subLocations": [],
                    "hasSublocation": false,
                    "isDisabled": false,
                    "title": "TESTING_LOCATION",
                    "price": 120000,
                    "stock": -2,
                    "type": "SUBLOCATION",
                    "additional_charges": [
                        {
                            "add_feature_title": "인원 추가",
                            "add_feature_value": {
                                "1인 추가": "10000원",
                                "24개월 미만": "무료"
                            }
                        },
                        {
                            "add_feature_title": "바비큐 추가",
                            "add_feature_value": {
                                "바비큐그릴 망, 숯불 포함": "20000원",
                                "숯불 추가 시": "10000원"
                            }
                        }
                    ],
                    "createdAt": "2022-07-11T15:06:17.704Z",
                    "updatedAt": "2022-08-23T17:08:14.261Z",
                    "__v": 1,
                    "specifications": {
                        "인원": "기준 2인/ 최대 4인",
                        "인원추가": "가능",
                        "객실특징": "X",
                        "객실정보": "전기사용가능",
                        "구비시설": "식탁, 에어컨, 커피포트, 침대1(퀸), 소파, 냉장고, 바비큐 수영장",
                        "기준차량": "총 1대"
                    },
                    "checkinTime": "13:00",
                    "checkoutTime": "11:00",
                    "description": "놀터1, 놀터5, 놀터6, 놀터7",
                    "allFeatures": []
                },
                {
                    "carousel": [
                        "https://res.cloudinary.com/campwithgreen/image/upload/v1659279492/camping_items/%E1%84%83%E1%85%A2%E1%84%92%E1%85%A7%E1%86%BC1_mzwqud.png",
                        "https://res.cloudinary.com/campwithgreen/image/upload/v1659279507/camping_items/%E1%84%83%E1%85%A2%E1%84%92%E1%85%A7%E1%86%BC2_de2c35.png",
                        "https://res.cloudinary.com/campwithgreen/image/upload/v1659279521/camping_items/%E1%84%83%E1%85%A2%E1%84%92%E1%85%A7%E1%86%BC3_vepa2a.png"
                    ],
                    "category": [],
                    "tag": [],
                    "subLocations": [],
                    "hasSublocation": false,
                    "isDisabled": false,
                    "title": "대형글램핑장",
                    "description": "놀터2, 놀터3",
                    "price": 150000,
                    "stock": 2,
                    "type": "SUBLOCATION",
                    "additional_charges": [
                        {
                            "add_feature_title": "인원 추가",
                            "add_feature_value": {
                                "1인 추가": "10000원",
                                "24개월 미만": "무료"
                            }
                        },
                        {
                            "add_feature_title": "바비큐 추가",
                            "add_feature_value": {
                                "바비큐그릴 망, 숯불 포함": "20000원",
                                "숯불 추가 시": "10000원"
                            }
                        }
                    ],
                    "createdAt": "2022-07-11T15:06:20.772Z",
                    "updatedAt": "2022-07-25T12:21:23.916Z",
                    "__v": 0,
                    "specifications": {
                        "인원": "기준 4인/ 최대 6인",
                        "인원추가": "가능",
                        "객실특징": "X",
                        "객실정보": "전기사용가능",
                        "구비시설": "식탁, 에어컨, 커피포트, 침대2(퀸 싱글), 소파, 냉장고, 바비큐 수영장",
                        "기준차량": "총 1대"
                    },
                    "checkinTime": "13:00",
                    "checkoutTime": "11:00",
                    "allFeatures": []
                },
                {
                    "carousel": [
                        "https://res.cloudinary.com/campwithgreen/image/upload/v1659280297/camping_items/%E1%84%90%E1%85%B3%E1%86%A8%E1%84%83%E1%85%A2%E1%84%92%E1%85%A7%E1%86%BC1_nco0ei.png",
                        "https://res.cloudinary.com/campwithgreen/image/upload/v1659280308/camping_items/%E1%84%90%E1%85%B3%E1%86%A8%E1%84%83%E1%85%A2%E1%84%92%E1%85%A7%E1%86%BC2_ipnfzr.png",
                        "https://res.cloudinary.com/campwithgreen/image/upload/v1659280322/camping_items/%E1%84%90%E1%85%B3%E1%86%A8%E1%84%83%E1%85%A2%E1%84%92%E1%85%A7%E1%86%BC3_chnivy.png"
                    ],
                    "category": [],
                    "tag": [],
                    "subLocations": [],
                    "hasSublocation": false,
                    "isDisabled": false,
                    "title": "특대형글램핑",
                    "description": "놀터8",
                    "price": 180000,
                    "stock": 1,
                    "type": "SUBLOCATION",
                    "additional_charges": [
                        {
                            "add_feature_title": "인원 추가",
                            "add_feature_value": {
                                "1인 추가": "10000원",
                                "24개월 미만": "무료"
                            }
                        },
                        {
                            "add_feature_title": "바비큐 추가",
                            "add_feature_value": {
                                "바비큐그릴 망, 숯불 포함": "20000원",
                                "숯불 추가 시": "10000원"
                            }
                        }
                    ],
                    "createdAt": "2022-07-13T13:07:41.473Z",
                    "updatedAt": "2022-08-14T16:11:56.131Z",
                    "__v": 1,
                    "specifications": {
                        "인원": "기준 5인/ 최대 7인",
                        "인원추가": "가능",
                        "객실특징": "X",
                        "객실정보": "전기사용가능",
                        "구비시설": " 식탁, 에어컨, 커피포트, 침대7(2층3개, 싱글1), 소파, 냉장고, 바비큐 수영장",
                        "기준차량": "총 1대"
                    },
                    "checkinTime": "13:00",
                    "checkoutTime": "11:00",
                    "allFeatures": []
                }
            ],
            "hasSublocation": true,
            "isDisabled": false,
            "title": "놀터 글램핑",
            "description": "경기도 동두천시 신천로 274-57",
            "type": "LOCATION",
            "specifications": {
                "campIntro": "놀터는 카페를 시작으로 스포츠 공간과 프라이빗한 글램핑을 제공합니다.\n일상에서의 바쁜 생활에서 벗어나 자유로운 공간은 물론 프라이빗한 글램핑을 통해 개인 공간처럼 쉴 수 있는 새로운 “쉼” 공간 입니다. 놀터는 많은 글램핑을 운영하지 않습니다. 놀터만의 공간에서 “쉼”이라는 단어에 맞게 공간 설계하였습니다. 북적이는 캠핑장과 펜션 글램핑장과는 다릅니다.",
                "facilityInfo": "무료 Wi-Fi, 바비큐, 글램핑, 주차가능, 수영장, 노래방, 입퇴실시간 : 15시 – 11시",
                "useInfo": "애완동물 출입 절대 금지\n최대인원 초과 시 입실 불가\n개인 화기류 반입금지\n수건 및 세면도구 미제공\n일회용 부탄가스 미제공",
                "image": "https://res.cloudinary.com/campwithgreen/image/upload/v1659274130/camping_items/%E1%84%86%E1%85%A1%E1%84%8C%E1%85%B5%E1%84%86%E1%85%A1%E1%86%A8_grya1t.png"
            },
            "allFeatures": [],
            "additional_charges": [],
            "latitude": 1234,
            "longitude": 1234567,
            "contactNumber": 6283964311,
            "locationAddress": "Sukhia Darj",
            "price": 120000,
            "phone": "01080001972",
            "campLink": "http://xn—bj0bj0ee1g6v3acle.jdweb.kr/",
            "coordinate": {
                "latitude": 37.9412352,
                "longitude": 127.0522093
            },
            "cheapestSublocation": 120000
        }

    );


    const createNewItem = async () => {
        await createItem(newProduct).then((res) => {
            if (res) {
                console.log("MESSAGE", res.data?.message);
            }
        }).catch((err) => {
            console.log("ERROR", err);
            showDefaultErrorAlert();
        });
    };

    const decrement = () => {
        if (count > 0) {
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

    const [carouselImages, setCarouselImages] = useState([
        {
            imgUrl: "https://res.cloudinary.com/dchcqwskd/image/upload/v1657718078/camping-product-items/map_below_house_uehkjs.png",
            id: carouselImages?.length + 1 || 1
        }
    ]);


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
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "campgreen");
        data.append("cloud_name", "dchcqwskd");
        await fetch("https://api.cloudinary.com/v1_1/dchcqwskd/image/upload",
            {
                method: "post",
                body: data
            })
            .then(resp => resp.json())
            .then(data => {
                console.log("UPLOADED", data);
            })
            .catch(err => console.log(err));
    };

    const pickImage = async (selectedIndx) => {

        setSelectedURL(true);

        let options = {
            saveToPhotos: true,
            mediaType: "photo"
        };

        const result = await launchImageLibrary(options);

        if (result) {
            console.log("CAROUSEL IMAGES ++++++++++", carouselImages);
            let newCarouselImages = [...carouselImages];
            newCarouselImages[selectedIndx].imgUrl = result?.assets[0]?.uri;
            console.log("IMAGE DATA", result);
            let fName = result?.assets[0]?.fileName.split(".")[0];
            // let newFile = {
            //     uri: result.assets[0].uri,
            //     type: `test/${result.assets[0].uri.split(".")[1]}`,
            //     name: `test/${result.assets[0].uri.split(".")[1]}`
            // };
            uploadImage(
                { ...result.assets[0], name: fName });


            setCarouselImages(newCarouselImages);
        }
    };

    console.log("OUTER CI", carouselImages);

    return (
        <View style={{ backgroundColor: 'white' }}>
            <Header headerContent={headerContent} />
            <ScrollView>
                <Comp1 isProductName={true} />
                <Comp1 isPrice={true} />
                <View style={styles.view1}>
                    <Text style={styles.text1}>잔여수량</Text>
                    <View style={{ width: wp('70%') }}>
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
                                <Text style={styles.text2} onPress={() => setCount(i => i + 1)}>
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
                        fontSize: FONTSIZE.m
                    }}>
                    카테고리
                </Text>
                {specification.map((sp, index) => {
                    return <Comp2 key={sp.id} p1={sp.p1} p2={sp.p2} t1={sp.t1} ind={index} specification={specification} setSpecification={setSpecification} />;
                })}
                <Comp3 t1="카테고리 추가하기" addSpecification={true} specification={specification} setSpecification={setSpecification} />
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
                                source={{ uri: img?.imgUrl }}
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
                                            backgroundColor: 'white',
                                            paddingHorizontal: 7,
                                            paddingVertical: 2,
                                            textAlign: 'center',
                                            textAlignVertical: 'center',
                                            color: 'black',
                                        }}>
                                        {imgIndx + 1}
                                    </Text>
                                    <Text></Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleDeleteImage(imgIndx);
                                    }}>
                                    <Text
                                        style={{
                                            color: 'white',
                                            transform: [{ rotate: '45deg' }],
                                            fontSize: 40,
                                            position: 'absolute',
                                            right: 5,
                                            top: -35,
                                        }}>
                                        +
                                    </Text>
                                </TouchableOpacity>
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
                                        <TouchableOpacity
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
                                        </TouchableOpacity>
                                    </View>
                                }

                            </TouchableOpacity>

                        }
                    </View>;
                })}
                <View style={{ paddingBottom: hp('20%') }}>
                    <View >
                        <Comp3 t1="사진 추가하기" addImage={true} carouselImages={carouselImages} setCarouselImages={setCarouselImages} />
                    </View>
                    <TouchableOpacity onPress={() => {
                        console.log("NEXT SLOT");
                        createNewItem();
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
const Comp1 = ({ isPrice }) => {
    return (
        <View style={styles.view1}>
            <Text style={styles.text1}>{isPrice ? "가격" : "상품명"}</Text>
            <TextInput
                keyboardType={isPrice ? "number-pad" : "email-address"}
                style={styles.textinput1}
            />
        </View>
    );
};
const Comp2 = (props) => {

    let { p1, p2, t1, ind, specification, setSpecification } = props;

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
                    width: wp('23%'),
                    height: '80%',
                    paddingLeft: wp('3%'),
                    fontWeight: '600',
                }}
                placeholder={p1}
                defaultValue={specification[ind]?.keyAtt}
                onChangeText={(text) => {
                    let newSpecification = [...specification];
                    newSpecification[ind].keyAtt = text;
                    setSpecification(newSpecification);
                }}
            />
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
                    let newSpecification = [...specification];
                    newSpecification[ind].valueAtt = text;
                    setSpecification(newSpecification);
                }}
            />
            <TouchableOpacity onPress={() => {
                handleDeleteSpecification();
            }}>
                <Text style={{ fontWeight: '600' }}>{t1}</Text>
            </TouchableOpacity>
        </View>
    );
};
const Comp3 = (props) => {


    let { t1, addSpecification, specification, setSpecification, addImage, carouselImages, setCarouselImages } = props;

    const handleAddSpecificaiton = () => {
        let sp = {
            p1: "Ex)",
            p2: "코랄",
            t1: "삭제"
        };
        let newSpecification = [...specification, sp];
        setSpecification(newSpecification);
        console.log("adding Specification");
    };


    const handleAddImage = () => {
        let ci = {
            imgUrl: "",
            id: carouselImages?.length
        };
        let newsetCarouselImages = [...carouselImages, ci];
        setCarouselImages(newsetCarouselImages);
        console.log("adding images");
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
                if (addSpecification) {
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
export default FixRentalEquipmentNewScreen;

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
