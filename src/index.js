import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';
import configureStore from './store';
import Root from './components/Root';

// Se recuerpa el token
const accessToken = storage.get('auth');
// Se setea el token a cabecera axios
setAuthorizationHeader(accessToken);

const store = configureStore({ auth: !!accessToken });


ReactDOM.render(
  <React.StrictMode>
    <Root store={store}>
      <App isInitiallyLogged={!!accessToken} />
    </Root>
  </React.StrictMode>,
  document.getElementById('root'),
);
