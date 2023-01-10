import React from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Header from '../layout/Header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import CustomCalendar from '../components/common/Calendar';
import {goBack, navigateTo} from '../navigation/utils/RootNavigation';
import CustomButton from '../components/common/CustomButton';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import COLOR from '../constants/colors';

const headerContent = {
  leftItemContents: {
    type: 'text',
    content: '대여일정 선택',
  },
  rightItemContents: {
    type: 'image',
    content: require('../assets/images/cancel.png'),
    navigateScreen: () => goBack(),
  },
};

let ScreenHeight = Dimensions.get('window').height;

const CalendarScreen = props => {
  const {container} = styles;
  const startDate = useSelector(st => st.common.start_date);
  const returnDate = useSelector(st => st.common.return_date);

  const {route} = props;

  const type = route?.params?.type || 'PRODUCT';

  const enableCheckout = () => {
    if (startDate && returnDate) {
      return true;
    }
    return false;
  };

  return (
    <View style={container}>
      <Header headerContent={headerContent} />
      <ScrollView>
        <CustomCalendar screenType={type} />
      </ScrollView>
      <CustomButton
        buttonText={'예약하기'}
        buttonHandler={() => {
          if (enableCheckout()) {
            if (type === 'LOCATION') {
              navigateTo('Rent');
            } else {
              navigateTo('ProductInfo');
            }
          } else {
            Toast.showWithGravity(
              'Please Select the Date for Checkout',
              Toast.LONG,
              Toast.TOP,
            );
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flex: 1,
  },
});

export default CalendarScreen;
