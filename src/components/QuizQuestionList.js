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
  const [quizErrors, setQuizErrors] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
  ]);

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

    if (quizAnswers.length === 10) {
      setQuizErrors(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);

      setIsSubmitPending(true);

      let quizCompletedList = profile.quiz;
      const completedIndex = weekNumber - 1;
      quizCompletedList.splice(completedIndex, 1, true);

      saveResults(quizAnswers);
      updateUserCompletedList('quiz', userId, quizCompletedList);
    } else if (quizAnswers.length === 0) {
      setQuizErrors([]);
    } else {
      let errorList = [];
      quizAnswers.forEach((answer) => {
        errorList.push(answer.questionNumber.toString());
      });
      setQuizErrors(errorList);
    }
  };

  if (isQuestionsLoading) {
    return (
      <div className='centered'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <form className='app-form' onSubmit={handleSubmit}>
      <h2>Quiz Questions for Week {weekNumber}</h2>
      {questions &&
        questions.map((question, index) => (
          <QuizQuestion
            error={!quizErrors.includes(question.questionNumber.toString())}
            key={question.id}
            number={index + 1}
            {...question}
            updateAnswers={handleAnswer}
          />
        ))}
      <div className='form-submit'>
        <Button isLoading={isSubmitPending} styleClass='secondary'>
          Submit Quiz
        </Button>
        {quizErrors.length !== 10 && (
          <p className='error-text'>Please answer all the questions</p>
        )}
        {questionsError && <p className='error-text'>{questionsError}</p>}
      </div>
    </form>
  );
};
