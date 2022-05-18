import {
  authLoginRequest,
  authLogin,
  authLogoutSuccess,
  advertCreated,
} from '../actions';
import {
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  ADVERT_CREATED_REQUEST,
  ADVERT_CREATED_SUCCESS,
} from '../types';

describe('authLogoutSuccess', () => {
  test('should return an AUTH_LOGOUT_SUCCESS action', () => {
    const expectedAction = {
      type: AUTH_LOGOUT_SUCCESS,
    };
    const result = authLogoutSuccess();
    expect(result).toEqual(expectedAction);
  });
});

describe('authLoginRequest', () => {
  test('should return an AUTH_LOGIN_REQUEST action', () => {
    const expectedAction = {
      type: AUTH_LOGIN_REQUEST,
    };
    const result = authLoginRequest();
    expect(result).toEqual(expectedAction);
  });
});

describe('authLogin', () => {
  const credentials = 'credentials';
  const action = authLogin(credentials);
  const dispatch = jest.fn();
  const api = {
    auth: {},
  };

  describe('when login api resolves', () => {
    test('should follow the login flow', async () => {
      api.auth.login = jest.fn().mockResolvedValue();
      await action(dispatch, undefined, { api });
      expect(dispatch).toHaveBeenNthCalledWith(1, { type: AUTH_LOGIN_REQUEST });
      expect(api.auth.login).toHaveBeenCalledWith(credentials);
      expect(dispatch).toHaveBeenNthCalledWith(2, { type: AUTH_LOGIN_SUCCESS });
    });
  });
});

describe('advertCreated', () => {
  const advert = { id: 2 };
  const action = advertCreated(advert);
  const dispatch = jest.fn();
  const api = {
    adverts: {},
  };
  describe('advertCreated', () => {
    test('should return an ADVERT_CREATED_SUCCESS action', async () => {
      api.adverts.createAdvert = jest.fn().mockResolvedValue();
      await action(dispatch, undefined, { api });
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ADVERT_CREATED_REQUEST,
      });
      expect(api.adverts.createAdvert).toHaveBeenCalledWith(advert);
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ADVERT_CREATED_SUCCESS,
      });
    });
  });
});
