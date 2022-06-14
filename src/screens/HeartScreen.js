import React, { useState, useRef } from 'react'
import { set } from 'react-hook-form'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../layout/Header'
import { navigateTo } from '../navigation/utils/RootNavigation'

/**
* @author
* @function HeartScreen
**/
export const HeartScreen = (props) => {

    const { container } = styles
    const count = useRef(0);

    const expensiveFunc = () => {
        console.log("EXPENSIVE")
    }

    console.log(count);
    const increment = () => {
        count.current = count.current + 1;
        console.log("INSIDE", count);
    }

    const decrement = () => {
        count.current = count.current + 1;
    }

    console.log("IS MOUNTING");
    expensiveFunc()

    return (
        <View style={container}>
            <Header headerContent={{}} />
            <TouchableOpacity onPress={() => { navigateTo("Chat") }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <Text onPress={() => { increment() }}>+</Text>
                    <Text>{count.current}</Text>
                    <Text onPress={() => { decrement() }}>-</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {

    }
})