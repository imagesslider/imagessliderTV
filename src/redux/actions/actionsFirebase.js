import {
  setAlbums,
  setAlbum,
  setImages,
  setVideos,
  setVideo,
} from '../actions/actionsApp';

//fetch and set Firebase albums
export const setAlbumsFirebaseAction = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://images-b71e6-default-rtdb.firebaseio.com/albums.json`,
      );
      const data = await response.json();

      dispatch(
        setAlbums(
          Object.keys(data).map(key => ({...data[key], id: key})) || [],
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };
};

//fetch and set Firebase album
export const setAlbumFirebaseAction = albumId => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://images-b71e6-default-rtdb.firebaseio.com/albums/${albumId}/images.json`,
      );
      const data = await response.json();

      dispatch(
        setAlbum(Object.keys(data).map(key => ({...data[key], id: key})) || []),
      );
    } catch (error) {
      console.log(error);
    }
  };
};

//fetch and set Firebase images
export const setImagesFirebaseAction = albumId => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://images-b71e6-default-rtdb.firebaseio.com/albums/${albumId}/images.json`,
      );
      const data = await response.json();

      dispatch(
        setImages(
          Object.keys(data).map(key => ({...data[key], id: key})) || [],
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };
};

//fetch and set Firebase videos
export const setVideosFirebaseAction = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://images-b71e6-default-rtdb.firebaseio.com/videos.json`,
      );
      const data = await response.json();

      dispatch(
        setVideos(
          Object.keys(data).map(key => ({...data[key], id: key})) || [],
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };
};

//fetch and set Firebase video
export const setVideoFirebaseAction = videoId => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://images-b71e6-default-rtdb.firebaseio.com/videos/${videoId}/images.json`,
      );
      const data = await response.json();

      dispatch(
        setVideo(Object.keys(data).map(key => ({...data[key], id: key})) || []),
      );
    } catch (error) {
      console.log(error);
    }
  };
};
