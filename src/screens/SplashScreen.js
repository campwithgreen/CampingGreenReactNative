import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function SplashScreen() {

    const { container, titleWrapper, title, appName } = styles
    return (
        <ImageBackground
            resizeMethod='scale'
            resizeMode='cover'
            source={require('../assets/images/campingGreenSplash.png')}
            style={container}>
            <View style={titleWrapper}>
                <View>
                    <Text
                        style={title}>
                        당신이
                    </Text>
                    <Text
                        style={title}>
                        꿈꾸던 캠핑
                    </Text>
                </View>
            </View>
            <View style={{ position: "absolute", bottom: hp("5%"), width: wp("100%") }}>
                <Text
                    style={appName}>
                    CAMPING GREEN
                </Text>
            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    container: {
        height: hp("100%"),
    },
    titleWrapper: {
        position: "absolute",
        top: hp("15%"),
        width: wp("100%"),
        alignItems: "center"
    },
    title: {
        fontSize: RFPercentage(5),
        fontWeight: 'bold',
        color: 'white',
    },
    appName: {
        fontSize: RFPercentage(2.9),
        fontWeight: '900',
        color: '#6FFFC1',
        textAlign: "center"
    }
})