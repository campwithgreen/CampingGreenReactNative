import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { HomeNavigation } from './HomeNavigation';
import { navigationRef } from './utils/RootNavigation';


/**
* @author
* @function MainNavigation
**/

export const MainNavigation = (props) => {

    return (
        <NavigationContainer ref={navigationRef}>
            <HomeNavigation />
        </NavigationContainer>
    )
}

