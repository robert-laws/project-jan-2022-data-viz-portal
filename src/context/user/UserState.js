import { useReducer, useCallback } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { LOAD_PROFILE, PROFILE_ERROR } from '../types';
import UserContext from './userContext';
import userReducer from './userReducer';

const db = getFirestore();

const UserState = ({ children }) => {
  const initialState = {
    profile: null,
    isProfileLoading: true,
    profileError: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const loadProfile = useCallback(
    async (docId) => {
      const docRef = doc(db, 'users', docId);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          dispatch({ type: LOAD_PROFILE, payload: docSnap.data() });
        } else {
          dispatch({ type: PROFILE_ERROR, payload: 'No document found' });
        }
      } catch (error) {
        dispatch({ type: PROFILE_ERROR, payload: error.message });
      }
    },
    [dispatch]
  );

  return (
    <UserContext.Provider
      value={{
        profile: state.profile,
        isProfileLoading: state.isProfileLoading,
        profileError: state.profileError,
        loadProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
