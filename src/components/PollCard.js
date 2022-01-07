import { Link } from 'react-router-dom';

export const PollCard = ({ weekNumber, openDate, completed, profilePage }) => {
  const quizOpenDate = new Date(openDate);
  const dateToday = new Date();

  if (profilePage) {
    return (
      <>
        {!completed && dateToday > quizOpenDate && (
          <div className='poll-card'>
            <h4>{`Poll for Week # ${weekNumber}`}</h4>
            <div className={completed ? 'completed' : ''}>
              {!completed && dateToday > quizOpenDate && (
                <Link to={`/poll/${weekNumber}`}>Available</Link>
              )}
              {!completed && dateToday <= quizOpenDate && 'Upcoming'}
              {completed && 'Completed'}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className='poll-card'>
      <h4>{`Poll for Week # ${weekNumber}`}</h4>
      <div className={completed ? 'completed' : ''}>
        {!completed && dateToday > quizOpenDate && (
          <Link to={`/poll/${weekNumber}`}>Available</Link>
        )}
        {!completed && dateToday <= quizOpenDate && 'Upcoming'}
        {completed && 'Completed'}
      </div>
    </div>
  );
};
