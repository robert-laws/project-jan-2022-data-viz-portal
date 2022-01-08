import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCheckUser } from '../hooks/useCheckUser';
import { QuizCards, PollCards } from '../components';

// TODO - split up content into tabbed sections
// sections - profile, charts, etc.

export const Profile = () => {
  const quizCardsRef = useRef();
  const pollCardsRef = useRef();

  if (quizCardsRef.current && !quizCardsRef.current.hasChildNodes()) {
    quizCardsRef.current.innerHTML = '<p>No quizzes currently available</p>';
  }
  if (pollCardsRef.current && !pollCardsRef.current.hasChildNodes()) {
    pollCardsRef.current.innerHTML = '<p>No polls currently available</p>';
  }

  // useCheckUser()
  // 1) queries for profile first time on page *QUERY PROFILE - only 1 record
  // 2) queries user's results on every profile page load - data into results state in QuestionContext *QUERY RESULTS BY USERID - up to 60 records
  const { user, profile, isProfileLoading, profileError } = useCheckUser();

  return (
    <main className='section-app-content'>
      <div className='app-content'>
        {isProfileLoading && !profileError ? (
          <div className='centered'>
            <p>Loading...</p>
          </div>
        ) : (
          <div className='profile-details'>
            <h2>Your Profile</h2>
            <p>
              <strong>
                {profile.firstName} {profile.lastName}
              </strong>
            </p>
            {user && (
              <p className='profile-item'>
                <strong>email</strong>: {user.email}
              </p>
            )}
            <p className='profile-item'>
              <strong>class</strong>: {profile.studentClass}
            </p>
            <p className='profile-item'>
              <strong>major</strong>: {profile.studentMajor.toUpperCase()}
            </p>
            <p className='profile-item'>
              <strong>meeting day</strong>: {profile.meetingDay}
            </p>
          </div>
        )}
        {profileError && <p>{profileError}</p>}
        {profile && !profileError && (
          <div className='profile-tasks'>
            <h4>Your Available Quizzes</h4>
            <Link to='/quiz'>View Your Quiz Results and Schedule</Link>
            <div className='list top-list' ref={quizCardsRef}>
              <QuizCards completed={profile.quiz} profilePage={true} />
            </div>
            <h4>Your Available Polls</h4>
            <Link to='/poll'>View Polls Schedule</Link>
            <div className='list bottom-list' ref={pollCardsRef}>
              <PollCards completed={profile.poll} profilePage={true} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
