import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, ToastAndroid, Alert, Modal } from 'react-native';
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
import { login, setUserData } from '../redux/actions/oauth';
import TermLink from '../components/common/TermLink';

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
    const { container, text, wrapper, formWrapper, buttonWrapper, centeredView, modalView, termTitle, termsButtonWrapper } = styles;

    const [name, setname] = useState(null);
    const [email, setemail] = useState(null);
    const userId = useSelector((st) => st?.oauth?.user_data?.data?._id);
    const phoneNumber = useSelector((st) => st?.oauth?.user_data?.data?.phoneNumber);
    const [modalVisible, setModalVisible] = useState(false);

    console.log("MOD VIS", modalVisible);
    console.log("USER ID", userId);

    const linkData = [
        {
            id: 1,
            link: "캠핑그린 이용약관 및 동의사항",
            linkText: "(필수)",
            navigate: "TermsScreen",
            termsData: {
                title: "캠핑그린 이용약관 및 동의사항",
                description: {
                    descOne: "캠핑그린를 통해 제공되는 모든 상품은 용역이나 강의 VOD의 제공을 개 기 전까지는 구매회원의 취소 요청 시 즉시 취소 처리가 진행됩니다. 강의 제공이 개시된 후에는 전자상거래 등에서의 ‘소비자 보호에 관한 법률’ 등 련 법령에서 정한 청약철회 제한 사유에 해당하는 경우는 청약철회가 제 수 있습니다.",
                    descTwo: "캠핑그린를 통해 제공되는 모든 상품은 용역이나 강의 VOD의 제공을 개 기 전까지는 구매회원의 취소 요청 시 즉시 취소 처리가 진행됩니다. 강의 제공이 개시된 후에는 전자상거래 등에서의 ‘소비자 보호에 관한 법률’ 등 련 법령에서 정한 청약철회 제한 사유에 해당하는 경우는 청약철회가 제 수 있습니다."
                },
            },
            checked: false
        },
        {
            id: 2,
            link: "개인정보수집 및 이용동의",
            linkText: "(필수)",
            navigate: "TermsScreen",
            termsData: {
                title: "CODING HUMANS 1",
                description: {
                    descOne: "캠핑그린를 통해 제공되는 모든 상품은 용역이나 강의 VOD의 제공을 개 기 전까지는 구매회원의 취소 요청 시 즉시 취소 처리가 진행됩니다. 강의 제공이 개시된 후에는 전자상거래 등에서의 ‘소비자 보호에 관한 법률’ 등 련 법령에서 정한 청약철회 제한 사유에 해당하는 경우는 청약철회가 제 수 있습니다.",
                    descTwo: "캠핑그린를 통해 제공되는 모든 상품은 용역이나 강의 VOD의 제공을 개 기 전까지는 구매회원의 취소 요청 시 즉시 취소 처리가 진행됩니다. 강의 제공이 개시된 후에는 전자상거래 등에서의 ‘소비자 보호에 관한 법률’ 등 련 법령에서 정한 청약철회 제한 사유에 해당하는 경우는 청약철회가 제 수 있습니다."
                },
            },
            checked: false
        },
        {
            id: 3,
            link: "개인정보수집 및 이용동의",
            linkText: "(필수)",
            navigate: "TermsScreen",
            termsData: {
                title: "CODING HUMANS 2",
                description: {
                    descOne: "캠핑그린를 통해 제공되는 모든 상품은 용역이나 강의 VOD의 제공을 개 기 전까지는 구매회원의 취소 요청 시 즉시 취소 처리가 진행됩니다. 강의 제공이 개시된 후에는 전자상거래 등에서의 ‘소비자 보호에 관한 법률’ 등 련 법령에서 정한 청약철회 제한 사유에 해당하는 경우는 청약철회가 제 수 있습니다.",
                    descTwo: "캠핑그린를 통해 제공되는 모든 상품은 용역이나 강의 VOD의 제공을 개 기 전까지는 구매회원의 취소 요청 시 즉시 취소 처리가 진행됩니다. 강의 제공이 개시된 후에는 전자상거래 등에서의 ‘소비자 보호에 관한 법률’ 등 련 법령에서 정한 청약철회 제한 사유에 해당하는 경우는 청약철회가 제 수 있습니다."
                },
            },
            checked: false
        }
    ];

    const [termsData, setTermsData] = useState(linkData);

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
                console.log("HELLO REGISTER");
                setModalVisible(true);
            }
        }
    };





    const getValue = (value, index) => {
        let data = [...termsData];
        data[index].checked = value;
        setTermsData(data);
    };

    console.log("T Data", termsData);

    const falsetermsData = termsData.filter((item) => item.checked === false);

    const allConsentChecked = () => falsetermsData.length === 0;

    const mainRegister = async () => {

        console.log("All", falsetermsData, allConsentChecked);

        if (allConsentChecked()) {
            let data = {
                "userId": userId,
                "firstName": name,
                "email": email
            };
            await register(data).then((res) => {
                console.log("REGISTER RES", res.data);
                dispatch(setUserData(res.data));
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

        } else {
            ToastAndroid.showWithGravity("Pls check all the terms and consent to register your account", ToastAndroid.SHORT, ToastAndroid.TOP);
        }

    };



    return (
        <View>
            {modalVisible &&
                <View style={centeredView}>
                    <View style={modalView}>
                        <View>
                            <Text style={termTitle}>가입을 하려면 동의해주세요</Text>
                            <View style={termsButtonWrapper}>
                                {termsData.map((item, index) => {
                                    return <TermLink key={item.id} Link={item.link} LinkText={item.linkText} navigate={item.navigate}
                                        onChange={(value) => {
                                            getValue(value, index);
                                        }}
                                        termsData={item.termsData}
                                    />;
                                })}
                            </View>
                            <View style={termsButtonWrapper}>
                                <Button
                                    title="Register"
                                    onPress={() => mainRegister()}
                                    color={COLOR.compGreen}
                                />
                            </View>
                            <View style={termsButtonWrapper}>
                                <Button
                                    title="Cancel"
                                    onPress={() => setModalVisible(false)}
                                    color={COLOR.grey}
                                />
                            </View>
                        </View>
                    </View>
                </View>}
            <View style={[container, modalVisible && { backgroundColor: "black", opacity: 0.3 }]}>
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
    },
    centeredView: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        zIndex: 15,
        elevation: 50,
        marginBottom: hp("5%")
    },
    modalView: {
        height: hp("40%"),
        backgroundColor: COLOR.white,
        borderTopLeftRadius: 30,
        padding: hp("4%"),
        borderTopRightRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 100,
    },
    termTitle: {
        color: COLOR.black,
        fontWeight: "bold",
        fontSize: FONTSIZE.xll
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    termsButtonWrapper: {
        marginVertical: hp("1%")
    }
});