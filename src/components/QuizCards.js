import { QuizCard } from './QuizCard';
import { quizSchedule } from '../data/quizSchedule';

export const QuizCards = ({ completed }) => {
  if (completed.length === 0) {
    return <p>Loading...</p>;
  }

  return quizSchedule.map((quiz, index) => (
    <QuizCard key={quiz.id} completed={completed[index]} {...quiz} />
  ));
};
