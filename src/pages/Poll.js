import { useParams } from 'react-router-dom';
import { useCheckUser } from '../hooks/useCheckUser';
import { PollCards, PollQuestionList } from '../components';

export const Poll = () => {
  const { user, profile, isProfileLoading, profileError } = useCheckUser();

  const { weekNumber } = useParams();

  return (
    <div className='app-content'>
      <h1>Polls</h1>
      {isProfileLoading && !profileError ? (
        <div className='centered'>
          <p>Loading...</p>
        </div>
      ) : weekNumber && user ? (
        <PollQuestionList
          weekNumber={weekNumber}
          userId={user.uid}
          profile={profile}
        />
      ) : (
        <div className='list'>
          <PollCards completed={profile.poll} />
        </div>
      )}
      {profileError && <p>{profileError}</p>}
    </div>
  );
};
