import React from 'react';
import { View, Platform, Dimensions, ImageBackground, StyleSheet, Text } from 'react-native';
import Slick from 'react-native-slick';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';




const Carousel = ({ paginationType }) => {

    let { width, height } = Dimensions.get('window');
    const { backgroundImage } = styles

    const renderPagination = (index, total, context) => {
        return (
            <View
                style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: hp('30%'),
                    left: paginationType === "right" ? wp("80%") : 0,
                    right: 0,
                }}
            >
                <View
                    style={{
                        borderRadius: wp("3%"),
                        padding: 3,
                        paddingHorizontal: 8,
                        backgroundColor: paginationType === "right" ? "#fff" : "black",
                        color: "#ffff",
                    }}
                >
                    <Text
                        style={{
                            color: paginationType === "right" ? "black" : '#fff',
                            fontSize: RFPercentage(1.9)
                        }}
                    >
                        {index + 1} / {total}
                    </Text>
                </View>
            </View >
        )
    }

    return (
        <Slick
            height={Platform.OS == 'ios' ? height / 2.45 : height / 2.9}
            width={width}
            autoplay={true}
            autoplayTimeout={5}
            renderPagination={renderPagination}
            dot={
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderColor: '#BD1461',
                        borderWidth: 2,
                        width: 12,
                        height: 12,
                        borderRadius: 40,
                        marginTop: hp('14%'),
                        marginBottom: hp('2%'),
                        marginLeft: 12,
                        marginRight: 12,
                    }}
                />
            }
            activeDot={
                <View
                    style={{
                        backgroundColor: '#BD1461',
                        width: 12,
                        height: 12,
                        borderRadius: 40,
                        marginTop: hp('14%'),
                        marginBottom: hp('2%'),
                        marginLeft: 12,
                        marginRight: 12,
                    }}
                />
            }
        >
            <View style={{ width: '100%' }}>
                <ImageBackground
                    source={require('../assets/images/jorgen.jpg')}
                    style={backgroundImage}>
                    <View>
                        <Text
                            style={{
                                paddingBottom: hp('2%'),
                                fontSize: RFPercentage(3.65),
                                fontWeight: 'bold',
                                color: 'white',
                            }}>
                            나만 알고싶은{'\n'}힙한 캠핑장 지금 공개
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: RFPercentage(2.2),
                                fontWeight: '300',
                                color: 'white',
                            }}>
                            바퀴달린집 출연 캠핑장 최대 할인가로{'\n'}떠나보면 어때요?
                        </Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={{ width: '100%' }}>
                <ImageBackground
                    resizeMethod='scale'
                    resizeMode='contain'
                    source={require('../assets/images/jorgen.jpg')}
                    style={backgroundImage}>
                    <View>
                        <Text
                            style={{
                                paddingBottom: hp('2%'),
                                fontSize: RFPercentage(3.65),
                                fontWeight: 'bold',
                                color: 'white',
                            }}>
                            나만 알고싶은{'\n'}힙한 캠핑장 지금 공개
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: RFPercentage(2.2),
                                fontWeight: '300',
                                color: 'white',
                            }}>
                            바퀴달린집 출연 캠핑장 최대 할인가로{'\n'}떠나보면 어때요?
                        </Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={{ width: '100%' }}>
                <ImageBackground
                    source={require('../assets/images/martin.png')}
                    style={backgroundImage}>
                    <View>
                        <Text
                            style={{
                                paddingBottom: hp('2%'),
                                fontSize: RFPercentage(3.65),
                                fontWeight: 'bold',
                                color: 'white',
                            }}>
                            나만 알고싶은{'\n'}힙한 캠핑장 지금 공개
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: RFPercentage(2.2),
                                fontWeight: '300',
                                color: 'white',
                            }}>
                            바퀴달린집 출연 캠핑장 최대 할인가로{'\n'}떠나보면 어때요?
                        </Text>
                    </View>
                </ImageBackground>
            </View>
            {/* <View style={{ width: '100%' }}>
                <Image
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                    resizeMethod='scale'
                    resizeMode='contain'
                    // source={{ uri: banner.image }}
                    source={require("../assets/images/home.png")}
                />
            </View> */}
        </Slick>
    );
};

export default Carousel;


const styles = StyleSheet.create({
    backgroundImage: {
        display: 'flex',
        height: hp('48%'),
        paddingLeft: wp('16%'),
        paddingTop: hp('10%'),
        // resizeMethod: 'scale',
        // resizeMode: 'contain'
    },
})