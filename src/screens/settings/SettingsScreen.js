import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectedIdAction,
  setIntervalTimeAction,
} from '../../redux/actions/actionsApp';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  //ref
  const inputIntervalTimeRef = useRef();
  //state
  const [intervalTimeInput, setIntervalTimeInput] = useState(null);
  const [error, setError] = useState();
  const [isFocus, setIsFocused] = useState(null);
  const [success, setSuccess] = useState();

  //state redux
  const selectIntervalTime = state => state.appState.intervalTime;
  const intervalTime = useSelector(selectIntervalTime);

  console.log('intervalTime', intervalTime);

  //actions redux
  const dispatch = useDispatch();

  //navigation
  const navigation = useNavigation();

  const onPressSubmit = async () => {
    if (intervalTimeInput == 0 || isNaN(intervalTimeInput)) {
      setError('Interval Time is 0 or is String');
      setSuccess();
      return;
    } else {
      setError();
      dispatch(setIntervalTimeAction(intervalTimeInput * 1000));
      AsyncStorage.setItem(
        'intervalTime',
        JSON.stringify(intervalTimeInput * 1000),
      );
      setSuccess('The change is successful');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      dispatch(selectedIdAction('settings'));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../img/logoImagesSlider.png')}
        style={styles.imgLogo}
        width={52}
        height={33}
      />
      <View>
        <Text style={styles.settings_title}>Settings</Text>
      </View>
      {error && (
        <View>
          <Text style={styles.settings_error}>{error}</Text>
        </View>
      )}
      {success && (
        <View>
          <Text style={styles.settings_success}>{success}</Text>
        </View>
      )}
      <ScrollView>
        <View>
          <Text style={styles.settings_intervalTime}>
            Interval Time for Images Slider
          </Text>
        </View>
        <TouchableHighlight
          onFocus={() => {
            if (inputIntervalTimeRef.current) {
              inputIntervalTimeRef.current.focus();
            }
          }}>
          <TextInput
            ref={inputIntervalTimeRef}
            placeholder={`${intervalTime / 1000} seconds`}
            placeholderTextColor={'gray'}
            clearButtonMode={'always'}
            autoCorrect={false}
            autoFocus={true}
            keyboardType="numeric"
            style={styles.textInput}
            onChangeText={intervalTimeInput =>
              setIntervalTimeInput(intervalTimeInput)
            }
          />
        </TouchableHighlight>
        <TouchableHighlight
          style={[
            styles.settings_button_submit,
            {
              color: isFocus ? '#ffc107' : '#fff',
              borderColor: isFocus ? '#ffc107' : '#fff',
            },
          ]}
          onPress={onPressSubmit}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}>
          <View style={styles.settings_button_submit_view_text}>
            <Text style={{color: isFocus ? '#ffc107' : '#fff'}}>Submit</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settings_title: {
    color: '#ffc107',
    fontSize: 20,
    textTransform: 'capitalize',
    marginBottom: 20,
    marginTop: 20,
  },
  settings_intervalTime: {
    color: '#fff',
    fontSize: 14,
  },
  settings_error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 20,
  },
  settings_success: {
    color: 'green',
    fontSize: 14,
    marginBottom: 20,
  },
  settings_button_submit: {
    color: '#fff',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    textTransform: 'capitalize',
    borderColor: '#fff',
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  settings_button_submit_view_text: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    width: '100%',
    minWidth: 300,
    height: 50,
    padding: 10,
    fontSize: 20,
    justifyContent: 'center',
    marginBottom: 20,
  },
  imgLogo: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
