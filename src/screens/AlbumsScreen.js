import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setAlbumsFirebaseAction} from '../redux/actions/actionsFirebase';
import {
  setIsFocusedMenuAction,
  selectedIdAction,
} from '../redux/actions/actionsApp';

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
        source={{uri: item?.images ? item?.images[0]?.thumb : image}}
        style={styles.imageItem}>
        <Text style={[styles.title, {color: isFocus ? '#ffc107' : '#fff'}]}>
          {item.name}
        </Text>
      </ImageBackground>
    </TouchableHighlight>
  );
};

const AlbumsScreen = () => {
  //state
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //state redux
  const selectAlbums = state => state.appState.albums;
  const albums = useSelector(selectAlbums);

  //actions redux
  const dispatch = useDispatch();

  //navigation
  const navigation = useNavigation();

  //renderItem <
  const renderItem = ({item}) => {
    const borderColor = item.id === selectedId ? '#ffc107' : 'transparent';

    const onPress = item => {
      setSelectedId(item.id);
      navigation.navigate('albumSreen', {albumId: item.id, album: item});
    };

    return (
      <Item item={item} onPress={() => onPress(item)} style={{borderColor}} />
    );
  };
  //renderItem />

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      // Call any action
      await dispatch(selectedIdAction('albums'));
      await setIsLoading(true);
      await dispatch(setAlbumsFirebaseAction());
      await setIsLoading(false);
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
      <View
        // source={{uri: !!albums ? albums[0]?.images[0]?.url : image}}
        style={styles.image}>
        <View style={styles.content}>
          <Image
            source={require('../../img/logoImagesSlider.png')}
            style={styles.imgLogo}
            width={52}
            height={33}
          />
          <Text style={styles.albums_title_info}>
            Turn your smart TV into Art gallery. Smart TV application turns your
            TV into the art gallery. Using the free app, you can switch your big
            blank screen into your personal photo album. The web site is
            compatible with all Smart tv devices. Also, it is available at any
            other device such as computer desktop, Laptop, Tablet or mobile
            phone. Open the site and a huge collection of HD images and videos
            will be at your disposal. Over 1000 high-quality images from various
            themes in the library are free for use. Transform your place into
            digital art and add some color in your life. You can also run your
            collection connecting with your account.
          </Text>
          <Text style={styles.titleAlbums}>Albums</Text>
          <View style={styles.flatList}>
            <FlatList
              data={albums}
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

export default AlbumsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
  titleAlbums: {
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
  albums_title_info: {
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    fontWeight: '800',
    color: '#fff',
    paddingLeft: 60,
    paddingRight: 20,
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
