import { useParams } from 'react-router-dom';
import { useCheckUser } from '../hooks/useCheckUser';
import { QuizCards, QuizQuestionList, Spinner } from '../components';

export const Quiz = () => {
  const { user, profile, isProfileLoading, profileError } = useCheckUser();

  const { weekNumber } = useParams();

  return (
    <main id='main-content' className='section-app-content'>
      <div className='app-content'>
        <h2>Quizzes</h2>
        {isProfileLoading && !profileError ? (
          <div className='centered'>
            <Spinner />
          </div>
        ) : weekNumber && user ? (
          <QuizQuestionList
            weekNumber={weekNumber}
            userId={user.uid}
            profile={profile}
          />
        ) : (
          <div className='list'>
            <QuizCards completed={profile.quiz} />
          </div>
        )}
        {profileError && <p>{profileError}</p>}
      </div>
    </main>
  );
};
