import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, ToastAndroid, Alert } from 'react-native';
import Header from '../layout/Header';
import { goBack, navigateTo } from '../navigation/utils/RootNavigation';
import COLOR from "../constants/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import globalStyle from '../global/globalStyle';
import FormField from '../components/common/FormField';
import FONTSIZE from '../constants/fontSize';
import { showDefaultErronAlert, validateEmail } from '../global/global';
import { register } from '../apis/auth';
import { useSelector, useDispatch } from "react-redux";
import { login } from '../redux/actions/oauth';

const headerContent = {
    leftItemContents: {
        type: 'image',
        content: require('../assets/images/cancel.png'),
        navigateScreen: () => goBack(),
    }
};


export const RegisterScreen = (props) => {

    const st = useSelector((st) => st);
    console.log("STORE", st);

    const dispatch = useDispatch();
    const { container, text, wrapper, formWrapper, buttonWrapper } = styles;

    const [name, setname] = useState(null);
    const [email, setemail] = useState(null);
    const userId = useSelector((st) => st?.oauth?.user_data?.data?._id);
    const phoneNumber = useSelector((st) => st?.oauth?.user_data?.data?.phoneNumber);


    console.log("USER ID", userId);

    const getName = (name) => {
        setname(name);
    };

    const getEmail = (email) => {
        setemail(email);
    };

    const disableButton = () => !email || !name;

    const handleRegister = async () => {
        if (name && email) {
            if (!validateEmail(email)) {
                ToastAndroid.showWithGravity("Pls enter a vaild email", ToastAndroid.SHORT, ToastAndroid.TOP);
            } else {

                let data = {
                    "userId": userId,
                    "firstName": name,
                    "email": email
                };

                await register(data).then((res) => {
                    if (res.data.success) {
                        ToastAndroid.showWithGravity("Successfully Registered And Logged In", ToastAndroid.LONG, ToastAndroid.TOP);
                        dispatch(login(true));
                        navigateTo("HomeScreen");
                    }
                }).catch((err) => {
                    if (err) {
                        showDefaultErronAlert();
                    }
                });
            }
        }
    };

    return (
        <View style={container}>
            <Header headerContent={headerContent} />
            <ScrollView keyboardShouldPersistTaps="always">
                <View style={[globalStyle.mainContainerWrapper, wrapper]}>
                    <TouchableOpacity onPress={() => { navigateTo("Home"); }}>
                        <Text style={text}>서비스 준비중이에요</Text>
                    </TouchableOpacity>
                    <View style={formWrapper}>
                        <FormField keyboardType="email-address" type="text" label="이름" placeholder="송은주" onChange={(value) => { getName(value); }} />
                        <FormField validate={() => validateEmail(email)} keyboardType="email-address" type="text" label="이메일" placeholder="" onChange={(value) => { getEmail(value); }} />
                    </View>
                    <View style={buttonWrapper}>
                        <Button
                            title="Register"
                            onPress={() => handleRegister()}
                            color={COLOR.compGreen}
                            disabled={disableButton()}
                        />
                    </View>
                </View>
            </ScrollView>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.white,
    },
    text: {
        fontSize: FONTSIZE.xlll,
        fontWeight: "900",
        color: COLOR.black
    },
    wrapper: {
        marginVertical: hp("5%"),
        height: hp("100%")
    },
    formWrapper: {
        marginVertical: hp("7%")
    },
    buttonWrapper: {
        marginTop: hp("20%")
    }
});