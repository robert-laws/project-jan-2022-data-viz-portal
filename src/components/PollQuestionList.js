import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PollQuestion } from './PollQuestion';
import { useQuestionContext } from '../hooks/useQuestionContext';
import { useUserContext } from '../hooks/useUserContext';

export const PollQuestionList = ({
  weekNumber,
  questions,
  userId,
  profile,
}) => {
  const [pollAnswers, setPollAnswers] = useState([]);

  const navigate = useNavigate();

  const { saveResults } = useQuestionContext();
  const { updateUserCompletedList, isProfileUpdating } = useUserContext();

  const handleAnswer = useCallback(
    (answer) => {
      setPollAnswers((prevAnswers) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    let pollCompletedList = profile.poll;
    const completedIndex = weekNumber - 1;
    pollCompletedList.splice(completedIndex, 1, true);

    saveResults(pollAnswers);
    updateUserCompletedList('poll', userId, pollCompletedList);

    if (!isProfileUpdating) {
      navigate('/profile', { replace: true });
    }
  };

  if (!questions) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Poll for Week {weekNumber}</h2>
      {questions.map((question, index) => (
        <PollQuestion
          key={question.id}
          number={index + 1}
          {...question}
          updateAnswers={handleAnswer}
        />
      ))}
      <button>Submit Poll</button>
    </form>
  );
};
