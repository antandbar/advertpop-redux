import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
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

const history = createBrowserHistory();
const store = configureStore({ auth: !!accessToken }, { history });


ReactDOM.render(
  <React.StrictMode>
    <Root store={store} history={history}>
      <App/>
    </Root>
  </React.StrictMode>,
  document.getElementById('root'),
);
