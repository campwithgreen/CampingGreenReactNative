import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MainNavigation } from './src/navigation/MainNavigation';
import { navigateTo } from './src/navigation/utils/RootNavigation';
import SplashScreen from 'react-native-splash-screen'

/**
* @author
* @function App
**/
const App = (props) => {

  React.useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <MainNavigation />
  )
}

export default App;

