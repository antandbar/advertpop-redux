import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

import * as auth from '../components/auth/service';
import * as adverts from '../components/adverts/service';

const api = { auth, adverts };

function logger(store) {
  return function (next) {
    return function (action) {
      console.log('before action', action, store.getState());
      const result = next(action);
      console.log('after action', action, store.getState());
      return result;
    };
  };
}

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


const configureStore = preloadedState => {
  const middlewares = [thunk.withExtraArgument({ api })/*, logger*/, timestamp];

  const store = createStore(
    combineReducers(reducers),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  return store;
};

export default configureStore;