import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import VideosScreen from '../screens/VideosScreen';

const Stack = createStackNavigator();

const VideosNavigation = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <Stack.Navigator
        initialRouteName="videosScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="videosScreen" component={VideosScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default VideosNavigation;
