import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import {navigate} from '../navigation/Navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectedIdAction,
  setIsFocusedMenuAction,
} from '../redux/actions/actionsApp';

const DATA = [
  {
    id: 'albums',
    title: 'albums',
    iconName: 'albums-outline',
  },
  {
    id: 'images private',
    title: 'images private',
    iconName: 'images-sharp',
  },
  {
    id: 'collections private',
    title: 'collections private',
    iconName: 'albums-sharp',
  },
  {
    id: 'settings',
    title: 'settings',
    iconName: 'settings-sharp',
  },
  {
    id: 'signin',
    title: 'sign in',
    iconName: 'log-in-sharp',
  },
];

const DATA_LOGIN = [
  {
    id: 'albums',
    title: 'albums',
    iconName: 'albums-outline',
  },
  {
    id: 'images private',
    title: 'images private',
    iconName: 'images-sharp',
  },
  {
    id: 'collections private',
    title: 'collections private',
    iconName: 'albums-sharp',
  },
  {
    id: 'settings',
    title: 'settings',
    iconName: 'settings-sharp',
  },
  {
    id: 'user profile',
    title: 'user profile',
    iconName: 'person-circle-outline',
  },
];

const Item = ({item, onPress}) => {
  const [isFocus, setIsFocused] = useState(null);

  //state redux
  const selectSelectedId = state => state.appState.selectedId;
  const selectedId = useSelector(selectSelectedId);
  const selectIsFocusedMenu = state => state.appState.isFocusedMenu;
  const isFocusedMenu = useSelector(selectIsFocusedMenu);

  //actions redux
  const dispatch = useDispatch();

  const onFocus = () => {
    setIsFocused(true);
    dispatch(setIsFocusedMenuAction(true));
  };

  const onBlur = () => {
    setIsFocused(false);
    dispatch(setIsFocusedMenuAction(true));
  };

  return (
    <TouchableHighlight
      onPress={onPress}
      style={[
        styles.item,
        {
          backgroundColor: isFocus ? '#ffc107' : 'transparent',
        },
      ]}
      onFocus={() => onFocus()}
      onBlur={() => onBlur()}>
      <Text
        style={[
          styles.title,
          {
            color: isFocus
              ? '#000'
              : '#fff' && selectedId === item.id
              ? '#ffc107'
              : '#fff',
          },
        ]}>
        <Ionicons
          name={item.iconName}
          size={20}
          color={
            isFocus
              ? '#000'
              : '#fff' && selectedId === item.id
              ? '#ffc107'
              : '#fff'
          }
        />{' '}
        {isFocusedMenu && `${item.title}`}
      </Text>
    </TouchableHighlight>
  );
};

const MenuNavigation = () => {
  //state redux
  const selectSelectedId = state => state.appState.selectedId;
  const selectedId = useSelector(selectSelectedId);
  const selectIsFocusedMenu = state => state.appState.isFocusedMenu;
  const isFocusedMenu = useSelector(selectIsFocusedMenu);
  const selectUserIsLogged = state => state.appState.userIsLogged;
  const userIsLogged = useSelector(selectUserIsLogged);

  //actions redux
  const dispatch = useDispatch();

  //renderItem
  const renderItem = ({item}) => {
    //onPress
    const onPress = item => {
      dispatch(selectedIdAction(item.id));
      navigate(item.title);
    };

    return <Item item={item} onPress={() => onPress(item)} />;
  };

  //useEffect
  useEffect(() => {
    dispatch(selectedIdAction(selectedId));
  }, [selectedId]);

  return (
    <View
      style={[
        styles.menu,
        {
          width: isFocusedMenu ? '12%' : '5%',
        },
      ]}>
      <View>
        <FlatList
          data={userIsLogged !== null ? DATA_LOGIN : DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
    </View>
  );
};

export default MenuNavigation;

const styles = StyleSheet.create({
  menu: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRightColor: '#ffc107',
    borderEndWidth: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 1,
  },
  title: {
    textTransform: 'capitalize',
    padding: 10,
    fontWeight: '800',
    fontSize: 18,
  },
});
