import { Link } from 'react-router-dom';

export const QuizCard = ({ weekNumber, topic, openDate, completed }) => {
  const quizOpenDate = new Date(openDate);
  const dateToday = new Date();

  return (
    <div className='quiz-card'>
      <h4>{`Week # ${weekNumber}`}</h4>
      <p>{topic}</p>
      <div className={completed ? 'completed' : ''}>
        {!completed && dateToday > quizOpenDate && (
          <Link to={`/quiz/${weekNumber}`}>Available</Link>
        )}
        {!completed && dateToday <= quizOpenDate && 'Upcoming'}
        {completed && (
          <Link className='link-button' to={`/quiz/results/${weekNumber}`}>
            {completed && 'View Results'}
          </Link>
        )}
      </div>
    </div>
  );
};
