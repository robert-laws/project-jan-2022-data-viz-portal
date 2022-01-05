import { useState, useEffect } from 'react';

export const useBuildChartArray = (
  listOfResults,
  property,
  xAxisTitle,
  yAxisTitle
) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (listOfResults.length > 0) {
      const chartData = prepareUserQuizzesForVisualization(
        xAxisTitle,
        yAxisTitle,
        groupResults(getResultsForQuizzes(listOfResults), property)
      );

      setData(chartData);
    }
  }, [listOfResults, property, xAxisTitle, yAxisTitle]);

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

  return data;
};
