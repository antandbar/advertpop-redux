import { auth, adverts, defaultState } from '../reducers';
import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  ADVERT_DELETED_SUCCESS,
} from '../types';

describe('adverts', () => {
  it('should manage ADVERT_CREATED_SUCCESS action', () => {
    const createdAdvert = 'advert1';
    const action = {
      type: ADVERT_CREATED_SUCCESS,
      payload: createdAdvert,
    };
    const initialState = {
      adverts: {
        loaded: true,
        data: [],
      },
    };

    const result = adverts(initialState.adverts, action);
    expect(result).toEqual({ loaded: true, data: [createdAdvert] });
  });
  it('should manage ADVERT_DELETED_SUCCESS action', () => {
    const deletedAdvertId = 1;
    const action = {
      type: ADVERT_DELETED_SUCCESS,
      payload: deletedAdvertId,
    };
    const initialState = {
      adverts: {
        loaded: true,
        data: [{ id: 1 }, { id: 2 }],
      },
    };

    const result = adverts(initialState.adverts, action);
    expect(result).toEqual({ loaded: true, data: [{ id: 2 }] });
  });
  it('should manage ADVERTS_LOADED_SUCCESS action', () => {
    const loadedAdverts = ['advert1'];
    const action = {
      type: ADVERTS_LOADED_SUCCESS,
      payload: loadedAdverts,
    };
    const result = adverts(defaultState.adverts, action);
    expect(result).toEqual({ loaded: true, data: loadedAdverts });
  });
});

describe('auth', () => {
  it('should manage AUTH_LOGIN_SUCCESS action', () => {
    const action = {
      type: AUTH_LOGIN_SUCCESS,
    };
    const initialState = false;
    const result = auth(initialState, action);
    expect(result).toBe(true);
  });
  it('should manage AUTH_LOGOUT_SUCCESS action', () => {
    const action = {
      type: AUTH_LOGOUT_SUCCESS,
    };
    const initialState = true;
    const result = auth(initialState, action);
    expect(result).toBe(false);
  });
  it('should manage any action', () => {
    const action = {
      type: 'ANY',
    };
    const initialState = true;
    const result = auth(initialState, action);
    expect(result).toBe(initialState);
  });
  it('should manage default state', () => {
    const action = {
      type: 'ANY',
    };
    const initialState = undefined;
    const result = auth(initialState, action);
    expect(result).toBe(defaultState.auth);
  });
});
