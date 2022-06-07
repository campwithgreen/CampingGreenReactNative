import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../layout/Header'
import { navigateTo } from '../navigation/utils/RootNavigation'

/**
* @author
* @function LocationScreen
**/
export const LocationScreen = (props) => {

    const { container } = styles
    return (
        <View style={container}>
            <Header headerContent={{}} />
            <TouchableOpacity onPress={() => { navigateTo("HomeScreen") }}>
                <Text>LocationScreen</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {

    }
})