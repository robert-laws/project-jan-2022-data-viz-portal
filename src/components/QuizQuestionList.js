import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizQuestion } from './QuizQuestion';
import { useQuestionContext } from '../hooks/useQuestionContext';
import { useUserContext } from '../hooks/useUserContext';
import { Button } from './Button';

export const QuizQuestionList = ({ weekNumber, userId, profile }) => {
  const { questions, isQuestionsLoading, questionsError, loadQuestions } =
    useQuestionContext();

  const [isSubmitPending, setIsSubmitPending] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);

  const navigate = useNavigate();

  const { saveResults, isSaving } = useQuestionContext();
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
    if (!isProfileUpdating && !isSaving) {
      navigate('/profile');
    }
  }, [isProfileUpdating, isSaving, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitPending(true);

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
      <Button isLoading={isSubmitPending} styleClass='secondary'>
        Submit Quiz
      </Button>
    </form>
  );
};
