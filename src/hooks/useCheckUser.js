import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useUserContext } from '../hooks/useUserContext';

export const useCheckUser = () => {
  const { user } = useAuthContext();
  const { profile, isProfileLoading, profileError, loadProfile, clearProfile } =
    useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user && !profile) {
      loadProfile(user.uid);
    } else if (!user) {
      clearProfile();
      navigate('/');
    }
  }, [user, profile, loadProfile, clearProfile, navigate]);

  return { user, profile, isProfileLoading, profileError };
};
