import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCheckUser } from '../hooks/useCheckUser';
import { useQuestionContext } from '../hooks/useQuestionContext';

export const QuizResults = () => {
  const { weekNumber } = useParams();
  const { user } = useCheckUser();
  const {
    results,
    questions,
    loadQuestions,
    loadResultsForCategoryAndWeekNumber,
    clearResults,
    clearQuestions,
  } = useQuestionContext();

  useEffect(() => {
    if (user) {
      loadResultsForCategoryAndWeekNumber(user.uid, 'quiz', weekNumber);
    }
  }, [user, weekNumber, loadResultsForCategoryAndWeekNumber]);

  useEffect(() => {
    loadQuestions('quiz', weekNumber);
  }, [loadQuestions, weekNumber]);

  useEffect(() => {
    clearResults();
    clearQuestions();
    return () => {
      clearResults();
      clearQuestions();
    };
  }, [clearResults, clearQuestions]);

  return (
    <div>
      <h2>Quiz Results for Week {weekNumber}</h2>
      {questions &&
        questions.map((question) => (
          <div key={question.id}>
            <p>{question.questionText}</p>
            <ul>
              {question.answers.map((answer) => {
                if (answer === question.correctAnswer) {
                  if (
                    results.find(
                      (answer) =>
                        answer.questionNumber ===
                        question.questionNumber.toString()
                    ).answer === answer
                  ) {
                    return (
                      <li key={answer}>{answer} - Correct - Your Answer</li>
                    );
                  } else {
                    return <li key={answer}>{answer} - Correct</li>;
                  }
                } else {
                  if (
                    results.find(
                      (answer) =>
                        answer.questionNumber ===
                        question.questionNumber.toString()
                    ).answer === answer
                  ) {
                    return (
                      <li key={answer}>{answer} - Incorrect - Your Answer</li>
                    );
                  } else {
                    return <li key={answer}>{answer} - Incorrect</li>;
                  }
                }
              })}
            </ul>
          </div>
        ))}
    </div>
  );

  // get results
};
