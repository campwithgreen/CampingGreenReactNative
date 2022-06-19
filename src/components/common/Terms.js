import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Terms(props) {

    const { termsData } = props
    const { container, termsTitleWrapper, termsTitleStyle, termsDescStyle } = styles

    return (
        <View style={container}>
            <View style={termsTitleWrapper}>
                <Text style={termsTitleStyle}>{termsData.title}</Text>
            </View>
            {Object.keys(termsData.description).map((objKey) => {
                return <View style={termsTitleWrapper} key={objKey}>
                    <Text style={termsDescStyle}>{termsData.description[objKey]}</Text>
                </View>
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffff"
    },
    termsTitleWrapper: {
        marginVertical: hp("2.6%"),
    },
    termsTitleStyle: {
        fontSize: RFPercentage(2.3),
        fontWeight: "bold",
        color: "black"
    },
    termsDescStyle: {
        fontSize: RFPercentage(1.8),
    }
})
