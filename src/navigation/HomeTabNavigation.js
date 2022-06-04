import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigation } from './HomeNavigation';
import { Screen2 } from '../screens/Screen2';

const Tab = createBottomTabNavigator();

const AppNavigatorOptions = {
    headerShown: false,
    gestureEnabled: false,
};


/**
* @author
* @function HomeTabNavigation
**/
export const HomeTabNavigation = (props) => {

    return (
        <Tab.Navigator screenOptions={AppNavigatorOptions}>
            <Tab.Screen name="Home" component={HomeNavigation} />
            <Tab.Screen name="Settings" component={Screen2} />
            <Tab.Screen name="Loaction" component={HomeNavigation} />
            <Tab.Screen name="Chat" component={Screen2} />
            <Tab.Screen name="Profile" component={Screen2} />
        </Tab.Navigator>
    )
}


