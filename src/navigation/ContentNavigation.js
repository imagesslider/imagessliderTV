import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AlbumsNavigation from '../navigation/AlbumsNavigation';
import VideosNavigation from '../navigation/VideosNavigation';

const Stack = createStackNavigator();

const ContentNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="albums"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="albums" component={AlbumsNavigation} />
      <Stack.Screen name="videos" component={VideosNavigation} />
    </Stack.Navigator>
  );
};

export default ContentNavigation;
