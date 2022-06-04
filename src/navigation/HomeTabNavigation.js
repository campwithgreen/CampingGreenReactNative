import React from 'react'
import { Image, StyleSheet } from 'react-native'
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
    const { tabIcon } = styles
    return (
        <Tab.Navigator
            screenOptions={(tabs) => {
                const { name } = tabs.route
                if (name === "Home") {
                    return ({
                        tabBarIcon: () => {
                            return <Image style={{ ...tabIcon }} source={require("../assets/images/home.png")} />;
                        },
                        tabBarLabel: '그린홈',
                        tabBarStyle: {
                            height: 70,
                        },
                        tabBarItemStyle: {
                            padding: 7,
                        },
                        ...AppNavigatorOptions
                    })
                } else if (name === "Heart") {
                    return ({
                        tabBarIcon: () => {
                            return <Image style={tabIcon} source={require("../assets/images/heart.png")} />;
                        },
                        tabBarLabel: '용품대여',
                        tabBarStyle: {
                            height: 70,
                        },
                        tabBarItemStyle: {
                            padding: 7,
                        },
                        ...AppNavigatorOptions
                    })
                } else if (name === "Location") {
                    return ({
                        tabBarIcon: () => {
                            return <Image style={tabIcon} source={require("../assets/images/location.png")} />;
                        },
                        tabBarLabel: '캠핑예약',
                        tabBarStyle: {
                            height: 70,
                        },
                        tabBarItemStyle: {
                            padding: 7,
                        },
                        ...AppNavigatorOptions
                    })
                } else if (name === "Chat") {
                    return ({
                        tabBarIcon: () => {
                            return <Image style={tabIcon} source={require("../assets/images/chat.png")} />;
                        },
                        tabBarLabel: '커뮤니티',
                        tabBarStyle: {
                            height: 70,
                        },
                        tabBarItemStyle: {
                            padding: 7,
                        },
                        ...AppNavigatorOptions
                    })
                } else if (name === "Profile") {
                    return ({
                        tabBarIcon: () => {
                            return <Image style={tabIcon} source={require("../assets/images/profile.png")} />;
                        },
                        tabBarLabel: '마이홈',
                        tabBarStyle: {
                            height: 70,
                        },
                        tabBarItemStyle: {
                            padding: 7,
                        },
                        ...AppNavigatorOptions
                    })
                }
            }}
        >
            <Tab.Screen name="Home" component={HomeNavigation} />
            <Tab.Screen name="Heart" component={Screen2} />
            <Tab.Screen name="Location" component={HomeNavigation} />
            <Tab.Screen name="Chat" component={Screen2} />
            <Tab.Screen name="Profile" component={Screen2} />
        </Tab.Navigator >
    )
}

const styles = StyleSheet.create({
    tabIcon: {
        height: 15,
        width: 15
    }
})

