import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import COLOR from '../../constants/colors';
import FONTSIZE from '../../constants/fontSize';

export default function CustomButton(props) {
  const {buttonText, buttonHandler} = props;

  return (
    <TouchableOpacity
      onPress={() => {
        buttonHandler();
      }}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: hp('2%'),
    backgroundColor: COLOR.compBlackI,
  },
  buttonText: {
    color: COLOR.compGreenI,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: FONTSIZE.xlll,
    textAlign: 'center',
  },
});
