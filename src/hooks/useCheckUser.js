import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useUserContext } from '../hooks/useUserContext';

export const useCheckUser = () => {
  const { user } = useAuthContext();
  const { profile, isProfileLoading, profileError, loadProfile } =
    useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user && !profile) {
      loadProfile(user.uid);
    } else if (!user) {
      navigate('/');
    }
  }, [user, profile, loadProfile, navigate]);

  return { user, profile, isProfileLoading, profileError };
};
