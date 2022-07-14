import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../layout/Header';
import { navigateTo } from '../navigation/utils/RootNavigation';
import COLOR from "../constants/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import globalStyle from '../global/globalStyle';

const headerContent = {
    leftItemContents: {
        type: 'image',
        content: require('../assets/images/arrow-left.png'),
        navigateScreen: 'RoomScreen',
    },
    middleItemContents: {
        type: 'text',
        content: '커뮤니티',
        navigateScreen: 'RoomScreen',
    },
    rightItemContents: {
        type: 'image',
        content: require('../assets/images/cart.png'),
        navigateScreen: 'ReviewScreen',
    },
};


export const ChatScreen = (props) => {

    const { container, text, wrapper } = styles;
    return (
        <View style={container}>
            <Header headerContent={headerContent} />
            <View style={[globalStyle.mainContainerWrapper, wrapper]}>
                <Text style={text}>가입을 축하드립니다! 꿈꾸던 캠핑을 캠핑그린에서 경험해 보세요</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.white,
        height: hp("100%")
    },
    text: {
        fontSize: RFPercentage(3),
        fontWeight: "900"
    },
    wrapper: {
        marginVertical: hp("5%")
    }
});