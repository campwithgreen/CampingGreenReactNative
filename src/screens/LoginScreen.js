import React, { useState } from 'react';
import {
    View, Text, StyleSheet,
    ScrollView, TextInput, Button, Alert, TouchableOpacity, ToastAndroid
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
import { goBack, navigateTo } from '../navigation/utils/RootNavigation';
import { authDoor, verifyOtp } from '../apis/auth';
import { showDefaultErronAlert } from '../global/global';
import { useDispatch, useSelector } from 'react-redux';
import { login, setUserData, setUserToken } from '../redux/actions/oauth';
import store from '../redux/store';

const headerContent = {
    leftItemContents: {
        type: "image",
        content: require("../assets/images/cancel.png"),
        navigateScreen: () => goBack()
    }
};

export default function LoginScreen() {


    const st = useSelector((st) => st);
    console.log("STORE", st);


    const { container, wrapper, mainTextWrapper,
        mainText, form, formlabel, inputcontainer, buttonWrapper } = styles;
    const dispatch = useDispatch();

    const [phoneNumber, setPhoneNumber] = useState(null);
    const [otp, setOtp] = useState(null);

    const [lineColor, setLineColor] = useState(COLOR.black);

    const onFocus = () => setLineColor(COLOR.compGreen);

    const onBlur = () => {
        setLineColor("black");
    };

    const [getOtpButtonEnabled, setGetOtpButtonEnabled] = useState(true);

    const formSubmissionRequired = useSelector((st) => st?.oauth?.user_data?.formSubmissionRequired);


    const handleGetOtp = async (phoneNumber) => {
        if (phoneNumber.length === 10) {
            let payload = {
                "phoneNumber": phoneNumber
            };
            await authDoor(payload).then((res) => {
                dispatch(setUserData(res.data));
                if (res.data.formSubmissionRequired) {
                    ToastAndroid.showWithGravity("OTP Successfully Sent, Pls verify your number and register you account", ToastAndroid.SHORT, ToastAndroid.TOP);
                    setGetOtpButtonEnabled(false);
                } else {
                    ToastAndroid.showWithGravity("OTP Successfully Sent", ToastAndroid.LONG, ToastAndroid.TOP);
                    setGetOtpButtonEnabled(false);
                }
            }).catch((err) => {
                if (err) {
                    showDefaultErronAlert();
                }
            });
        } else {
            ToastAndroid.showWithGravity("Pls, enter a valid phone number !", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    };

    const getValue = (value) => {
        setOtp(value);
    };

    const handleLogin = async () => {
        console.log(phoneNumber, otp);
        let payload = {
            "phoneNumber": phoneNumber,
            "otp": otp
        };
        await verifyOtp(payload).then((res) => {
            if (res.data) {
                if (res.data.success) {
                    console.log("r", res.data);
                    dispatch(setUserToken(res.data.token));
                    if (formSubmissionRequired) {
                        Alert.alert(
                            "Account Not Found",
                            `You have to register your number ${phoneNumber} first`,
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                { text: "OK", onPress: () => navigateTo("RegisterScreen") }
                            ]
                        );
                    } else {
                        dispatch(login(true));
                        ToastAndroid.showWithGravity("Logged In Successfully", ToastAndroid.LONG, ToastAndroid.TOP);
                        navigateTo("HomeScreen");
                    }
                }
                else {
                    ToastAndroid.showWithGravity(res.data.message.toUpperCase(), ToastAndroid.LONG, ToastAndroid.TOP);
                }
            }
        }).catch((err) => {
            if (err) {
                showDefaultErronAlert();
            }
        });
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
                <ScrollView keyboardShouldPersistTaps="always">
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
                                    <TouchableOpacity
                                        style={{
                                            alignItems: "flex-end",
                                            justifyContent: "center",
                                            borderBottomWidth: 1,
                                            borderBottomColor: lineColor,
                                            width: "30%",
                                        }}
                                        onPress={() => {
                                            if (getOtpButtonEnabled) {
                                                handleGetOtp(phoneNumber);
                                            } else {
                                                ToastAndroid.showWithGravity("OTP has already sent, Pls use it", ToastAndroid.LONG, ToastAndroid.TOP);
                                            }
                                        }}
                                        underlayColor='transparent'
                                    >
                                        <View style={{ borderRadius: 5, borderWidth: 1, borderColor: "grey", padding: 4 }}>
                                            <Text>번인증번</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <FormField
                                label="휴대폰 번호"
                                type="text"
                                keyboardType="numeric"
                                placeholder="-없이 숫자만 입력해주세요"
                                onChange={(value) => { getValue(value); }} maxLength={6} />
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
            </View >
        </View >
    );
};

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
