import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import MainPageCard from '../components/MainPageCard'
import { goBack } from '../navigation/utils/RootNavigation'


const data = [
    {
        "id": 1,
        "imageUrl": '../assets/images/home.png',
        "text": "this is text 1",
        "address": "this is address 1"
    },
    {
        "id": 2,
        "image": "this is image 2",
        "text": "this is text 2",
        "address": "this is address 2"
    },
]


export const Screen2 = (props) => {

    const { container } = styles
    return (
        <View style={container}>

            {data.map((item) => {
                return <MainPageCard key={item.id} data={item} />
            })}
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