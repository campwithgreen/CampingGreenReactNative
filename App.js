import React, { useState, useEffect } from 'react';
import { MainNavigation } from './src/navigation/MainNavigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import SplashScreen from './src/screens/SplashScreen';
import { LogBox } from 'react-native';

/**
* @author
* @function App
**/
const App = (props) => {

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const [splash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => { setSplash(false); }, 1300);
  }, []);

  return (
    splash ? <SplashScreen /> :
      <Provider store={store}>
        <MainNavigation />
      </Provider>
  );
};

export default App;

