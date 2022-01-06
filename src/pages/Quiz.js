import { useParams } from 'react-router-dom';
import { useCheckUser } from '../hooks/useCheckUser';
import { QuizCards, QuizQuestionList } from '../components';

export const Quiz = () => {
  const { user, profile, isProfileLoading, profileError } = useCheckUser();

  const { weekNumber } = useParams();

  return (
    <div>
      <h1>Quizzes</h1>
      {isProfileLoading && !profileError ? (
        <p>Loading...</p>
      ) : weekNumber && user ? (
        <QuizQuestionList
          weekNumber={weekNumber}
          userId={user.uid}
          profile={profile}
        />
      ) : (
        <QuizCards completed={profile.quiz} />
      )}
      {profileError && <p>{profileError}</p>}
    </div>
  );
};
