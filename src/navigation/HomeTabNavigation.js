import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigation } from './HomeNavigation';
import { HeartScreen } from '../screens/HeartScreen';
import { LocationScreen } from '../screens/LocationScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { MyScreen } from '../screens/MyScreen';
import SecondScreen from '../screens/SecondScreen';
import ThirdScreen from '../screens/OrderSuccessItemScreen';
import ForthScreen from '../screens/ForthScreen';
import RoomScreen from '../screens/RoomScreen';
import ProductShoppingBagScreen from '../screens/ProductShoppingBagScreen';
import RoomPaymentScreen from '../screens/RoomPaymentScreen';
import { Product } from '../screens/Product';

const Tab = createBottomTabNavigator();

const AppNavigatorOptions = {
  headerShown: false,
  gestureEnabled: false,
};

/**
 * @author
 * @function HomeTabNavigation
 **/
export const HomeTabNavigation = props => {
  const { tabIcon } = styles;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={tabs => {
        const { name } = tabs.route;
        if (name === 'Home') {
          return {
            tabBarIcon: () => {
              return (
                <Image
                  style={{ ...tabIcon }}
                  source={require('../assets/images/home.png')}
                />
              );
            },
            tabBarLabel: '그린홈',
            tabBarStyle: {
              height: 70,
            },
            tabBarItemStyle: {
              padding: 7,
            },
            ...AppNavigatorOptions,
          };
        } else if (name === 'Heart') {
          return {
            tabBarIcon: () => {
              return (
                <Image
                  style={tabIcon}
                  source={require('../assets/images/heart.png')}
                />
              );
            },
            tabBarLabel: '용품대여',
            tabBarStyle: {
              height: 70,
            },
            tabBarItemStyle: {
              padding: 7,
            },
            ...AppNavigatorOptions,
          };
        } else if (name === 'Location') {
          return {
            tabBarIcon: () => {
              return (
                <Image
                  style={tabIcon}
                  source={require('../assets/images/location.png')}
                />
              );
            },
            tabBarLabel: '캠핑예약',
            tabBarStyle: {
              height: 70,
            },
            tabBarItemStyle: {
              padding: 7,
            },
            ...AppNavigatorOptions,
          };
        } else if (name === 'Chat') {
          return {
            tabBarIcon: () => {
              return (
                <Image
                  style={tabIcon}
                  source={require('../assets/images/chat.png')}
                />
              );
            },
            tabBarLabel: '커뮤니티',
            tabBarStyle: {
              height: 70,
            },
            tabBarItemStyle: {
              padding: 7,
            },
            ...AppNavigatorOptions,
          };
        } else if (name === 'Profile') {
          return {
            tabBarIcon: () => {
              return (
                <Image
                  style={tabIcon}
                  source={require('../assets/images/profile.png')}
                />
              );
            },
            tabBarLabel: '마이홈',
            tabBarStyle: {
              height: 70,
            },
            tabBarItemStyle: {
              padding: 7,
            },
            ...AppNavigatorOptions,
          };
        }
      }}>
      <Tab.Screen name="Home" component={HomeNavigation} />
      <Tab.Screen name="Heart" component={Product} />
      <Tab.Screen name="Location" component={ThirdScreen} />
      <Tab.Screen name="Chat" component={ProductShoppingBagScreen} />
      <Tab.Screen name="Profile" component={RoomPaymentScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    height: 15,
    width: 15,
  },
});
