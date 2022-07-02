import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Button } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function FormField(props) {

    const { type, onChange, maxLength } = props;
    const { formlabel, inputcontainer } = styles;
    const [lineColor, setLineColor] = useState("black");

    const onFocus = () => setLineColor("green");
    const onBlur = () => setLineColor("black");

    switch (type) {
        case "textButton":
            return <View style={inputcontainer}>
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
                            onChangeText={(value) => { }}
                            onSubmitEditing={() => { }}
                        />
                    </View>
                    <TouchableHighlight style={{
                        alignItems: "flex-end",
                        justifyContent: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: lineColor,
                        width: "30%",
                    }}
                        onPress={() => { }}
                        underlayColor='transparent'
                    >
                        <View style={{ borderRadius: 5, borderWidth: 1, borderColor: "grey", padding: 4 }}>
                            <Text>번인증번</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>;
        case "text":
            return <View style={inputcontainer}>
                <Text style={formlabel}>휴대폰 번호</Text>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                    <TextInput
                        style={{
                            color: 'black',
                            borderBottomWidth: 1,
                            borderBottomColor: lineColor,
                            width: '100%',
                        }}
                        maxLength={maxLength}
                        onFocus={() => onFocus()}
                        onBlur={() => onBlur()}
                        keyboardType="number-pad"
                        autoCapitalize="none"
                        onChangeText={value => {
                            onChange(value);
                        }}
                        placeholder="-없이 숫자만 입력해주세요"
                    />
                </View>
            </View>;
    }
}
const styles = StyleSheet.create({
    formlabel: {
        fontSize: RFPercentage(2.5),
        color: '#9DA9CE',
    },
    inputcontainer: {
        marginVertical: hp('2%'),
    },
});