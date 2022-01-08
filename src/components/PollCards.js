import { useEffect } from 'react';
import { PollCard } from './PollCard';
import { pollSchedule } from '../data/pollSchedule';
import { useQuestionContext } from '../hooks/useQuestionContext';

export const PollCards = ({ completed, profilePage = false }) => {
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

  return pollSchedule.map((poll, index) => (
    <PollCard
      key={poll.id}
      completed={completed[index]}
      profilePage={profilePage}
      {...poll}
    />
  ));
};
