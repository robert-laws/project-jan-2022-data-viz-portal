import { useContext } from 'react';
import UserContext from '../context/user/userContext';

export const useUserContext = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('useUserContext must be used within an UserProvider');
  }

  return userContext;
};
