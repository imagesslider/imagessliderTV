import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AlbumsScreen from '../screens/AlbumsScreen';
import AlbumScreen from '../screens/AlbumScreen';
import ImagesScreen from '../screens/ImagesScreen';
import {View} from 'react-native';

const Stack = createStackNavigator();

const AlbumsNavigation = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <Stack.Navigator
        // initialRouteName="albumsScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="albumsScreen" component={AlbumsScreen} />
        <Stack.Screen name="albumSreen" component={AlbumScreen} />
        <Stack.Screen name="imagesSreen" component={ImagesScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default AlbumsNavigation;
