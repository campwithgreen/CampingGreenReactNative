import React, { useState } from 'react';
import {
    View, Text, StyleSheet, KeyboardAvoidingView,
    ScrollView, TextInput, TouchableHighlight, Button, Alert, Platform
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
    heightPercentageToDP,
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FormField from '../components/common/FormField';
import COLOR from '../constants/colors';
import globalStyle from '../global/globalStyle';
import Header from '../layout/Header';
import { goBack } from '../navigation/utils/RootNavigation';

const headerContent = {
    leftItemContents: {
        type: "image",
        content: require("../assets/images/cancel.png"),
        navigateScreen: () => goBack()
    }
};

export default function LoginScreen() {
    const { container, wrapper, mainTextWrapper,
        mainText, form, formlabel, inputcontainer, buttonWrapper } = styles;

    const [phoneNumber, setPhoneNumber] = useState(null);
    const [otp, setOtp] = useState(null);

    const [lineColor, setLineColor] = useState("black");

    const onFocus = () => setLineColor("green");

    const onBlur = () => {
        setLineColor("black");
        if (!validateEmail(phoneNumber)) {
            console.log("NOT EMAIL");
        } else {
            console.log(("EMAIL"));
        }
    };

    const handleGetOtp = () => {
        console.log(phoneNumber);
    };

    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const getValue = (value) => {
        setOtp(value);
    };

    const handleLogin = () => {
        console.log(phoneNumber, otp);
        //call api here
    };

    const disableButton = () => {
        if (!phoneNumber || !otp) {
            return true;
        }
        return false;
    };


    return (
        <View>
            <View style={container}>
                <Header headerContent={headerContent} />
                <ScrollView>
                    <View style={[globalStyle.mainContainerWrapper, wrapper]}>
                        <View style={mainTextWrapper}>
                            <Text style={mainText}>
                                캠핑용품 대여부터 캠핑장 예약까지
                            </Text>
                            <Text style={mainText}>
                                편하게 누려보세요
                            </Text>
                        </View>
                        <View style={form}>
                            <View style={inputcontainer}>
                                <Text style={formlabel}>인증번호</Text>
                                <View style={{ flexDirection: 'row', width: "100%" }}>
                                    <View style={{ width: "70%" }}>
                                        <TextInput
                                            style={{
                                                color: 'black',
                                                borderBottomWidth: 1,
                                                borderBottomColor: lineColor,
                                                width: '100%',
                                            }}
                                            onFocus={() => onFocus()}
                                            onBlur={() => onBlur()}
                                            keyboardType="number-pad"
                                            onChangeText={(value) => {
                                                setPhoneNumber(value);
                                            }}
                                            maxLength={10}
                                        />
                                    </View>
                                    <TouchableHighlight style={{
                                        alignItems: "flex-end",
                                        justifyContent: "center",
                                        borderBottomWidth: 1,
                                        borderBottomColor: lineColor,
                                        width: "30%",
                                    }}
                                        onPress={(e) => { handleGetOtp(e); }}
                                        underlayColor='transparent'
                                    >
                                        <View style={{ borderRadius: 5, borderWidth: 1, borderColor: "grey", padding: 4 }}>
                                            <Text>번인증번</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <FormField type="text" onChange={(value) => { getValue(value); }} maxLength={6} />
                            <View style={buttonWrapper}>
                                <Button
                                    title="login"
                                    onPress={() => handleLogin()}
                                    color={COLOR.compGreen}
                                    disabled={disableButton()}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
        height: hp("100%"),
    },
    mainTextWrapper: {
        marginVertical: hp("3.5%")
    },
    mainText: {
        color: "black",
        fontSize: RFPercentage(3),
        fontWeight: '900',
    },
    form: {
        marginTop: hp('2%'),
    },
    formlabel: {
        fontSize: RFPercentage(2.5),
        color: '#9DA9CE',
    },
    inputcontainer: {
        marginVertical: hp('2%'),
    },
    buttonWrapper: {
        marginTop: heightPercentageToDP("30%")
    }
});
