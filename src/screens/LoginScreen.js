import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../layout/Header';
import { goBack } from '../navigation/utils/RootNavigation';

const headerContent = {
    leftItemContents: {
        type: "image",
        content: require("../assets/images/cancel.png"),
        navigateScreen: () => goBack()
    }
}

export default function LoginScreen() {
    const { container, wrapper, mainTextWrapper, mainText } = styles;
    return (
        <View style={container}>
            <Header headerContent={headerContent} />
            <View style={wrapper}>
                <View style={mainTextWrapper}>
                    <Text style={mainText}>
                        캠핑용품 대여부터 캠핑장 예약까지
                    </Text>
                    <Text style={mainText}>
                        편하게 누려보세요
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    wrapper: {
        backgroundColor: "#fff",
        marginHorizontal: wp('6%')
    },
    mainTextWrapper: {
        marginVertical: hp("3.5%")
    },
    mainText: {
        color: "black",
        fontSize: RFPercentage(3),
        fontWeight: '900',
    }
})
