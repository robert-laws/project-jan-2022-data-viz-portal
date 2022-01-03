import React from 'react';
import ReactDOM from 'react-dom';
import './sass/main.scss';
import './firebase/config';
import App from './App';
import AuthState from './context/auth/AuthState';

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <App />
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);
