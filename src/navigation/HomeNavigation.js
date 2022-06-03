import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screen1 } from '../screens/Screen1';
import { Screen2 } from '../screens/Screen2';


const Stack = createNativeStackNavigator();

const AppNavigatorOptions = {
    headerShown: false,
    gestureEnabled: false,
};

/**
* @author
* @function HomeNavigation
**/
export const HomeNavigation = (props) => {

    return (
        <Stack.Navigator screenOptions={AppNavigatorOptions} initialRouteName="Screen1">
            <Stack.Screen name="Screen1" component={Screen1} />
            <Stack.Screen name="Screen2" component={Screen2} />
        </Stack.Navigator>
    )
}


