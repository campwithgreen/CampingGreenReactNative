import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


export default function MainPageCard(props) {

    const { data } = props
    const { container } = styles
    return (
        <View style={{ ...container, backgroundColor: data.id === 2 ? "red" : "green" }} >
            <View>
                <Text>
                    {data.image}
                </Text>
            </View>
            <View>
                <Text>
                    {data.text}
                </Text>
            </View>
            <View>
                <Text>
                    {data.address}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    }
})