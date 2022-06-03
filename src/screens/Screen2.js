import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { goBack } from '../navigation/utils/RootNavigation'


/**
* @author
* @function Screen2
**/
export const Screen2 = (props) => {

    const { container } = styles
    return (
        <View style={container}>
            <Text onPress={() => { goBack() }}>Screen2</Text>
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