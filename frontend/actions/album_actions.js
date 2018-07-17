import * as AlbumsApiUtil from '../util/album_api_util';
export const RECEIVE_ALBUMS = "RECEIVE_ALBUMS";
export const RECEIVE_ALBUM = "RECEIVE_ALBUM";

export const fetchAlbum = (id) => {
  return AlbumsApiUtil.fetchAlbum(id)
  .then(album => dispatch(receiveAlbum(album)), errors => dispatch(receiveErrors(errors)));
};

export const fetchUserAlbums = (userId) => {
  return AlbumsApiUtil.fetchUserAlbums(userId)
  .then(albums => dispatch(receiveAlbums(albums)), errors => dispatch(receiveErrors(errors)));
};

export const createAlbum = (payload) => {
  return AlbumsApiUtil.createAlbum(payload)
  .then(album => dispatch(receiveAlbum(album)), errors => dispatch(receiveErrors(errors)));
};


export const receiveAlbum = (album) => {
  return ({
    type: RECEIVE_ALBUM,
    album
  });
};

export const receiveAlbums = (albums) => {
  return ({
    type: RECEIVE_ALBUMS,
    albums
  });
};
