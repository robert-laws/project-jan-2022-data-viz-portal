import React from 'react';
import ReactDOM from 'react-dom';
import './sass/main.scss';
import './firebase/config';
import App from './App';
import AuthState from './context/auth/AuthState';
import UserState from './context/user/UserState';
import QuestionState from './context/question/QuestionState';

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <UserState>
        <QuestionState>
          <App />
        </QuestionState>
      </UserState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);
