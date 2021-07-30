import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ImagesPrivateScreen from '../screens/imagesPrivate/ImagesPrivateScreen';
import {View} from 'react-native';
import ImagesPrivateImageSlider from '../screens/imagesPrivate/ImagesPrivateImageSlider';

const Stack = createStackNavigator();

const ImagesPrivateNavigation = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <Stack.Navigator
        // initialRouteName="albumsScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="imagesPrivateScreen"
          component={ImagesPrivateScreen}
        />
        <Stack.Screen
          name="imagesPrivateImageSlider"
          component={ImagesPrivateImageSlider}
        />
      </Stack.Navigator>
    </View>
  );
};

export default ImagesPrivateNavigation;
