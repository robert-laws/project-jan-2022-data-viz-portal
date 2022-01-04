import { useReducer, useCallback } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  LOAD_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
} from '../types';
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

  const updateUserCompletedList = useCallback(
    async (category, userId, completedList) => {
      const userRef = doc(db, 'users', userId);
      const data = { [category]: completedList };

      try {
        await updateDoc(userRef, data);

        dispatch({
          type: UPDATE_PROFILE,
          payload: data,
        });
      } catch (error) {
        dispatch({ type: PROFILE_ERROR, payload: error.message });
      }
    },
    [dispatch]
  );

  const clearProfile = () => {
    dispatch({ type: CLEAR_PROFILE });
  };

  return (
    <UserContext.Provider
      value={{
        profile: state.profile,
        isProfileLoading: state.isProfileLoading,
        profileError: state.profileError,
        loadProfile,
        clearProfile,
        updateUserCompletedList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
