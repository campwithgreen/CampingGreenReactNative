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


const termsData = {
    title: "캠핑그린 이용약관 및 동의사항",
    description: {
        descOne: "캠핑그린를 통해 제공되는 모든 상품은 용역이나 강의 VOD의 제공을 개 기 전까지는 구매회원의 취소 요청 시 즉시 취소 처리가 진행됩니다. 강의 제공이 개시된 후에는 전자상거래 등에서의 ‘소비자 보호에 관한 법률’ 등 련 법령에서 정한 청약철회 제한 사유에 해당하는 경우는 청약철회가 제 수 있습니다.",
        descTwo: "캠핑그린를 통해 제공되는 모든 상품은 용역이나 강의 VOD의 제공을 개 기 전까지는 구매회원의 취소 요청 시 즉시 취소 처리가 진행됩니다. 강의 제공이 개시된 후에는 전자상거래 등에서의 ‘소비자 보호에 관한 법률’ 등 련 법령에서 정한 청약철회 제한 사유에 해당하는 경우는 청약철회가 제 수 있습니다."
    },

}


export default function TermsScreen() {
    const { container, backgroundWrapper } = styles
    return (
        <View style={backgroundWrapper}>
            <Header headerContent={headerContent} />
            <View style={container}>
                <Terms termsData={termsData} />
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
})
