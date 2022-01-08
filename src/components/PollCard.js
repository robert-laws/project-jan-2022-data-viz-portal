import { Link } from 'react-router-dom';

export const PollCard = ({ weekNumber, openDate, completed, profilePage }) => {
  const quizOpenDate = new Date(openDate);
  const dateToday = new Date();

  if (profilePage) {
    return (
      <>
        {!completed && dateToday > quizOpenDate && (
          <div className='list-card'>
            <h4>{`Poll for Week # ${weekNumber}`}</h4>
            <div
              style={{ marginTop: '2rem', marginBottom: '2rem' }}
              className={completed ? 'completed' : ''}
            >
              {!completed && dateToday > quizOpenDate && (
                <Link to={`/poll/${weekNumber}`}>Available</Link>
              )}
              {!completed && dateToday <= quizOpenDate && (
                <p className='list-date'>
                  <em>Upcoming on {quizOpenDate.toDateString()}</em>
                </p>
              )}
              {completed && (
                <p className='list-date'>
                  <strong>Completed</strong>
                </p>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className='list-card'>
      <h4>{`Poll for Week # ${weekNumber}`}</h4>
      <div
        style={{ marginTop: '2rem', marginBottom: '2rem' }}
        className={completed ? 'completed' : ''}
      >
        {!completed && dateToday > quizOpenDate && (
          <Link to={`/poll/${weekNumber}`}>Available</Link>
        )}
        {!completed && dateToday <= quizOpenDate && (
          <p className='list-date'>
            <em>Upcoming on {quizOpenDate.toDateString()}</em>
          </p>
        )}
        {completed && (
          <p className='list-date'>
            <strong>Completed</strong>
          </p>
        )}
      </div>
    </div>
  );
};
