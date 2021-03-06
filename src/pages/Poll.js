import { useParams } from 'react-router-dom';
import { useCheckUser } from '../hooks/useCheckUser';
import { PollCards, PollQuestionList, Spinner } from '../components';

export const Poll = () => {
  const { user, profile, isProfileLoading, profileError } = useCheckUser();

  const { weekNumber } = useParams();

  return (
    <main id='main-content' className='section-app-content'>
      <div className='app-content'>
        <h2>Polls</h2>
        {isProfileLoading && !profileError ? (
          <div className='centered'>
            <Spinner />
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
    </main>
  );
};
