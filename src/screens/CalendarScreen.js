import React from 'react';
import {
    View,

    StyleSheet,

    ScrollView,
    Dimensions

} from 'react-native';
import Header from '../layout/Header';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomCalendar from '../components/common/Calendar';
import { goBack, navigateTo } from '../navigation/utils/RootNavigation';
import CustomButton from '../components/common/CustomButton';


const headerContent = {
    leftItemContents: {
        type: 'text',
        content: '대여일정 선택',
    },
    rightItemContents: {
        type: 'image',
        content: require('../assets/images/cancel.png'),
        navigateScreen: () => goBack()
    },
};

let ScreenHeight = Dimensions.get("window").height;


const CalendarScreen = props => {

    const { container } = styles;

    return (
        <View style={container}>
            <Header headerContent={headerContent} />
            <ScrollView keyboardShouldPersistTaps="always">
                <CustomCalendar />
            </ScrollView>
            <CustomButton
                buttonText={"예약하d기"}
                buttonHandler={() => {
                    navigateTo("ProductInfo");
                }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffff",
        flex: 1
    },
});

export default CalendarScreen;