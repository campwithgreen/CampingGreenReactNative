import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { HomeScreenDetail1 } from '../screens/HomeScreenDetail1';
import LoginScreen from '../screens/LoginScreen';
import { Product } from '../screens/Product';
import { MyScreen } from '../screens/MyScreen';
import SecondScreen from '../screens/SecondScreen';
import ThirdScreen from '../screens/OrderSuccessItemScreen';
import ForthScreen from '../screens/OrderSuccessCamp';
import { ProductInfo } from '../screens/ProductInfo';
import CalendarScreen from '../screens/CalendarScreen';
import RoomScreen from '../screens/RoomScreen';
import ProductShoppingBagScreen from '../screens/ProductShoppingBagScreen';
import RoomPaymentScreen from '../screens/RoomPaymentScreen';
import RoomReservationListScreen from '../screens/RoomReservationListScreen';
import Rent from '../screens/Rent';
import { RegisterScreen } from '../screens/RegisterScreen';
import TermsScreen from '../screens/TermsScreen';

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
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="HomeScreenDetail1" component={HomeScreenDetail1} />
      <Stack.Screen name="Rent" component={Rent} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="MyScreen" component={MyScreen} />
      <Stack.Screen name="SecondScreen" component={SecondScreen} />
      <Stack.Screen name="ThirdScreen" component={ThirdScreen} />
      <Stack.Screen name="ForthScreen" component={ForthScreen} />
      <Stack.Screen name="ProductInfo" component={ProductInfo} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="RoomScreen" component={RoomScreen} />
      <Stack.Screen name="TermsScreen" component={TermsScreen} />
      <Stack.Screen
        name="ProductShoppingBagScreen"
        component={ProductShoppingBagScreen}
      />
      <Stack.Screen name="RoomPaymentScreen" component={RoomPaymentScreen} />
      <Stack.Screen
        name="RoomReservationListScreen"
        component={RoomReservationListScreen}
      />
    </Stack.Navigator>
  );
};
