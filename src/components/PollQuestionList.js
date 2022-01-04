import { useState, useCallback } from 'react';
import { PollQuestion } from './PollQuestion';

export const PollQuestionList = ({ weekNumber, questions, userId }) => {
  const [pollAnswers, setPollAnswers] = useState([]);

  const handleAnswer = useCallback(
    (answer) => {
      setPollAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        const answerIndex = updatedAnswers.findIndex(
          (a) => a.questionNumber === answer.questionNumber
        );
        if (answerIndex === -1) {
          updatedAnswers.push({ ...answer, userId });
        } else {
          updatedAnswers[answerIndex] = { ...answer, userId };
        }
        return updatedAnswers;
      });
    },
    [userId]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(pollAnswers);
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
