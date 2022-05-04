import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';
import { BrowserRouter as Router } from 'react-router-dom';

// Se recuerpa el token
const accessToken = storage.get('auth');
// Se setea el token a cabecera axios
setAuthorizationHeader(accessToken);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App isInitiallyLogged={!!accessToken} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
