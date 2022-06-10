import React, { useEffect } from 'react'
import { MainNavigation } from './src/navigation/MainNavigation';
// import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux';
import store from './src/redux/store';

/**
* @author
* @function App
**/
const App = (props) => {

  // useEffect(() => {
  //   SplashScreen.hide()
  // }, [])

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  )
}

export default App;

