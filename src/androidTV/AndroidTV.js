import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCurrentUserAction,
  setIntervalTimeAction,
} from '../redux/actions/actionsApp';
import {navigationRef} from '../navigation/Navigation';
import MenuNavigation from '../navigation/MenuNavigation';
import ContentNavigation from '../navigation/ContentNavigation';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AndroidTV = () => {
  //state redux
  const selectInImages = state => state.appState.inImages;
  const inImages = useSelector(selectInImages);

  //actions redux
  const dispatch = useDispatch();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    dispatch(setCurrentUserAction(user));
    if (initializing) setInitializing(false);
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('intervalTime');
      if (value !== null) {
        // value previously stored
        dispatch(setIntervalTimeAction(JSON.parse(value)));
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    getData();
  }, []);

  if (initializing) return null;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}>
      <NavigationContainer ref={navigationRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000',
          }}>
          {!inImages && <MenuNavigation />}
          <ContentNavigation />
        </View>
      </NavigationContainer>
    </View>
  );
};

export default AndroidTV;
