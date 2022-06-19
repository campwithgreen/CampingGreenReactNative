import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HeartScreen} from '../screens/HeartScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {ChatScreen} from '../screens/ChatScreen';
import {LocationScreen} from '../screens/LocationScreen';
import {HomeScreenDetail1} from '../screens/HomeScreenDetail1';
import LoginScreen from '../screens/LoginScreen';
import {Product} from '../screens/Product';
import {MyScreen} from '../screens/MyScreen';
import SecondScreen from '../screens/SecondScreen';
import ThirdScreen from '../screens/ThirdScreen';
import ForthScreen from '../screens/ForthScreen';

const Stack = createNativeStackNavigator();

const AppNavigatorOptions = {
  headerShown: false,
  gestureEnabled: false,
};

/**
 * @author
 * @function HomeNavigation
 **/
export const HomeNavigation = props => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={AppNavigatorOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="HeartScreen" component={HeartScreen} />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="HomeScreenDetail1" component={HomeScreenDetail1} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="MyScreen" component={MyScreen} />
      <Stack.Screen name="SecondScreen" component={SecondScreen} />
      <Stack.Screen name="ThirdScreen" component={ThirdScreen} />
      <Stack.Screen name="ForthScreen" component={ForthScreen} />
    </Stack.Navigator>
  );
};
