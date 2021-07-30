//set albums
export const SET_ALBUMS = 'SET_ALBUMS';
export const setAlbums = albums => {
  return {
    type: SET_ALBUMS,
    albums: albums,
  };
};

//setAlbum
export const SET_ALBUM = 'SET_ALBUM';
export const setAlbum = album => {
  return {
    type: SET_ALBUM,
    album: album,
  };
};

//setImages
export const SET_IMAGES = 'SET_IMAGES';
export const setImages = images => {
  return {
    type: SET_IMAGES,
    images: images,
  };
};

//setVideos
export const SET_VIDEOS = 'SET_VIDEOS';
export const setVideos = videos => {
  return {
    type: SET_VIDEOS,
    videos: videos,
  };
};

//setVideo
export const SET_VIDEO = 'SET_VIDEO';
export const setVideo = video => {
  return {
    type: SET_VIDEO,
    video: video,
  };
};

//inImagesAction
export const IN_IMAGES = 'IN_IMAGES';
export const inImagesAction = inImages => ({
  type: IN_IMAGES,
  inImages: inImages,
});

//selectedId
export const SELECTED_ID = 'SELECTED_ID';
export const selectedIdAction = selectedId => ({
  type: SELECTED_ID,
  selectedId: selectedId,
});

//set isFocused Menu
export const SET_IS_FOCUSED_MENU = 'SET_IS_FOCUSED_MENU';
export const setIsFocusedMenuAction = isFocusedMenu => ({
  type: SET_IS_FOCUSED_MENU,
  isFocusedMenu: isFocusedMenu,
});

export const USER_IS_LOGGED_TRUE = 'USER_IS_LOGGED_TRUE';
export const setUserIsLoggedTrueAction = userIsLoggedTrue => ({
  type: USER_IS_LOGGED_TRUE,
  userIsLoggedTrue: userIsLoggedTrue,
});

export const SET_USER_IS_LOGGED = 'SET_USER_IS_LOGGED';
export const setUserIsLoggedAction = userIsLogged => ({
  type: SET_USER_IS_LOGGED,
  userIsLogged: userIsLogged,
});

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUserAction = currentUser => ({
  type: SET_CURRENT_USER,
  currentUser: currentUser,
});
