import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';


export default function CustomButton(props) {
    const { buttonText, buttonHandler } = props
    const { button1 } = styles
    return (
        <TouchableOpacity onClick={() => { buttonHandler() }}>
            <Text style={button1}>{buttonText}</Text>
        </TouchableOpacity>
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
