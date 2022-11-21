import React from 'react';
import { View, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Terms from '../components/common/Terms';
import Header from '../layout/Header';
import { goBack } from '../navigation/utils/RootNavigation';


const headerContent = {
    leftItemContents: {
        type: 'image',
        content: require('../assets/images/arrow-left.png'),
        navigateScreen: () => goBack(),
    },
    middleItemContents: {
        type: 'text',
        content: '이용약관',
        navigateScreen: null,
    },
};


export default function TermsScreen(props) {
    const { container, backgroundWrapper } = styles;
    return (
        <View style={backgroundWrapper}>
            <Header headerContent={headerContent} />
            <View style={container}>
                <Terms termsData={props?.route?.params?.termsData} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundWrapper: {
        backgroundColor: "#ffff",
        minHeight: hp("100%")
    },
    container: {
        marginHorizontal: wp("5%"),
    }
});
