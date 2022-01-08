import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PollQuestion } from './PollQuestion';
import { useQuestionContext } from '../hooks/useQuestionContext';
import { useUserContext } from '../hooks/useUserContext';
import { Button } from './Button';

export const PollQuestionList = ({ weekNumber, userId, profile }) => {
  const { questions, isQuestionsLoading, questionsError, loadQuestions } =
    useQuestionContext();

  const [isSubmitPending, setIsSubmitPending] = useState(false);
  const [pollAnswers, setPollAnswers] = useState([]);
  const [pollErrors, setPollErrors] = useState(['1', '2']);

  const navigate = useNavigate();

  const { saveResults, isSaving } = useQuestionContext();
  const { updateUserCompletedList, isProfileUpdating } = useUserContext();

  useEffect(() => {
    loadQuestions('poll', weekNumber);
  }, [loadQuestions, weekNumber]);

  const handleAnswer = useCallback(
    (answer) => {
      setPollAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        const answerIndex = updatedAnswers.findIndex(
          (a) => a.questionNumber === answer.questionNumber
        );
        if (answerIndex === -1) {
          updatedAnswers.push({
            ...answer,
            userId: userId,
            meetingDay: profile.meetingDay,
            studentClass: profile.studentClass,
            studentMajor: profile.studentMajor,
          });
        } else {
          updatedAnswers[answerIndex] = {
            ...answer,
            userId: userId,
            meetingDay: profile.meetingDay,
            studentClass: profile.studentClass,
            studentMajor: profile.studentMajor,
          };
        }
        return updatedAnswers;
      });
    },
    [userId, profile]
  );

  useEffect(() => {
    if (!isProfileUpdating && !isSaving) {
      navigate('/profile');
    }
  }, [isProfileUpdating, isSaving, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (pollAnswers.length === 2) {
      setPollErrors(['1', '2']);

      setIsSubmitPending(true);

      let pollCompletedList = profile.poll;
      const completedIndex = weekNumber - 1;
      pollCompletedList.splice(completedIndex, 1, true);

      saveResults(pollAnswers);
      updateUserCompletedList('poll', userId, pollCompletedList);
    } else if (pollAnswers.length === 0) {
      setPollErrors([]);
    } else {
      let errorList = [];
      pollAnswers.forEach((answer) => {
        errorList.push(answer.questionNumber.toString());
      });
      setPollErrors(errorList);
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
      <h2>Poll for Week {weekNumber}</h2>
      {questions.map((question, index) => (
        <PollQuestion
          error={!pollErrors.includes(question.questionNumber.toString())}
          key={question.id}
          number={index + 1}
          {...question}
          updateAnswers={handleAnswer}
        />
      ))}
      <div className='form-submit'>
        <Button isLoading={isSubmitPending} styleClass='secondary'>
          Submit Poll
        </Button>
        {pollErrors.length !== 2 && (
          <p className='error-text'>Please answer all the questions</p>
        )}
        {questionsError && <p className='error-text'>{questionsError}</p>}
      </div>
    </form>
  );
};
