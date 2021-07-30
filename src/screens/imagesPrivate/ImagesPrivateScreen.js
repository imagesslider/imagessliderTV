import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectedIdAction,
  setIsFocusedMenuAction,
} from '../../redux/actions/actionsApp';
import firestore from '@react-native-firebase/firestore';

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
        styles.images_private_item,
        style,
        {borderColor: isFocus ? '#ffc107' : 'transparent'},
      ]}
      onFocus={() => onFocus()}
      onBlur={() => onBlur()}>
      <ImageBackground
        source={{uri: item?.url}}
        style={styles.images_private_imageItem}>
        <Text
          style={[
            styles.images_private_title_img,
            {color: isFocus ? '#ffc107' : '#fff'},
          ]}>
          {item.name}
        </Text>
      </ImageBackground>
    </TouchableHighlight>
  );
};

const ImagesPrivateScreen = () => {
  //state
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  //state redux
  const selectUserIsLogged = state => state.appState.userIsLogged;
  const userIsLogged = useSelector(selectUserIsLogged);

  //actions redux
  const dispatch = useDispatch();

  //navigation
  const navigation = useNavigation();

  //renderItem <
  const renderItem = ({item, index}) => {
    const borderColor = item.id === selectedId ? '#ffc107' : 'transparent';

    const onPress = (item, index) => {
      setSelectedId(item.id);
      navigation.navigate('imagesPrivateImageSlider', {indexImage: 0});
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

  const fetchImagesPrivate = () => {
    if (userIsLogged?.user_id !== undefined) {
      const unsubscribe = firestore()
        .collection('images_private')
        .doc(userIsLogged?.user_id)
        .collection('images')
        .onSnapshot((snapshot, error) => {
          if (error) {
            console.log(error);
          } else if (snapshot) {
            let images = snapshot.docs.map(doc => {
              const data = doc.data();
              const id = doc.id;
              return {id, ...data};
            });
            setImages(images);
          }
          setIsLoading(false);
        });
      return unsubscribe;
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      // Call any action
      try {
        await dispatch(selectedIdAction('images private'));
        await setIsLoading(true);
        await fetchImagesPrivate();
      } catch (error) {
        console.log(error);
      }
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, userIsLogged]);

  if (userIsLogged === null) {
    return (
      <View style={styles.images_private_container}>
        <Text style={styles.images_private_title_pro}>User is not logged.</Text>
      </View>
    );
  }

  if (userIsLogged?.user_pro === false) {
    return (
      <View style={styles.images_private_container}>
        <Text style={styles.images_private_title_pro}>
          Images Private is a PRO feature.Contact us: contact@imagesslider.com
        </Text>
      </View>
    );
  }

  //isLoading
  if (isLoading) {
    return (
      <View style={styles.isLoading}>
        <ActivityIndicator size="large" color="#ffc107" />
      </View>
    );
  }

  return (
    <View style={styles.images_private_container}>
      <Image
        source={require('../../../img/logoImagesSlider.png')}
        style={styles.imgLogo}
        width={52}
        height={33}
      />
      <View>
        <Text style={styles.images_private_title}>Images Private</Text>
      </View>
      <View>
        <Text style={styles.images_private_title_images_length}>
          {images?.length === 1
            ? `Image: ${images?.length}`
            : `Images: ${images?.length === undefined ? '0' : images?.length}`}
        </Text>
      </View>
      <View style={styles.images_private_flatList}>
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          initialNumToRender={images.length}
        />
      </View>
    </View>
  );
};

export default ImagesPrivateScreen;

const styles = StyleSheet.create({
  images_private_container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
  images_private_title: {
    color: '#ffc107',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  images_private_title_pro: {
    color: '#ffc107',
    fontSize: 20,
  },
  images_private_title_images_length: {
    color: '#ffc107',
    fontSize: 20,
    textTransform: 'capitalize',
    marginBottom: 20,
  },
  images_private_flatList: {
    flexWrap: 'wrap',
  },
  images_private_item: {
    height: 200,
    borderWidth: 2,
  },
  images_private_imageItem: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  images_private_title_img: {
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
