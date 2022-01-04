import { PollCard } from './PollCard';
import { pollSchedule } from '../data/pollSchedule';

export const PollCards = ({ completed }) => {
  if (completed.length === 0) {
    return <p>Loading...</p>;
  }

  return pollSchedule.map((poll, index) => (
    <PollCard key={poll.id} completed={completed[index]} {...poll} />
  ));
};
