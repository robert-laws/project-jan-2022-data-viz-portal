import { useParams } from 'react-router-dom';

export const QuizResults = () => {
  const { weekNumber } = useParams();

  return <div>Quiz Results for Week {weekNumber}</div>;
};
