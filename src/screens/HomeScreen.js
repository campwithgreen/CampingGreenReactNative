import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import MainPageCard from '../components/MainPageCard'
import Header from '../layout/Header'
import { goBack } from '../navigation/utils/RootNavigation'




export const HomeScreen = (props) => {

    const { container } = styles
    return (
        <View style={container}>
            <Header />
            <View>
                <Text>Home Screen</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {

    }
})