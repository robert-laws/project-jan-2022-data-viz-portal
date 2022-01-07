import { useRef } from 'react';
import { useCheckUser } from '../hooks/useCheckUser';
import { QuizCards, PollCards } from '../components';

// TODO - split up content into tabbed sections
// sections - profile, charts, etc.

export const Profile = () => {
  const quizCardsRef = useRef();
  const pollCardsRef = useRef();

  if (quizCardsRef.current && !quizCardsRef.current.hasChildNodes()) {
    quizCardsRef.current.textContent = 'No quizzes currently available';
  }
  if (pollCardsRef.current && !pollCardsRef.current.hasChildNodes()) {
    pollCardsRef.current.textContent = 'No polls currently available';
  }

  // useCheckUser()
  // 1) queries for profile first time on page *QUERY PROFILE - only 1 record
  // 2) queries user's results on every profile page load - data into results state in QuestionContext *QUERY RESULTS BY USERID - up to 60 records
  const { user, profile, isProfileLoading, profileError } = useCheckUser();

  return (
    <div>
      {isProfileLoading && !profileError ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>
            {profile.firstName} {profile.lastName}
          </p>
          {user && <p>email: {user.email}</p>}
          <p>class: {profile.studentClass}</p>
          <p>class: {profile.studentMajor}</p>
          <p>class: {profile.meetingDay}</p>
        </div>
      )}
      {profileError && <p>{profileError}</p>}
      {profile && !profileError && (
        <div>
          <div ref={quizCardsRef}>
            <QuizCards completed={profile.quiz} profilePage={true} />
          </div>
          <div ref={pollCardsRef}>
            <PollCards completed={profile.poll} profilePage={true} />
          </div>
        </div>
      )}
    </div>
  );
};
