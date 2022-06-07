import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../layout/Header'
import { navigateTo } from '../navigation/utils/RootNavigation'

/**
* @author
* @function ProfileScreen
**/
export const ProfileScreen = (props) => {

    const { container } = styles
    return (
        <View style={container}>
            <Header headerContent={{}} />
            <TouchableOpacity onPress={() => { navigateTo("Location") }}>
                <Text>ProfileScreen</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {

    }
})