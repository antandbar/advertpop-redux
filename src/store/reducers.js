import {
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT_SUCCESS,
    ADVERTS_LOADED_REQUEST,
    ADVERTS_LOADED_SUCCESS,
    ADVERTS_LOADED_FAILURE,
    UI_RESET_ERROR,
    ADVERT_LOADED_SUCCESS,
    ADVERT_LOADED_REQUEST,
    ADVERT_LOADED_FAILURE,
    ADVERT_CREATED_REQUEST,
    ADVERT_CREATED_SUCCESS,
    ADVERT_CREATED_FAILURE,
  } from './types';
  
  export const defaultState = {
    auth: false,
    adverts: {
      loaded: false,
      data: [],
    },
    ui: {
      isLoading: false,
      error: null,
    },
  };
  
  export const auth = (state = defaultState.auth, action) => {
    switch (action.type) {
      case AUTH_LOGIN_SUCCESS:
        return true;
      case AUTH_LOGOUT_SUCCESS:
        return false;
      default:
        return state;
    }
  };
  
  export const adverts = (state = defaultState.adverts, action) => {
    switch (action.type) {
      case ADVERTS_LOADED_SUCCESS:
        return { loaded: true, data: action.payload };
      case ADVERT_LOADED_SUCCESS:
        return { ...state, data: [...state.data, action.payload] };
      default:
        return state;
    }
  };
  
  export const ui = (state = defaultState.ui, action) => {
    switch (action.type) {
      case AUTH_LOGIN_REQUEST:
      case ADVERTS_LOADED_REQUEST:
      case ADVERT_LOADED_REQUEST:
      case ADVERT_CREATED_REQUEST:
        return { ...state, isLoading: true, error: null };
      case AUTH_LOGIN_SUCCESS:
      case ADVERTS_LOADED_SUCCESS:
      case ADVERT_LOADED_SUCCESS:
      case ADVERT_CREATED_SUCCESS:
        return { ...state, isLoading: false };
      case AUTH_LOGIN_FAILURE:
      case ADVERTS_LOADED_FAILURE:
      case ADVERT_LOADED_FAILURE:
      case ADVERT_CREATED_FAILURE:
        return { ...state, isLoading: false, error: action.payload };
      case UI_RESET_ERROR:
        return { ...state, error: null };
      default:
        return state;
    }
  };