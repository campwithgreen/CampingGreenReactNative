import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeartScreen } from '../screens/HeartScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { LocationScreen } from '../screens/LocationScreen';


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
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={AppNavigatorOptions}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="HeartScreen" component={HeartScreen} />
            <Stack.Screen name="LocationScreen" component={LocationScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
    )
}


