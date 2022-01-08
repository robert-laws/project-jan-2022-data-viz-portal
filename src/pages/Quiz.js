import { useParams } from 'react-router-dom';
import { useCheckUser } from '../hooks/useCheckUser';
import { QuizCards, QuizQuestionList } from '../components';

export const Quiz = () => {
  const { user, profile, isProfileLoading, profileError } = useCheckUser();

  const { weekNumber } = useParams();

  return (
    <main className='section-app-content'>
      <div className='app-content'>
        <h1>Quizzes</h1>
        {isProfileLoading && !profileError ? (
          <div className='centered'>
            <p>Loading...</p>
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
