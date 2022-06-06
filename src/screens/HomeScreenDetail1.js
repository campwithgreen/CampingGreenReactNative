import React from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import MainPageCard from '../components/MainPageCard';
import Header from '../layout/Header';
import {goBack} from '../navigation/utils/RootNavigation';

export const HomeScreenDetail1 = props => {
  const {container} = styles;
  return (
    <View style={container}>
      <Header />
      <Text style={{color: 'black'}}>HELLO</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
