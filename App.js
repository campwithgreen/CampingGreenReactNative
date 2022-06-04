import React, { useEffect } from 'react'
import { MainNavigation } from './src/navigation/MainNavigation';
import SplashScreen from 'react-native-splash-screen'

/**
* @author
* @function App
**/
const App = (props) => {

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <MainNavigation />
  )
}

export default App;

