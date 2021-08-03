import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AlbumsNavigation from '../navigation/AlbumsNavigation';
import ImagesPrivateNavigation from './ImagesPrivateNavigation';
import {useDispatch, useSelector} from 'react-redux';
import UserProfileScreen from '../screens/UserProfileScreen';
import SigninScreen from '../screens/SigninScreen';
import CollectionsPrivateNavigation from './CollectionsPrivateNavigation';
import {setUserIsLoggedAction} from '../redux/actions/actionsApp';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsNavigation from './SettingsNavigation';

const Stack = createStackNavigator();

const ContentNavigation = () => {
  //state redux
  const selectCurrentUser = state => state.appState.currentUser;
  const currentUser = useSelector(selectCurrentUser);
  const selectUserIsLogged = state => state.appState.userIsLogged;
  const userIsLogged = useSelector(selectUserIsLogged);

  //actions redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser?.uid !== undefined) {
      firestore()
        .collection('users')
        .doc(currentUser?.uid)
        .onSnapshot(snapshot => {
          dispatch(setUserIsLoggedAction(snapshot.data()));
          AsyncStorage.setItem('userIsLogged', JSON.stringify(snapshot.data()));
        });
    }
  }, [currentUser]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userIsLogged');
      if (value !== null) {
        // value previously stored
        dispatch(setUserIsLoggedAction(JSON.parse(value)));
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [currentUser]);

  return (
    <Stack.Navigator
      initialRouteName="albums"
      screenOptions={{
        headerShown: false,
      }}>
      {userIsLogged !== null ? (
        <>
          <Stack.Screen name="albums" component={AlbumsNavigation} />
          <Stack.Screen
            name="images private"
            component={ImagesPrivateNavigation}
          />
          <Stack.Screen
            name="collections private"
            component={CollectionsPrivateNavigation}
          />
          <Stack.Screen name="settings" component={SettingsNavigation} />
          <Stack.Screen name="user profile" component={UserProfileScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="albums" component={AlbumsNavigation} />
          <Stack.Screen
            name="images private"
            component={ImagesPrivateNavigation}
          />
          <Stack.Screen
            name="collections private"
            component={CollectionsPrivateNavigation}
          />
          <Stack.Screen name="settings" component={SettingsNavigation} />
          <Stack.Screen name="sign in" component={SigninScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ContentNavigation;
