import { getAreAdvertsLoaded, getAdvert } from './selectors';
import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  ADVERTS_LOADED_FAILURE,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  ADVERT_LOADED_SUCCESS,
  UI_RESET_ERROR,
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
      const adverts = await api.adverts.getLatestAdverts();
      dispatch(advertsLoadedSuccess(adverts));
    } catch (error) {
      dispatch(advertsLoadedFailure(error));
      throw error;
    }
  };
};

export const advertLoadedSuccess = advert => ({
  type: ADVERT_LOADED_SUCCESS,
  payload: advert,
});

export const advertLoaded = advertId => {
  return async function (dispatch, getState, { api }) {
    const advertLoaded = getAdvert(advertId)(getState());
    if (advertLoaded) return;
     // dispatch(tweetLoadedRequest());
    try {
      const advert = await api.adverts.getAdvert(advertId);
      dispatch(advertLoadedSuccess(advert));
    } catch (error) {
      // dispatch(tweetLoadedFailure(error));
      throw error;
    }
  };
};

export const advertCreatedSuccess = () => ({
  type: ADVERT_CREATED_SUCCESS,
});

export const advertCreated = advert => {
  return async function (dispatch, getState, { api }) {
    // dispatch(tweetCreatedRequest());
    try {
      const createdAdvert = await api.adverts.createAdvert(advert);
      console.log(createdAdvert);
      dispatch(advertCreatedSuccess());
      return createdAdvert;
    } catch (error) {
      // dispatch(tweetCreatedFailure(error));
      throw error;
    }
  };
};

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});