import { useEffect } from 'react';
import { QuizCard } from './QuizCard';
import { quizSchedule } from '../data/quizSchedule';
import { useQuestionContext } from '../hooks/useQuestionContext';

export const QuizCards = ({ completed, profilePage = false }) => {
  const { clearQuestions } = useQuestionContext();

  useEffect(() => {
    clearQuestions();
    return () => {
      clearQuestions();
    };
  }, [clearQuestions]);

  if (completed.length === 0) {
    return (
      <div className='centered'>
        <p>Loading...</p>
      </div>
    );
  }

  return quizSchedule.map((quiz, index) => (
    <QuizCard
      key={quiz.id}
      completed={completed[index]}
      profilePage={profilePage}
      {...quiz}
    />
  ));
};
