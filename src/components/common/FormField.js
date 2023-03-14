import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Button,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import COLOR from '../../constants/colors';

export default function FormField(props) {
  const {
    type,
    onChange,
    maxLength,
    label,
    placeholder,
    keyboardType,
    validate,
    disabled,
    autoFocus,
  } = props;
  const {formlabel, inputcontainer} = styles;
  const [lineColor, setLineColor] = useState(COLOR.black);
  const onFocus = () => setLineColor(COLOR.compGreen);
  const onBlur = () => {
    setLineColor(COLOR.black);
  };

  console.log('IS D', disabled);

  switch (type) {
    case 'textButton':
      return (
        <View style={inputcontainer}>
          <Text style={formlabel}>인증번호</Text>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <View style={{width: '70%'}}>
              <TextInput
                style={{
                  color: '#000',
                  borderBottomWidth: 1,
                  borderBottomColor: lineColor,
                  width: '100%',
                }}
                placeholderTextColor="grey"
                onFocus={() => onFocus()}
                onBlur={() => onBlur()}
                keyboardType="number-pad"
                onChangeText={value => {}}
                onSubmitEditing={() => {}}
              />
            </View>
            <TouchableHighlight
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderBottomColor: lineColor,
                width: '30%',
              }}
              onPress={() => {}}
              underlayColor="transparent">
              <View
                style={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: 'grey',
                  padding: 4,
                }}>
                <Text style={{color: '#000'}}>번인증번</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      );
    case 'text':
      return (
        <View style={inputcontainer}>
          <Text style={formlabel}>{label}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <TextInput
              style={{
                color: '#000',
                borderBottomWidth: 1,
                borderBottomColor: lineColor,
                width: '100%',
                padding: 8,
              }}
              maxLength={maxLength}
              onFocus={() => onFocus()}
              onBlur={() => onBlur()}
              keyboardType={keyboardType}
              autoCapitalize="none"
              onChangeText={value => {
                onChange(value);
              }}
              editable={disabled}
              placeholder={placeholder}
              placeholderTextColor="grey"
              autoFocus={autoFocus}
            />
          </View>
        </View>
      );
  }
}
const styles = StyleSheet.create({
  formlabel: {
    fontSize: RFPercentage(2.5),
    color: '#9DA9CE',
  },
  inputcontainer: {
    marginVertical: hp('2%'),
  },
});
