import { useReducer, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UPDATE_AUTH } from '../types';
import AuthContext from './authContext';
import authReducer from './authReducer';

const auth = getAuth();

const AuthState = ({ children }) => {
  const initialState = {
    user: null,
    authIsReady: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({
        type: UPDATE_AUTH,
        payload: user,
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        authIsReady: state.authIsReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
