import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AdminCommunityNavigation,
  AdminLocationNavigation,
  AdminOrderNavigation,
  AdminProductNavigation,
  CommunityNavigation,
  HomeNavigation,
  LocationNavigation,
  ProductNavigation,
  ProfileNavigation,
} from './HomeNavigation';
import {HeartScreen} from '../screens/HeartScreen';
import {LocationScreen} from '../screens/LocationScreen';
import {ChatScreen} from '../screens/ChatScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {MyScreen} from '../screens/MyScreen';
import SecondScreen from '../screens/SecondScreen';
import ThirdScreen from '../screens/OrderSuccessItemScreen';
import ForthScreen from '../screens/OrderSuccessCamp';
import RoomScreen from '../screens/RoomScreen';
import ProductShoppingBagScreen from '../screens/ProductShoppingBagScreen';
import RoomPaymentScreen from '../screens/RoomPaymentScreen';
import {Product} from '../screens/Product';
import RoomReservationListScreen from '../screens/RoomReservationListScreen';
import {connect, useSelector} from 'react-redux';
import EquipmentRentalScreen from '../admin-screens/EquipmentRentalScreen';
import FixRentalEquipmentScreen from '../admin-screens/FixRentalEquipmentScreen';
import FixRentalSuppliesScreen from '../admin-screens/FixRentalSuppliesScreen';
import NineteenthScreen from '../admin-screens/NineteenthScreen';
import FourteenthScreen from '../admin-screens/FourteenthScreen';
import SixteenScreen from '../admin-screens/SixteenScreen';
import AdminReportPostScreen from '../admin-screens/ReportPostAdmin';

const Tab = createBottomTabNavigator();

const AppNavigatorOptions = {
  headerShown: false,
  gestureEnabled: false,
};

const mapStateToProps = (state, ownProps) => {
  const role = state?.oauth?.user_data?.data?.role;
  const isLogin = state?.oauth?.isLogin;
  return {
    role,
    isLogin,
  };
};

/**
 * @author
 * @function HomeTabNavigation
 **/
const HomeTabNavigation = props => {
  const {tabIcon} = styles;
  const {role, isLogin} = props;

  console.log('ROLE ===>', role);

  return role === 'ADMIN' && isLogin ? (
    <Tab.Navigator
      initialRouteName="AdminProductScreen"
      screenOptions={tabs => {
        const {name} = tabs.route;
        if (name === 'AdminProductScreen') {
          return {
            tabBarIcon: () => {
              return (
                <Image
                  style={{...tabIcon}}
                  source={require('../assets/images/heart.png')}
                />
              );
            },
            tabBarLabel: '용품대여',
            tabBarStyle: {
              // height: 70,
            },
            tabBarItemStyle: {
              padding: 7,
            },
            ...AppNavigatorOptions,
          };
        } else if (name === 'AdminLocationScreen') {
          return {
            tabBarIcon: () => {
              return (
                <Image
                  style={tabIcon}
                  source={require('../assets/images/location.png')}
                />
              );
            },
            tabBarLabel: '캠핑장 예약',
            tabBarStyle: {
              // height: 70,
            },
            tabBarItemStyle: {
              padding: 7,
            },
            ...AppNavigatorOptions,
          };
        } else if (name === 'AdminOrderScreen') {
          return {
            tabBarIcon: () => {
              return (
                <Image
                  style={tabIcon}
                  source={require('../assets/images/home.png')}
                />
              );
            },
            tabBarLabel: '결제승인',
            tabBarStyle: {
              height: 70,
            },
            tabBarItemStyle: {
              padding: 7,
            },
            ...AppNavigatorOptions,
          };
        } else if (name === 'AdminReportPost') {
          return {
            tabBarIcon: () => {
              return (
                <Image
                  style={tabIcon}
                  source={require('../assets/communityIcons/communityIcon.png')}
                />
              );
            },
            tabBarLabel: '글 신고',
            tabBarStyle: {
              height: 70,
            },
            tabBarItemStyle: {
              padding: 7,
            },
            ...AppNavigatorOptions,
          };
        } else if (name === 'AdminUserScreen') {
          return {
            tabBarIcon: () => {
              return (
                <Image
                  style={tabIcon}
                  source={require('../assets/images/profile.png')}
                />
              );
            },
            tabBarLabel: '회원관리',
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
      <Tab.Screen
        name="AdminProductScreen"
        component={AdminProductNavigation}
      />
      <Tab.Screen
        name="AdminLocationScreen"
        component={AdminLocationNavigation}
      />
      {/* <Tab.Screen name="AdminLocationScreen" component={FourteenthScreen} /> */}
      <Tab.Screen name="AdminOrderScreen" component={AdminOrderNavigation} />
      <Tab.Screen name="AdminReportPost" component={AdminCommunityNavigation} />
      <Tab.Screen name="AdminUserScreen" component={NineteenthScreen} />
    </Tab.Navigator>
  ) : (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={tabs => {
        const {name} = tabs.route;
        if (name === 'Home') {
          return {
            tabBarIcon: () => {
              return (
                <Image
                  style={{...tabIcon}}
                  source={require('../assets/images/home.png')}
                />
              );
            },
            tabBarLabel: '그린홈',
            tabBarStyle: {
              // height: 70,
            },
            tabBarItemStyle: {
              padding: 7,
            },
            ...AppNavigatorOptions,
            unmountOnBlur: true,
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
              // height: 70,
            },

            tabBarItemStyle: {
              padding: 7,
            },
            ...AppNavigatorOptions,
            unmountOnBlur: true,
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
            unmountOnBlur: true,
            ...AppNavigatorOptions,
          };
        } else if (name === 'Community') {
          return {
            tabBarIcon: () => {
              return (
                <Image
                  style={tabIcon}
                  source={require('../assets/communityIcons/communityIcon.png')}
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
            unmountOnBlur: true,
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
            unmountOnBlur: true,
            ...AppNavigatorOptions,
          };
        }
      }}>
      <Tab.Screen name="Home" component={HomeNavigation} />
      <Tab.Screen name="Heart" component={ProductNavigation} />
      <Tab.Screen name="Location" component={LocationNavigation} />
      <Tab.Screen name="Community" component={CommunityNavigation} />
      <Tab.Screen name="Profile" component={ProfileNavigation} />
    </Tab.Navigator>
  );
};

export default connect(mapStateToProps, null)(HomeTabNavigation);

const styles = StyleSheet.create({
  tabIcon: {
    height: 15,
    width: 15,
  },
});
