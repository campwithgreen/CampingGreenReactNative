import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Text,
    Image
} from 'react-native';
import { goBack, navigateTo } from '../navigation/utils/RootNavigation';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';


const Header = (props) => {
    const { initial, wrapper, headerIcon, container, headerTitle } = styles
    const { headerContent } = props

    const renderItem = (itemContents) => {
        switch (itemContents.type) {
            case "text":
                return <View>
                    <TouchableOpacity
                        onPress={() => {
                            goBack()
                        }}
                    >
                        <Text style={headerTitle}>{itemContents.content}</Text>
                    </TouchableOpacity>
                </View>
            case "image":
                return <View>
                    <TouchableOpacity
                        onPress={() => {
                            goBack()
                        }}
                    >
                        <Image source={itemContents.content} style={headerIcon} />
                    </TouchableOpacity>
                </View>
            default:
                break;
        }
    }


    return (
        <SafeAreaView>
            <View style={initial}>
                <View style={wrapper}>
                    <View style={container}>
                        {headerContent.leftItemContents ? renderItem(headerContent.leftItemContents) : <View></View>}
                        {headerContent.middleItemContents ? renderItem(headerContent.middleItemContents) : <View></View>}
                        {headerContent.rightItemContents ? renderItem(headerContent.rightItemContents) : <View></View>}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Header;

const styles = StyleSheet.create({
    initial: {
        backgroundColor: '#fff',
    },
    wrapper: {
        height: hp('8%'),
        backgroundColor: "#ffff",
        width: '100%',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp('5%'),
        alignItems: "center"
    },
    headerIcon: {
        height: hp('4%'),
        width: hp('4%')
    },
    headerTitle: {
        fontWeight: '900',
        fontSize: 16,
        color: "black"
    }
});
