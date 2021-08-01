import React, {useEffect} from 'react';
import AndroidTV from './src/androidTV/AndroidTV';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import allReducer from './src/redux/reducers/index';
import thunk from 'redux-thunk';

import SplashScreen from 'react-native-splash-screen';
import codePush from 'react-native-code-push';

const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(allReducer, composeEnhancers(applyMiddleware(thunk)));

let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_START};

const App = () => {
  //useEffect
  useEffect(() => {
    //codepush
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
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

export default codePush(codePushOptions)(App);
