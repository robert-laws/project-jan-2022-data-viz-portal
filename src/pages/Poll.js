import { useParams } from 'react-router-dom';
import { useCheckUser } from '../hooks/useCheckUser';
import { PollCards, PollQuestionList } from '../components';

export const Poll = () => {
  const { user, profile, isProfileLoading, profileError } = useCheckUser();

  const { weekNumber } = useParams();

  return (
    <div>
      <h1>Polls</h1>
      {isProfileLoading && !profileError ? (
        <p>Loading...</p>
      ) : weekNumber && user ? (
        <PollQuestionList
          weekNumber={weekNumber}
          userId={user.uid}
          profile={profile}
        />
      ) : (
        <PollCards completed={profile.poll} />
      )}
      {profileError && <p>{profileError}</p>}
    </div>
  );
};
