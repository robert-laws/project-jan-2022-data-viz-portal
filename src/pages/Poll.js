import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCheckUser } from '../hooks/useCheckUser';
import { useQuestionContext } from '../hooks/useQuestionContext';
import { PollCards, PollQuestionList } from '../components';

export const Poll = () => {
  const { user, profile } = useCheckUser();
  const { questions, isQuestionsLoading, questionsError, loadQuestions } =
    useQuestionContext();

  const category = 'poll';
  const { weekNumber } = useParams();

  const [completedList, setCompletedList] = useState([]);
  const [pollQuestions, setPollQuestions] = useState([]);

  useEffect(() => {
    if (user && !questions) {
      loadQuestions();
      console.log('loading...');
    }
  }, [user, questions, loadQuestions]);

  useEffect(() => {
    if (profile) {
      setCompletedList(profile.poll);
    }
  }, [profile]);

  useEffect(() => {
    if (questions && weekNumber) {
      const pollQuestions = questions.filter(
        (question) =>
          question.category === category &&
          question.weekNumber.toString() === weekNumber
      );
      setPollQuestions(pollQuestions);
    }
  }, [questions, weekNumber]);

  return (
    <div>
      <h1>Poll</h1>
      {weekNumber && user ? (
        <PollQuestionList
          weekNumber={weekNumber}
          questions={pollQuestions}
          userId={user.uid}
          profile={profile}
        />
      ) : (
        <PollCards completed={completedList} />
      )}
      {questions && <p>Number of Questions: {questions.length}</p>}
      {isQuestionsLoading && <p>Loading...</p>}
      {questionsError && <p>{questionsError}</p>}
    </div>
  );
};
