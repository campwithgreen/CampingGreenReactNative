import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/HomeScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {ChatScreen} from '../screens/ChatScreen';
import {HomeScreenDetail1} from '../screens/HomeScreenDetail1';
import LoginScreen from '../screens/LoginScreen';
import {Product} from '../screens/Product';
import {MyScreen} from '../screens/MyScreen';
import SecondScreen from '../screens/SecondScreen';
import ThirdScreen from '../screens/OrderSuccessItemScreen';
import ForthScreen from '../screens/OrderSuccessCamp';
import ProductInfo from '../screens/ProductInfo';
import CalendarScreen from '../screens/CalendarScreen';
import RoomScreen from '../screens/RoomScreen';
import ProductShoppingBagScreen from '../screens/ProductShoppingBagScreen';
import RoomPaymentScreen from '../screens/RoomPaymentScreen';
import RoomReservationListScreen from '../screens/RoomReservationListScreen';
import Rent from '../screens/Rent';
import {RegisterScreen} from '../screens/RegisterScreen';
import TermsScreen from '../screens/TermsScreen';
import EquipmentRentalScreen from '../admin-screens/EquipmentRentalScreen';
import FixRentalEquipmentScreen from '../admin-screens/FixRentalEquipmentScreen';
import FixRentalEquipmentNewScreen from '../admin-screens/FixRentalEquipmentNewScreen';
import FixRentalSuppliesScreen from '../admin-screens/FixRentalSuppliesScreen';
import NineteenthScreen from '../admin-screens/NineteenthScreen';
import OrderDetailsScreen from '../admin-screens/OrderDetailsScreen';
import SixteenScreen from '../admin-screens/SixteenScreen';
import FourteenthScreen from '../admin-screens/FourteenthScreen';
import EditFirst from '../admin-screens/EditFirst';
import EditSecond from '../admin-screens/EditSecond';
import RoomReservationRecentScreen from '../screens/RoomReservationRecentScreen';
import CommunityScreen from '../screens/UserCommunity/CommunityScreen';
import CreateUserPostScreen from '../screens/UserCommunity/CreateUserPostScreen';
import UserPostDetailScreen from '../screens/UserCommunity/UserPostDetailScreen';
import FullImageViewScreen from '../screens/UserCommunity/FullImageViewScreen';
import AdminReportPostScreen from '../admin-screens/ReportPostAdmin';
import AdminReportPostDetailScreen from '../admin-screens/AdminReportPostDetailScreen';

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

      <Stack.Screen name="HomeScreenDetail1" component={HomeScreenDetail1} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MyScreen" component={MyScreen} />
      <Stack.Screen name="SecondScreen" component={SecondScreen} />
      <Stack.Screen name="ThirdScreen" component={ThirdScreen} />
      <Stack.Screen name="ForthScreen" component={ForthScreen} />
      <Stack.Screen name="ProductInfo" component={ProductInfo} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="TermsScreen" component={TermsScreen} />
      <Stack.Screen name="RoomScreen" component={RoomScreen} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen
        name="ProductShoppingBagScreen"
        component={ProductShoppingBagScreen}
      />
      <Stack.Screen name="RoomPaymentScreen" component={RoomPaymentScreen} />
      <Stack.Screen
        name="RoomReservationRecentScreen"
        component={RoomReservationRecentScreen}
      />
    </Stack.Navigator>
  );
};
export const CommunityNavigation = props => {
  return (
    <Stack.Navigator
      initialRouteName="CommunityScreen"
      screenOptions={AppNavigatorOptions}>
      <Stack.Screen name="CommunityScreen" component={CommunityScreen} />

      <Stack.Screen name="CreatePost" component={CreateUserPostScreen} />
      <Stack.Screen
        name="UserPostDetailScreen"
        component={UserPostDetailScreen}
      />
      <Stack.Screen
        name="FullImageViewScreen"
        component={FullImageViewScreen}
      />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

/**
 * @author
 * @function HomeNavigation
 **/
export const ProductNavigation = props => {
  return (
    <Stack.Navigator
      initialRouteName="RoomScreen"
      screenOptions={AppNavigatorOptions}>
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="MyScreen" component={MyScreen} />
      <Stack.Screen name="Rent" component={Rent} />
      <Stack.Screen name="SecondScreen" component={SecondScreen} />
      <Stack.Screen name="ThirdScreen" component={ThirdScreen} />
      <Stack.Screen name="ForthScreen" component={ForthScreen} />
      <Stack.Screen name="ProductInfo" component={ProductInfo} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="TermsScreen" component={TermsScreen} />
      <Stack.Screen
        name="ProductShoppingBagScreen"
        component={ProductShoppingBagScreen}
      />
      <Stack.Screen name="RoomPaymentScreen" component={RoomPaymentScreen} />
      <Stack.Screen
        name="RoomReservationRecentScreen"
        component={RoomReservationRecentScreen}
      />
    </Stack.Navigator>
  );
};

/**
 * @author
 * @function HomeNavigation
 **/
export const LocationNavigation = props => {
  return (
    <Stack.Navigator
      initialRouteName="RoomScreen"
      screenOptions={AppNavigatorOptions}>
      <Stack.Screen name="RoomScreen" component={RoomScreen} />
      <Stack.Screen name="MyScreen" component={MyScreen} />
      <Stack.Screen name="SecondScreen" component={SecondScreen} />
      <Stack.Screen name="ThirdScreen" component={ThirdScreen} />
      <Stack.Screen name="ForthScreen" component={ForthScreen} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="TermsScreen" component={TermsScreen} />
      <Stack.Screen name="Rent" component={Rent} />
      <Stack.Screen
        name="ProductShoppingBagScreen"
        component={ProductShoppingBagScreen}
      />
      <Stack.Screen
        name="RoomReservationListScreen"
        component={RoomReservationListScreen}
      />
      <Stack.Screen
        name="RoomReservationRecentScreen"
        component={RoomReservationRecentScreen}
      />
      <Stack.Screen name="RoomPaymentScreen" component={RoomPaymentScreen} />
    </Stack.Navigator>
  );
};

/**
 * @author
 * @function HomeNavigation
 **/
export const ProfileNavigation = props => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={AppNavigatorOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
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
      <Stack.Screen
        name="RoomReservationListScreen"
        component={RoomReservationListScreen}
      />
      <Stack.Screen
        name="RoomReservationRecentScreen"
        component={RoomReservationRecentScreen}
      />
      <Stack.Screen name="RoomPaymentScreen" component={RoomPaymentScreen} />
    </Stack.Navigator>
  );
};

/**
 * @author
 * @function HomeNavigation
 **/
export const AdminProductNavigation = props => {
  return (
    <Stack.Navigator
      initialRouteName="EquipmentRentalScreen"
      screenOptions={AppNavigatorOptions}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="EquipmentRentalScreen"
        component={EquipmentRentalScreen}
      />
      <Stack.Screen
        name="FixRentalEquipmentScreen"
        component={FixRentalEquipmentScreen}
      />
      <Stack.Screen
        name="FixRentalSuppliesScreen"
        component={FixRentalSuppliesScreen}
      />
      <Stack.Screen name="UserScreen" component={NineteenthScreen} />
      <Stack.Screen
        name="FixRentalEquipmentNewScreen"
        component={FixRentalEquipmentNewScreen}
      />
      <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
      <Stack.Screen name="EditFirstScreen" component={EditFirst} />
      <Stack.Screen name="EditSecondScreen" component={EditSecond} />
      <Stack.Screen
        name="RoomReservationRecentScreen"
        component={RoomReservationRecentScreen}
      />
    </Stack.Navigator>
  );
};

export const AdminLocationNavigation = props => {
  return (
    <Stack.Navigator
      initialRouteName="FourteenthScreen"
      screenOptions={AppNavigatorOptions}>
      <Stack.Screen name="FourteenthScreen" component={FourteenthScreen} />
      <Stack.Screen name="EditFirstScreen" component={EditFirst} />
      <Stack.Screen name="EditSecondScreen" component={EditSecond} />
    </Stack.Navigator>
  );
};

/**
 * @author
 * @function HomeNavigation
 **/
export const AdminOrderNavigation = props => {
  return (
    <Stack.Navigator
      initialRouteName="SixteenScreen"
      screenOptions={AppNavigatorOptions}>
      <Stack.Screen name="SixteenScreen" component={SixteenScreen} />
      <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
    </Stack.Navigator>
  );
};
export const AdminCommunityNavigation = props => {
  return (
    <Stack.Navigator
      initialRouteName="AdminReportPost"
      screenOptions={AppNavigatorOptions}>
      <Stack.Screen name="AdminReportPost" component={AdminReportPostScreen} />
      <Stack.Screen
        name="AdminReportPostDetailScreen"
        component={AdminReportPostDetailScreen}
      />
    </Stack.Navigator>
  );
};
