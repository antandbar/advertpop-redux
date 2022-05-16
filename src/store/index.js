import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import * as auth from '../components/auth/service';
import * as adverts from '../components/adverts/service';
import { AUTH_LOGIN_SUCCESS, ADVERT_CREATED_SUCCESS } from './types';

const api = { auth, adverts };

const timestamp = () => next => action => {
  const newAction = {
    ...action,
    meta: {
      ...action.meta,
      timestamp: new Date(),
    },
  };
  return next(newAction);
};

const successRedirections =
  (history, redirections) => _store => next => action => {
    const result = next(action);
    const redirection = redirections[action.type];
    if (redirection) {
      redirection(history, action.payload);
    }

    return result;
  };

const configureStore = (preloadedState, { history }) => {
  const middlewares = [
    thunk.withExtraArgument({ api, history }),
    successRedirections(history, {
      [AUTH_LOGIN_SUCCESS]: history => {
        const from = history.location.state?.from?.pathname || '/';
        history.replace(from);
      },
      [ADVERT_CREATED_SUCCESS]: (history, payload) =>
        history.push(`/adverts/${payload.id}`), 
    }),
    timestamp,
  ];

  const store = createStore(
    combineReducers(reducers),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  return store;
};

export default configureStore;
