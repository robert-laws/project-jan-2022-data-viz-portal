import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useUserContext } from '../hooks/useUserContext';
import { useQuestionContext } from './useQuestionContext';

export const useCheckUser = () => {
  const { user } = useAuthContext();
  const {
    profile,
    isProfileLoading,
    profileError,
    loadProfile,
    clearProfile,
    resetUpdateProfile,
  } = useUserContext();
  const {
    results,
    loadResults,
    clearQuestions,
    clearResults,
    resetIsSaving,
    clearPollsResults,
  } = useQuestionContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user && !profile) {
      loadProfile(user.uid);
    } else if (!user) {
      clearProfile();
      clearQuestions();
      clearResults();
      clearPollsResults();
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
    clearPollsResults,
  ]);

  useEffect(() => {
    resetUpdateProfile();
    resetIsSaving();
  }, [resetUpdateProfile, resetIsSaving]);

  // useEffect(() => {
  //   if (user && !results) {
  //     loadResults(user.uid);
  //     console.log('load results....');
  //   }
  // }, [user, results, loadResults]);

  return { user, profile, isProfileLoading, profileError };
};
