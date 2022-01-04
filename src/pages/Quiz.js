import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCheckUser } from '../hooks/useCheckUser';
import { useQuestionContext } from '../hooks/useQuestionContext';
import { QuizCards, QuizQuestionList } from '../components';

export const Quiz = () => {
  const { user, profile } = useCheckUser();
  const { questions, isQuestionsLoading, questionsError, loadQuestions } =
    useQuestionContext();

  const category = 'quiz';
  const { weekNumber } = useParams();

  const [completedList, setCompletedList] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    if (user && !questions) {
      loadQuestions();
      console.log('loading...');
    }
  }, [user, questions, loadQuestions]);

  useEffect(() => {
    if (profile) {
      setCompletedList(profile.quiz);
    }
  }, [profile]);

  useEffect(() => {
    if (questions && weekNumber) {
      const quizQuestions = questions.filter(
        (question) =>
          question.category === category &&
          question.weekNumber.toString() === weekNumber
      );
      setQuizQuestions(quizQuestions);
    }
  }, [questions, weekNumber]);

  return (
    <div>
      <h1>Quiz</h1>
      {weekNumber && user ? (
        <QuizQuestionList
          weekNumber={weekNumber}
          questions={quizQuestions}
          userId={user.uid}
          profile={profile}
        />
      ) : (
        <QuizCards completed={completedList} />
      )}
      {questions && <p>Number of Questions: {questions.length}</p>}
      {isQuestionsLoading && <p>Loading...</p>}
      {questionsError && <p>{questionsError}</p>}
    </div>
  );
};
