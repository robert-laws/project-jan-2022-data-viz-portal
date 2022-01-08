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
    return () => {
      clearResults();
      clearQuestions();
    };
  }, [clearResults, clearQuestions]);

  return (
    <main className='section-app-content'>
      <div className='app-content'>
        <h1>Quiz Results for Week {weekNumber}</h1>
        {questions &&
          questions.map((question, index) => (
            <div className='app-form' key={question.id}>
              <p>Question # {index + 1}</p>
              <p>
                <strong>{question.questionText}</strong>
              </p>
              <ul className='quiz-results-list'>
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
                        <li className='correct' key={answer}>
                          {answer} - Correct - Your Answer
                        </li>
                      );
                    } else {
                      return (
                        <li className='correct' key={answer}>
                          {answer} - Correct
                        </li>
                      );
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
                        <li className='incorrect' key={answer}>
                          {answer} - Incorrect - Your Answer
                        </li>
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
    </main>
  );

  // get results
};
