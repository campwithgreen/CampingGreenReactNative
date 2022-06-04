import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { navigateTo } from '../navigation/utils/RootNavigation'

/**
* @author
* @function Screen1
**/
export const Screen1 = (props) => {

    const { container } = styles
    return (
        <View style={container}>
            <TouchableOpacity onPress={() => { navigateTo("Screen2") }}>
                <Text>Screen1</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: "green" }}>
                <Text>
                    HELLO WORLD
                </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})