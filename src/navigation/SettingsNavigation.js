import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Stack = createStackNavigator();

const SettingsNavigation = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <Stack.Navigator
        // initialRouteName="albumsScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="settings" component={SettingsScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default SettingsNavigation;
