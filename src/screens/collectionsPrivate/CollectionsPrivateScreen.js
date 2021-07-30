import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
        styles.collections_private_item,
        style,
        {borderColor: isFocus ? '#ffc107' : '#fff'},
      ]}
      onFocus={() => onFocus()}
      onBlur={() => onBlur()}>
      <View>
        <Text
          style={[
            styles.collections_private_title_touchableHighlight,
            {color: isFocus ? '#ffc107' : '#fff'},
          ]}>
          {item.title}
        </Text>
        <Text
          style={[
            styles.collections_private_title_touchableHighlight,
            {color: isFocus ? '#ffc107' : '#fff'},
          ]}>
          {item?.images_length === 1
            ? `Image: ${item.images_length}`
            : `Images: ${item?.images_length}`}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const CollectionsPrivateScreen = () => {
  //state
  const [isLoading, setIsLoading] = useState(false);
  const [collectionsPrivate, setCollectionsPrivate] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  //state redux
  const selectUserIsLogged = state => state.appState.userIsLogged;
  const userIsLogged = useSelector(selectUserIsLogged);

  //actions redux
  const dispatch = useDispatch();

  //navigation
  const navigation = useNavigation();

  //renderItem <
  const renderItem = ({item}) => {
    const borderColor = item.id === selectedId ? '#ffc107' : 'transparent';

    const onPress = item => {
      setSelectedId(item.id);
      navigation.navigate('collectionPrivateImagesScreen', {
        collectionPrivateId: item.id,
        collectionsPrivate: item,
      });
    };

    return (
      <Item item={item} onPress={() => onPress(item)} style={{borderColor}} />
    );
  };
  //renderItem />

  const fetchCollectionsPrivate = () => {
    if (userIsLogged !== null) {
      const unsubscribe = firestore()
        .collection('collections_private')
        .doc(userIsLogged?.user_id)
        .collection('collections_private')
        .onSnapshot((snapshot, error) => {
          if (error) {
            console.log(error);
          } else if (snapshot) {
            let userCollections = snapshot.docs.map(doc => {
              const data = doc.data();
              const id = doc.id;
              return {id, ...data};
            });
            setCollectionsPrivate(userCollections);
            setIsLoading(false);
          }
        });
      return unsubscribe;
    }
  };

  //useEffect
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      // Call any action
      try {
        await dispatch(selectedIdAction('collections private'));
        await setIsLoading(true);
        await fetchCollectionsPrivate();
      } catch (error) {
        console.log(error);
      }
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, userIsLogged]);

  //currentUser === null
  if (userIsLogged === null) {
    return (
      <View style={styles.collections_private_container}>
        <Text style={styles.collections_private_title_pro}>
          User is not logged.
        </Text>
      </View>
    );
  }

  if (userIsLogged?.user_pro === false) {
    return (
      <View style={styles.collections_private_container}>
        <Text style={styles.collections_private_title_pro}>
          Collections Private is a PRO feature.Contact us:
          contact@imagesslider.com
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
    <View style={styles.collections_private_container}>
      <Image
        source={require('../../../img/logoImagesSlider.png')}
        style={styles.imgLogo}
        width={52}
        height={33}
      />
      {(!!collectionsPrivate || !isLoading) && (
        <Text
          style={
            styles.collections_private_title
          }>{`Collections Private: ${collectionsPrivate?.length}`}</Text>
      )}
      <View style={styles.collections_private_flatList}>
        <FlatList
          data={collectionsPrivate}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
          horizontal
          showsHorizontalScrollIndicator={false}
          initialNumToRender={collectionsPrivate.length}
        />
      </View>
    </View>
  );
};

export default CollectionsPrivateScreen;

const styles = StyleSheet.create({
  collections_private_container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },
  collections_private_title: {
    color: '#ffc107',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  collections_private_title_pro: {
    color: '#ffc107',
    fontSize: 20,
  },
  collections_private_flatList: {
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 40,
  },
  collections_private_item: {
    marginHorizontal: 20,
    width: 356,
    height: 200,
    borderWidth: 2,
    backgroundColor: 'transparent',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  collections_private_title_touchableHighlight: {
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
