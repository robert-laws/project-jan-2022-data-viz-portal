import { useState, useEffect } from 'react';
import { useQuestionContext } from '../hooks/useQuestionContext';

export const useBuildChartArray = (user, property, xAxisTitle, yAxisTitle) => {
  const { results, isResultsLoading, resultsError } = useQuestionContext();
  const [resultsList, setResultsList] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (results && user) {
      const userResults = results.filter(
        (result) => result.userId === user.uid
      );
      setResultsList(userResults);
    }
  }, [results, user]);

  useEffect(() => {
    if (resultsList) {
      const chartData = prepareUserQuizzesForVisualization(
        xAxisTitle,
        yAxisTitle,
        groupResults(getResultsForQuizzes(resultsList), property)
      );

      setData(chartData);
    }
  }, [resultsList, property, xAxisTitle, yAxisTitle]);

  const getResultsForQuizzes = (allResults) => {
    let results = [];

    allResults.forEach((result) => {
      if (result.category === 'quiz') {
        results.push(result);
      }
    });

    return results;
  };

  const groupResults = (arrayOfObjects, property) => {
    return arrayOfObjects.reduce((acc, obj) => {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  };

  const prepareUserQuizzesForVisualization = (
    category,
    measure,
    userQuizzes
  ) => {
    let quizResults = [[category, measure, { role: 'annotation' }]];
    for (const property in userQuizzes) {
      let correct = 0;
      userQuizzes[property].forEach((question) => {
        if (question.correct) {
          correct++;
        }
      });
      quizResults.push([property.toString(), correct, correct]);
    }
    return quizResults;
  };

  return [data, isResultsLoading, resultsError];
};
