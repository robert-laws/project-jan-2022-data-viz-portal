import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizQuestion } from './QuizQuestion';
import { useQuestionContext } from '../hooks/useQuestionContext';
import { useUserContext } from '../hooks/useUserContext';

export const QuizQuestionList = ({ weekNumber, userId, profile }) => {
  const { questions, isQuestionsLoading, questionsError, loadQuestions } =
    useQuestionContext();

  const [quizAnswers, setQuizAnswers] = useState([]);

  const navigate = useNavigate();

  const { saveResults } = useQuestionContext();
  const { updateUserCompletedList, isProfileUpdating } = useUserContext();

  useEffect(() => {
    loadQuestions('quiz', weekNumber);
  }, [loadQuestions, weekNumber]);

  const handleAnswer = useCallback(
    (answer) => {
      setQuizAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        const answerIndex = updatedAnswers.findIndex(
          (a) => a.questionNumber === answer.questionNumber
        );
        if (answerIndex === -1) {
          updatedAnswers.push({ ...answer, userId: userId });
        } else {
          updatedAnswers[answerIndex] = { ...answer, userId: userId };
        }
        return updatedAnswers;
      });
    },
    [userId]
  );

  useEffect(() => {
    if (!isProfileUpdating) {
      navigate('/profile');
    }
  }, [isProfileUpdating, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let quizCompletedList = profile.quiz;
    const completedIndex = weekNumber - 1;
    quizCompletedList.splice(completedIndex, 1, true);

    saveResults(quizAnswers);
    updateUserCompletedList('quiz', userId, quizCompletedList);
  };

  if (isQuestionsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Quiz Questions for Week {weekNumber}</h2>
      {questions &&
        questions.map((question, index) => (
          <QuizQuestion
            key={question.id}
            number={index + 1}
            {...question}
            updateAnswers={handleAnswer}
          />
        ))}
      {questionsError && <p>{questionsError}</p>}
      <button>Submit Quiz</button>
    </form>
  );
};
