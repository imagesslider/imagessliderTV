import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {inImagesAction, setImages} from '../../redux/actions/actionsApp';
import firestore from '@react-native-firebase/firestore';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';

const {width, height} = Dimensions.get('screen');

const Item = ({item}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        width: width,
        height: height,
        margin: 0,
        padding: 0,
      }}>
      <Image
        source={{
          uri: `${item.url}`,
        }}
        style={{width: '100%', height: '100%'}}
        resizeMode={'center'}
      />
    </View>
  );
};

const ImagesPrivateImageSlider = () => {
  //useKeepAwake
  useKeepAwake();

  //state
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  //ref
  const flatListIndex = useRef();

  //state redux
  const selectUserIsLogged = state => state.appState.userIsLogged;
  const userIsLogged = useSelector(selectUserIsLogged);
  const selectIntervalTime = state => state.appState.intervalTime;
  const intervalTime = useSelector(selectIntervalTime);

  //actions redux
  const dispatch = useDispatch();

  //route
  const route = useRoute();

  //state redux
  const selectImages = state => state.appState.images;
  const images = useSelector(selectImages);

  //scrollToIndex
  const scrollToIndex = index => {
    setActiveIndex(index);
  };

  //onScrollNext
  const onScrollNext = () => {
    if (activeIndex === images.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  //renderItem <
  const renderItem = ({item, index}) => {
    return <Item item={item} index={index} />;
  };
  //renderItem />

  //useEffect
  useEffect(() => {
    dispatch(inImagesAction(true));

    return () => {
      dispatch(inImagesAction(false));
    };
  }, [dispatch]);

  const fetchImagesPrivateImages = () => {
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
          dispatch(setImages(images));
        }
        setIsLoading(false);
      });
    return unsubscribe;
  };

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      await fetchImagesPrivateImages();
      setActiveIndex(route?.params?.indexImage);
    };
    loadImages();
    return () => {
      dispatch(setImages([]));
    };
  }, []);

  useEffect(() => {
    let sliderIntervalTIme;
    sliderIntervalTIme = setInterval(onScrollNext, intervalTime);

    return () => {
      clearInterval(sliderIntervalTIme);
    };
  }, [activeIndex]);

  useEffect(() => {
    flatListIndex?.current?.scrollToOffset({
      offset: activeIndex * width,
      animated: true,
    });
  }, [activeIndex]);

  //isLoading
  if (isLoading) {
    return (
      <View style={styles.isLoading}>
        <ActivityIndicator size="large" color="#ffc107" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        width: width,
        height: height,
        margin: 0,
        padding: 0,
      }}>
      <FlatList
        style={{
          flex: 1,
          backgroundColor: '#000',
          width: width,
          height: height,
          margin: 0,
          padding: 0,
        }}
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        initialNumToRender={images.length}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
          scrollToIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
        }}
        ref={flatListIndex}
      />
    </View>
  );
};

export default ImagesPrivateImageSlider;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  footer: {
    color: 'red',
  },
  isLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
