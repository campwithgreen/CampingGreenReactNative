import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export default function Loader() {
    return (
        <View style={{ height: heightPercentageToDP("100%"), display: "flex", justifyContent: "center", alignContent: "center" }}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    );
}
