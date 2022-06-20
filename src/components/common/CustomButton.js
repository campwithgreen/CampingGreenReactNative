import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';


export default function CustomButton(props) {
    const { buttonText } = props
    const { button1 } = styles
    return (
        <Text style={button1}>{buttonText}</Text>
    );
}

const styles = StyleSheet.create({
    button1: {
        backgroundColor: '#191919',
        color: '#76FFC5',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: hp("7.5%"),
        fontSize: RFPercentage(3),
        fontWeight: 'bold',
        position: 'absolute',
        width: wp('100%'),
        bottom: 0,
    },
});
