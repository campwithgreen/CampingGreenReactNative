import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../layout/Header';
import HomeScreenDetail from '../components/HomeScreenDetail';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Carousel from '../components/Carousel';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/actions/oauth';
import {navigateTo} from '../navigation/utils/RootNavigation';

const headerContent = {
  leftItemContents: {
    type: 'text',
    content: 'CAMPING GREEEN',
    navigateScreen: 'HomeScreenDetail1',
  },
  rightItemContents: {
    type: 'image',
    content: require('../assets/images/cart.png'),
    navigateScreen: 'LoginScreen',
  },
};

export const ProductInfo = props => {
  const {container} = styles;
  const dispatch = useDispatch();

  return (
    <View style={container}>
      <Header headerContent={headerContent} />
      <ScrollView>
        <View>
          <Carousel />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingBottom: hp('10%')},
});
