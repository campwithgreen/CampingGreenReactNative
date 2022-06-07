import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../layout/Header'
import { navigateTo } from '../navigation/utils/RootNavigation'

/**
* @author
* @function HeartScreen
**/
export const HeartScreen = (props) => {

    const { container } = styles
    return (
        <View style={container}>
            <Header headerContent={{}} />
            <TouchableOpacity onPress={() => { navigateTo("Chat") }}>
                <Text>HeartScreen</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {

    }
})