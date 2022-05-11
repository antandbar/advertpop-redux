import { getAreAdvertsLoaded, getAdvert, getAreTagsLoaded } from './selectors';
import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  ADVERTS_LOADED_FAILURE,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  ADVERT_CREATED_FAILURE,
  ADVERT_CREATED_REQUEST,
  ADVERT_LOADED_SUCCESS,
  ADVERT_LOADED_FAILURE,
  ADVERT_LOADED_REQUEST,
  UI_RESET_ERROR,
  TAGS_LOADED_FAILURE,
  TAGS_LOADED_REQUEST,
  TAGS_LOADED_SUCCESS,
  ADVERT_DELETED_SUCCESS,
  ADVERT_DELETED_FAILURE,
  ADVERT_DELETED_REQUEST
} from './types';

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginSuccess = () => ({
  type: AUTH_LOGIN_SUCCESS,
});

export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
  error: true,
});

export const authLogin = credentials => {
  return async function (dispatch, _getState, { api }) {
    dispatch(authLoginRequest());
    try {
      await api.auth.login(credentials);
      dispatch(authLoginSuccess());
    } catch (error) {
      dispatch(authLoginFailure(error));
      throw error;
    }
  };
};

export const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT_SUCCESS,
});

export const authLogout = () => {
  return function (dispatch, _getState, { api }) {
    return api.auth.logout().then(() => {
      dispatch(authLogoutSuccess());
    });
  };
};

export const advertsLoadedRequest = () => ({
  type: ADVERTS_LOADED_REQUEST,
});

export const advertsLoadedSuccess = adverts => ({
  type: ADVERTS_LOADED_SUCCESS,
  payload: adverts,
});

export const advertsLoadedFailure = error => ({
  type: ADVERTS_LOADED_FAILURE,
  payload: error,
  error: true,
});

export const advertsLoaded = () => {
  return async function (dispatch, getState, { api }) {
    const advertsLoaded = getAreAdvertsLoaded(getState());
    if (advertsLoaded) return;

    dispatch(advertsLoadedRequest());
    try {
      const adverts = await api.adverts.getAdverts();
      dispatch(advertsLoadedSuccess(adverts));
    } catch (error) {
      dispatch(advertsLoadedFailure(error));
      throw error;
    }
  };
};

export const tagsLoadedRequest = () => ({
  type: TAGS_LOADED_REQUEST,
});

export const tagsLoadedSuccess = adverts => ({
  type: TAGS_LOADED_SUCCESS,
  payload: adverts,
});

export const tagsLoadedFailure = error => ({
  type: TAGS_LOADED_FAILURE,
  payload: error,
  error: true,
});

export const tagsLoaded = () => {
  return async function (dispatch, getState, { api }) {
    const tagsLoaded = getAreTagsLoaded(getState());
    if (tagsLoaded) return;

    dispatch(tagsLoadedRequest());
    try {
      const tags = await api.adverts.getTags();
      dispatch(tagsLoadedSuccess(tags));
    } catch (error) {
      dispatch(tagsLoadedFailure(error));
      throw error;
    }
  };
};

export const advertLoadedRequest = () => ({
  type: ADVERT_LOADED_REQUEST,
});

export const advertLoadedSuccess = advert => ({
  type: ADVERT_LOADED_SUCCESS,
  payload: advert,
});

export const advertLoadedFailure = error => ({
  type: ADVERT_LOADED_FAILURE,
  payload: error,
  error: true,
});

export const advertLoaded = (advertId,navigate) => {
  return async function (dispatch, getState, { api }) {
    const advertLoaded = getAdvert(advertId)(getState());
    if (advertLoaded) return;
    dispatch(advertLoadedRequest());
    try {
      const advert = await api.adverts.getAdvert(advertId);
      dispatch(advertLoadedSuccess(advert));
    } catch (error) {
      dispatch(advertLoadedFailure(error));
      navigate('/404');
    }
  };
};

export const advertCreatedRequest = () => ({
  type: ADVERT_CREATED_REQUEST,
});

export const advertCreatedSuccess = (advert) => ({
  type: ADVERT_CREATED_SUCCESS,
  payload: advert
});

export const advertCreatedFailure = error => ({
  type: ADVERT_CREATED_FAILURE,
  payload: error,
  error: true,
});

export const advertCreated = (advert,navigate) => {
  return async function (dispatch, getState, { api }) {
    dispatch(advertCreatedRequest());
    try {
      const createdAdvert = await api.adverts.createAdvert(advert);
      dispatch(advertCreatedSuccess(createdAdvert));
      navigate(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      dispatch(advertCreatedFailure(error));
      throw error;
    }
  };
};

export const advertDeletedRequest = () => ({
  type: ADVERT_DELETED_REQUEST,
});

export const advertDeletedSuccess = advertId => ({
  type: ADVERT_DELETED_SUCCESS,
  payload: advertId,
});

export const advertDeletedFailure = error => ({
  type: ADVERT_DELETED_FAILURE,
  payload: error,
  error: true,
});

export const advertDeleted = (advertId,navigate) => {
  return async function (dispatch, getState, { api }) {
    dispatch(advertDeletedRequest());
    try {
      await api.adverts.deleteAdvert(advertId);
      dispatch(advertDeletedSuccess(advertId));
      navigate('/adverts');
    } catch (error) {
      dispatch(advertDeletedFailure(error));
      throw error;
    }
  };
};

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
