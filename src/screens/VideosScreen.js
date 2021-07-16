import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const VideosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleVideos}>Coming soon</Text>
    </View>
  );
};

export default VideosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleVideos: {
    color: '#ffc107',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 60,
    paddingRight: 20,
    fontSize: 20,
    textTransform: 'capitalize',
  },
});
