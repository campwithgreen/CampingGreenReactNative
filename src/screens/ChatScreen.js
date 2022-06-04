import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../layout/Header'
import { navigateTo } from '../navigation/utils/RootNavigation'

/**
* @author
* @function ChatScreen
**/
export const ChatScreen = (props) => {

    const { container } = styles
    return (
        <View style={container}>
            <Header />
            <TouchableOpacity onPress={() => { navigateTo("Home") }}>
                <Text>ChatScreen</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {

    }
})