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

import COLOR from '../constants/colors';
import Toast from 'react-native-toast-message';
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
    if (startDate === returnDate && type === 'LOCATION') {
      return false;
    }
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
            if (startDate === returnDate && type === 'LOCATION') {
              Toast.show({
                type: 'error',
                text1: '체크인 날짜와 체크아웃 날짜가 같습니다. ',
                text2: '체크아웃 날짜를 다른 날짜로 선택하세요.',
                visibilityTime: 2000,
              });
            } else {
              Toast.show({
                type: 'error',
                text1: '체크아웃하기 전에 날짜를 선택해주세요.',
                visibilityTime: 2000,
              });
            }
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
