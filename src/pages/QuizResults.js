import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCheckUser } from '../hooks/useCheckUser';
import { useQuestionContext } from '../hooks/useQuestionContext';

export const QuizResults = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState([]);

  const { weekNumber } = useParams();
  const { user } = useCheckUser();
  const { results, questions, loadQuestions } = useQuestionContext();

  useEffect(() => {
    if (user && results) {
      const userWeekResults = results.filter(
        (result) =>
          result.userId === user.uid &&
          result.weekNumber.toString() === weekNumber &&
          result.category === 'quiz'
      );
      setQuizAnswers(userWeekResults);
    }
  }, [user, results, weekNumber]);

  useEffect(() => {
    if (questions) {
      const weekQuestions = questions.filter(
        (question) =>
          question.weekNumber.toString() === weekNumber &&
          question.category === 'quiz'
      );
      setQuizQuestions(weekQuestions);
    }
  }, [questions, weekNumber]);

  useEffect(() => {
    if (!questions) {
      loadQuestions();
    }
  }, [questions, loadQuestions]);

  console.log('Answers: ', quizAnswers);
  console.log('Questions: ', quizQuestions);

  return <div>Quiz Results for Week {weekNumber}</div>;

  // get results
};
