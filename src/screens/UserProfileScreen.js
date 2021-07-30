import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectedIdAction,
  setUserIsLoggedAction,
} from '../redux/actions/actionsApp';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfileScreen = () => {
  //state
  const [isFocus, setIsFocused] = useState(null);

  //state redux
  const selectUserIsLogged = state => state.appState.userIsLogged;
  const userIsLogged = useSelector(selectUserIsLogged);

  //actions redux
  const dispatch = useDispatch();

  //navigation
  const navigation = useNavigation();

  //onFocus
  const onFocus = () => {
    setIsFocused(true);
  };

  //onBlur
  const onBlur = () => {
    setIsFocused(false);
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
      console.log(e);
    }
  };

  const onPressSignOut = async () => {
    try {
      await clearAll();
      await auth().signOut();
      await dispatch(setUserIsLoggedAction(null));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      dispatch(selectedIdAction('user profile'));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../img/logoImagesSlider.png')}
        style={styles.imgLogo}
        width={52}
        height={33}
      />
      <Text style={styles.userName}>Welcome:</Text>
      <Text style={styles.userName}>{userIsLogged?.first_name}</Text>
      <Text style={styles.userName}>{userIsLogged?.last_name}</Text>
      <TouchableHighlight
        onPress={onPressSignOut}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
        style={[
          styles.touchableHighlight_signOut,
          {
            borderColor: isFocus ? '#ffc107' : '#fff',
            color: isFocus ? '#ffc107' : '#fff',
          },
        ]}>
        <Text
          style={[styles.titleSignOut, {color: isFocus ? '#ffc107' : '#fff'}]}>
          Sign Out
        </Text>
      </TouchableHighlight>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    color: '#ffc107',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  touchableHighlight_signOut: {
    borderWidth: 2,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 20,
  },
  imgLogo: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  isLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
