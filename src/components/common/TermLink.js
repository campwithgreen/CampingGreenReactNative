import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { navigateTo } from '../../navigation/utils/RootNavigation';

const TermLink = (props) => {

    const { Link, LinkText, navigate, onChange, termsData } = props;

    const [checked, setChecked] = useState(false);

    const {
        text2,
        ph1,
    } = styles;

    useEffect(() => {
        onChange(checked);
    }, [checked]);

    return (
        <View style={ph1}>
            <TouchableOpacity onPress={() => {
                setChecked(prev => !prev);

            }}>
                {checked ? (
                    <Image source={require('../../assets/images/green_circle.png')} />
                ) : (
                    <Image source={require('../../assets/images/white_circle.png')} />
                )}
            </TouchableOpacity>
            <Text style={text2}>
                <TouchableOpacity onPress={() => {
                    navigateTo(navigate, { termsData: termsData });
                }}>
                    <Text style={{ color: '#55C595' }}>{Link}</Text>
                </TouchableOpacity>
                <Text>{LinkText}</Text>
            </Text>
        </View>
    );
};


export default TermLink;

const styles = StyleSheet.create({
    text2: { fontWeight: '600', color: '#454C53', marginLeft: wp("3%") },
    ph1: { display: 'flex', flexDirection: 'row', paddingTop: hp('1%'), alignContent: "center", alignItems: "center", },
});
