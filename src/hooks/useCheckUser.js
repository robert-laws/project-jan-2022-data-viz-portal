import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useUserContext } from '../hooks/useUserContext';
import { useQuestionContext } from './useQuestionContext';

export const useCheckUser = () => {
  const { user } = useAuthContext();
  const { profile, isProfileLoading, profileError, loadProfile, clearProfile } =
    useUserContext();
  const { results, loadResults, clearQuestions, clearResults } =
    useQuestionContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user && !profile) {
      loadProfile(user.uid);
    } else if (!user) {
      clearProfile();
      clearQuestions();
      clearResults();
      navigate('/');
    }
  }, [
    user,
    profile,
    loadProfile,
    clearProfile,
    navigate,
    clearQuestions,
    clearResults,
  ]);

  useEffect(() => {
    if (user && !results) {
      loadResults(user.uid);
    }
  }, [user, results, loadResults]);

  return { user, profile, isProfileLoading, profileError };
};
