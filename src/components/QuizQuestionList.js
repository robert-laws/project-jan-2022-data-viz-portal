import { useState, useCallback } from 'react';
import { QuizQuestion } from './QuizQuestion';

export const QuizQuestionList = ({ weekNumber, questions, userId }) => {
  const [quizAnswers, setQuizAnswers] = useState([]);

  const handleAnswer = useCallback(
    (answer) => {
      setQuizAnswers((prevAnswers) => {
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
    console.log(quizAnswers);
  };

  if (!questions) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Quiz Questions for Week {weekNumber}</h2>
      {questions.map((question, index) => (
        <QuizQuestion
          key={question.id}
          number={index + 1}
          {...question}
          updateAnswers={handleAnswer}
        />
      ))}
      <button>Submit Quiz</button>
    </form>
  );
};
