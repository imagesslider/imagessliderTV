import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setAlbumFirebaseAction} from '../redux/actions/actionsFirebase';
import {setAlbum, setIsFocusedMenuAction} from '../redux/actions/actionsApp';

const image = require('../../img/logoImagesSlider.png');

const Item = ({item, onPress, style}) => {
  //state
  const [isFocus, setIsFocused] = useState(null);

  //actions redux
  const dispatch = useDispatch();

  //onFocus
  const onFocus = () => {
    setIsFocused(true);
    dispatch(setIsFocusedMenuAction(false));
  };

  //onBlur
  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <TouchableHighlight
      onPress={onPress}
      style={[
        styles.item,
        style,
        {borderColor: isFocus ? '#ffc107' : 'transparent'},
      ]}
      onFocus={() => onFocus()}
      onBlur={() => onBlur()}>
      <ImageBackground
        source={{uri: !!item ? item?.thumb : image}}
        style={styles.imageItem}>
        <Text style={[styles.title, {color: isFocus ? '#ffc107' : '#fff'}]}>
          {item.description}
        </Text>
      </ImageBackground>
    </TouchableHighlight>
  );
};

const AlbumScreen = () => {
  //state
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [albumName, setAlbumName] = useState(null);

  //state redux
  const selectAlbum = state => state.appState.album;
  const album = useSelector(selectAlbum);

  //navigation
  const navigation = useNavigation();

  //route
  const route = useRoute();

  //actions redux
  const dispatch = useDispatch();

  //renderItem <
  const renderItem = ({item, index}) => {
    const borderColor = item.id === selectedId ? '#ffc107' : 'transparent';

    const onPress = (item, index) => {
      setSelectedId(item.id);
      navigation.navigate('imagesSreen', {
        albumId: route.params.albumId,
        indexImage: index,
      });
    };

    return (
      <Item
        item={item}
        onPress={() => onPress(item, index)}
        style={{borderColor}}
      />
    );
  };
  //renderItem />

  //useEffect
  useEffect(() => {
    const loadAlbum = async () => {
      setIsLoading(true);
      setAlbumName(route.params.album.name);
      await dispatch(setAlbumFirebaseAction(route.params.albumId));
      setIsLoading(false);
    };
    loadAlbum();
    return () => {
      dispatch(setAlbum([]));
    };
  }, [dispatch]);

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
      <View
        // source={{uri: !!album ? album[0]?.url : image}}
        style={styles.image}>
        <View style={styles.content}>
          <Image
            source={require('../../img/logoImagesSlider.png')}
            style={styles.imgLogo}
            width={52}
            height={33}
          />
          <Text style={styles.titleAlbum}>
            {albumName !== null && `Album: ${albumName}`}
          </Text>
          <View style={styles.flatList}>
            <FlatList
              data={album}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={selectedId}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AlbumScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  flatList: {
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 40,
  },
  item: {
    marginHorizontal: 20,
    width: 356,
    height: 200,
    borderWidth: 2,
  },
  imageItem: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleAlbum: {
    color: '#ffc107',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 60,
    paddingRight: 20,
    fontSize: 20,
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textTransform: 'capitalize',
    fontWeight: '800',
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
