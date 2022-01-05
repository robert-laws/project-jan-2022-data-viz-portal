import { useEffect, useState } from 'react';
import { useCheckUser } from '../hooks/useCheckUser';
import { useQuestionContext } from '../hooks/useQuestionContext';

export const Profile = () => {
  const [resultsList, setResultsList] = useState([]);
  const { user, profile, isProfileLoading, profileError } = useCheckUser();
  const { results, loadResults, isResultsLoading, resultsError } =
    useQuestionContext();

  useEffect(() => {
    if (user) {
      loadResults(user.uid);
    }
  }, [user, loadResults]);

  useEffect(() => {
    if (results) {
      const userResults = results.filter(
        (result) => result.userId === user.uid
      );
      setResultsList(userResults);
    }
  }, [results, user]);

  return (
    <div>
      {isProfileLoading && !profileError ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>
            {profile.firstName} {profile.lastName}
          </p>
          <p>
            {isResultsLoading && !resultsError ? (
              <span>Loading...</span>
            ) : (
              <span>Number of Results: {resultsList.length}</span>
            )}
          </p>
        </div>
      )}
      {profileError && <p>{profileError}</p>}
    </div>
  );
};
