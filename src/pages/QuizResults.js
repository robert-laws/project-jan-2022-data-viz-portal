import { useParams } from 'react-router-dom';
import { useCheckUser } from '../hooks/useCheckUser';
import { useQuestionContext } from '../hooks/useQuestionContext';

export const QuizResults = () => {
  const { weekNumber } = useParams();
  const { user } = useCheckUser();
  const { results, isResultsLoading, resultsError } = useQuestionContext();

  if (results) {
    console.log(results.length);
  }

  return <div>Quiz Results for Week {weekNumber}</div>;

  // get results
};
