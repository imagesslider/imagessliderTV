import React, {useEffect} from 'react';
import {Linking} from 'react-native';
import AndroidTV from './src/androidTV/AndroidTV';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import allReducer from './src/redux/reducers/index';
import thunk from 'redux-thunk';

import SplashScreen from 'react-native-splash-screen';
import VersionCheck from 'react-native-version-check';

const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(allReducer, composeEnhancers(applyMiddleware(thunk)));

const App = () => {
  //useEffect
  useEffect(() => {
    //react-native-version-check
    VersionCheck.needUpdate().then(async res => {
      if (res.isNeeded) {
        Linking.openURL(res.storeUrl); // open store if update is needed.
      }
    });
    //splashScreen
    const splashScreen = async () => {
      const splasscreen = setTimeout(() => SplashScreen.hide(), 200);

      return () => {
        clearTimeout(splasscreen);
      };
    };
    splashScreen();
  }, []);

  return (
    <Provider store={store}>
      <AndroidTV />
    </Provider>
  );
};

export default App;
