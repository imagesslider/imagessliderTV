import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {selectedIdAction, inImagesAction} from '../redux/actions/actionsApp';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const SigninScreen = () => {
  //ref
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  //state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //actions redux
  const dispatch = useDispatch();

  //navigation
  const navigation = useNavigation();

  const onPressSubmit = async () => {
    if (email.length === 0 && password.length === 0) {
      setError('Email or Password is empty');
      return;
    }
    try {
      setError();
      setIsLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitEditingEmail = () => {
    return inputPasswordRef.current.focus();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      dispatch(selectedIdAction('sign in'));
      dispatch(inImagesAction(true));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // The screen is focused
      // Call any action
      dispatch(inImagesAction(false));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  //isLoading
  if (isLoading) {
    return (
      <View style={styles.isLoading}>
        <ActivityIndicator size="large" color="#ffc107" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../img/logoImagesSlider.png')}
        style={styles.imgLogo}
        width={52}
        height={33}
      />
      <View>
        <Text style={styles.signIn_title}>Sign in</Text>
      </View>
      {error && (
        <View>
          <Text style={styles.signIn_error}>{error}</Text>
        </View>
      )}
      <ScrollView>
        <TouchableHighlight
          onFocus={() => {
            if (inputEmailRef.current) {
              inputEmailRef.current.focus();
            }
          }}>
          <TextInput
            ref={inputEmailRef}
            placeholder={'Email'}
            placeholderTextColor={'gray'}
            clearButtonMode={'always'}
            autoCorrect={false}
            autoFocus={true}
            style={styles.textInput}
            onChangeText={email => setEmail(email)}
            returnKeyType="next"
            onSubmitEditing={() => onSubmitEditingEmail()}
            blurOnSubmit={false}
          />
        </TouchableHighlight>
        <TouchableHighlight
          onFocus={() => {
            if (inputPasswordRef.current) {
              inputPasswordRef.current.focus();
            }
          }}>
          <TextInput
            ref={inputPasswordRef}
            placeholder={'Password'}
            placeholderTextColor={'gray'}
            clearButtonMode={'always'}
            autoCorrect={false}
            autoFocus={false}
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={password => setPassword(password)}
            returnKeyType="done"
            onSubmitEditing={() => onPressSubmit()}
          />
        </TouchableHighlight>
        <View>
          <Text style={styles.signIn_info}>
            To open an account please visit our site imagesslider.com
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signIn_title: {
    color: '#ffc107',
    fontSize: 20,
    textTransform: 'capitalize',
    marginBottom: 20,
    marginTop: 20,
  },
  signIn_info: {
    color: '#ffc107',
    fontSize: 14,
    marginBottom: 20,
    marginTop: 20,
  },
  signIn_error: {
    color: 'red',
    fontSize: 14,
    textTransform: 'capitalize',
    marginBottom: 20,
  },
  signIn_button_submit: {
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
  signIn_button_submit_view_text: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    width: '100%',
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
  isLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
