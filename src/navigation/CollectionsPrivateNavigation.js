import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CollectionsPrivateScreen from '../screens/collectionsPrivate/CollectionsPrivateScreen';
import CollectionPrivateImagesScreen from '../screens/collectionsPrivate/CollectionPrivateImagesScreen';
import CollectionPrivateImageSlider from '../screens/collectionsPrivate/CollectionPrivateImageSlider';

const Stack = createStackNavigator();

const CollectionsPrivateNavigation = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="collectionsPrivateScreen"
          component={CollectionsPrivateScreen}
        />
        <Stack.Screen
          name="collectionPrivateImagesScreen"
          component={CollectionPrivateImagesScreen}
        />
        <Stack.Screen
          name="collectionPrivateImageSlider"
          component={CollectionPrivateImageSlider}
        />
      </Stack.Navigator>
    </View>
  );
};

export default CollectionsPrivateNavigation;
