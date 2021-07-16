import {
  SET_ALBUMS,
  SET_ALBUM,
  SET_IMAGES,
  SET_VIDEOS,
  SET_VIDEO,
  IN_IMAGES,
  SELECTED_ID,
  SET_IS_FOCUSED_MENU,
} from '../actions/actionsApp';

const initalStore = {
  albums: [],
  album: [],
  images: [],
  videos: [],
  video: [],
  inImages: false,
  selectedId: null,
  isFocusedMenu: false,
};

export const reducerApp = (state = initalStore, action) => {
  switch (action.type) {
    // //actions app
    case SET_ALBUMS:
      return {
        ...state,
        albums: [...action.albums],
      };
    case SET_ALBUM:
      return {
        ...state,
        album: [...action.album],
      };
    case SET_IMAGES:
      return {
        ...state,
        images: [...action.images],
      };
    case IN_IMAGES:
      return {
        ...state,
        inImages: action.inImages,
      };
    case SET_VIDEOS:
      return {
        ...state,
        videos: [...action.videos],
      };
    case SET_VIDEO:
      return {
        ...state,
        video: [...action.video],
      };
    case SELECTED_ID:
      return {
        ...state,
        selectedId: action.selectedId,
      };
    case SET_IS_FOCUSED_MENU:
      return {
        ...state,
        isFocusedMenu: action.isFocusedMenu,
      };
    default:
      return state;
  }
};
