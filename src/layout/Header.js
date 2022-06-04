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
    const { home } = props
    return (
        <SafeAreaView>
            <View style={initial}>
                <View style={wrapper}>
                    <View style={container}>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    goBack()
                                }}
                            >
                                <Image source={require("../assets/images/cancel.png")} style={headerIcon} />
                            </TouchableOpacity>
                        </View>

                        {home ? (
                            <View>
                                <Image source={require("../assets/images/cancel.png")} style={headerIcon} />
                            </View>
                        ) : (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigateTo('LocationScreen');
                                    }}
                                >
                                    <Text style={headerTitle}>카테고리</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigateTo('ProfileScreen');
                                }}
                            >
                                <Image source={require("../assets/images/cart.png")} style={headerIcon} />
                            </TouchableOpacity>
                        </View>
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
