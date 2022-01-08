import { Link } from 'react-router-dom';

export const QuizCard = ({
  weekNumber,
  topic,
  openDate,
  completed,
  profilePage,
}) => {
  const quizOpenDate = new Date(openDate);
  const dateToday = new Date();

  if (profilePage) {
    return (
      <>
        {!completed && dateToday > quizOpenDate && (
          <div className='list-card'>
            <h4>{`Week # ${weekNumber}`}</h4>
            <p className='list-topic'>{topic}</p>
            <div className={completed ? 'completed' : ''}>
              {!completed && dateToday > quizOpenDate && (
                <Link className='invert' to={`/quiz/${weekNumber}`}>
                  Available
                </Link>
              )}
              {!completed && dateToday <= quizOpenDate && (
                <p>
                  <em>Upcoming on {quizOpenDate.toDateString()}</em>
                </p>
              )}
              {completed && (
                <Link
                  className='link-button'
                  to={`/quiz/results/${weekNumber}`}
                >
                  {completed && 'View Results'}
                </Link>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className='list-card'>
      <h4>{`Week # ${weekNumber}`}</h4>
      <p className='list-topic'>{topic}</p>
      <div className={completed ? 'completed' : ''}>
        {!completed && dateToday > quizOpenDate && (
          <Link className='invert' to={`/quiz/${weekNumber}`}>
            Available
          </Link>
        )}
        {!completed && dateToday <= quizOpenDate && (
          <p>
            <em>Upcoming on {quizOpenDate.toDateString()}</em>
          </p>
        )}
        {completed && (
          <Link className='link-button' to={`/quiz/results/${weekNumber}`}>
            {completed && 'View Results'}
          </Link>
        )}
      </div>
    </div>
  );
};
