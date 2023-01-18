import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './utils/RootNavigation';
import HomeTabNavigation from './HomeTabNavigation';
import {Header} from 'react-native/Libraries/NewAppScreen';

import Toast from 'react-native-toast-message';
/**
 * @author
 * @function MainNavigation
 **/

export const MainNavigation = props => {
  return (
    <NavigationContainer ref={navigationRef}>
      <HomeTabNavigation />
      <Toast />
    </NavigationContainer>
  );
};
