import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {navigationRef} from '../navigation/Navigation';
import MenuNavigation from '../navigation/MenuNavigation';
import ContentNavigation from '../navigation/ContentNavigation';

const AndroidTV = () => {
  //state redux
  const selectInImages = state => state.appState.inImages;
  const inImages = useSelector(selectInImages);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}>
      <NavigationContainer ref={navigationRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000',
            flexDirection: 'row',
          }}>
          {!inImages && <MenuNavigation />}
          <ContentNavigation />
        </View>
      </NavigationContainer>
    </View>
  );
};

export default AndroidTV;
