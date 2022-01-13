import { useEffect, useState, useCallback } from 'react';
import { MultiSetBarChart } from '.';

export const PollCharts = ({ rawPollsData, pollsError }) => {
  const [loading, setLoading] = useState(true);
  const [pollsData, setPollsData] = useState(null);
  const [questionOneByClassChartData, setQuestionOneByClassChartData] =
    useState(null);
  const [questionTwoByMajorChartData, setQuestionTwoByMajorChartData] =
    useState(null);

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

  const updateGroup = useCallback((groupData) => {
    let resultArray = [['Class', 'blue', 'green', 'red', 'yellow']];
    if (groupData) {
      let blue = 0;
      let green = 0;
      let red = 0;
      let yellow = 0;

      for (const val in groupData) {
        blue += groupData[val].filter(
          (entry) => entry.answer === 'blue'
        ).length;
        green += groupData[val].filter(
          (entry) => entry.answer === 'green'
        ).length;
        red += groupData[val].filter((entry) => entry.answer === 'red').length;
        yellow += groupData[val].filter(
          (entry) => entry.answer === 'yellow'
        ).length;
        resultArray.push([
          val,
          parseInt(blue),
          parseInt(green),
          parseInt(red),
          parseInt(yellow),
        ]);
        blue = 0;
        green = 0;
        red = 0;
        yellow = 0;
      }
    }
    return resultArray;
  }, []);

  const updateGroupTwo = useCallback((groupData) => {
    let resultArray = [
      ['Class', 'all the time', 'sometimes', 'rarely', 'never'],
    ];
    if (groupData) {
      let allTheTime = 0;
      let sometimes = 0;
      let rarely = 0;
      let never = 0;

      for (const val in groupData) {
        allTheTime += groupData[val].filter(
          (entry) => entry.answer === 'all the time'
        ).length;
        sometimes += groupData[val].filter(
          (entry) => entry.answer === 'sometimes'
        ).length;
        rarely += groupData[val].filter(
          (entry) => entry.answer === 'rarely'
        ).length;
        never += groupData[val].filter(
          (entry) => entry.answer === 'never'
        ).length;
        resultArray.push([
          val,
          parseInt(allTheTime),
          parseInt(sometimes),
          parseInt(rarely),
          parseInt(never),
        ]);
        allTheTime = 0;
        sometimes = 0;
        rarely = 0;
        never = 0;
      }
    }
    return resultArray;
  }, []);

  useEffect(() => {
    if (pollsData) {
      setQuestionOneByClassChartData(
        updateGroup(
          groupResults(
            pollsData.filter((entry) => entry.questionNumber === '1'),
            'studentClass'
          )
        )
      );

      setQuestionTwoByMajorChartData(
        updateGroupTwo(
          groupResults(
            pollsData.filter((entry) => entry.questionNumber === '2'),
            'studentMajor'
          )
        )
      );

      setLoading(false);
    }
  }, [pollsData, updateGroup, updateGroupTwo]);

  const cleanUpResults = (objectWithArray, weekNumber) => {
    const allPollsForWeek = objectWithArray[weekNumber];
    setPollsData(allPollsForWeek);
  };

  useEffect(() => {
    if (rawPollsData) {
      cleanUpResults(groupResults(rawPollsData, 'weekNumber'), 1);
    }
  }, [rawPollsData]);

  return (
    <div>
      <div className='quiz-chart'>
        <MultiSetBarChart
          chartData={questionOneByClassChartData}
          loading={loading}
          error={pollsError}
          title='Favorite Colors'
          hAxisTitle='Number of Students'
          vAxisTitle='Class'
        />
      </div>
      <div className='quiz-chart'>
        <MultiSetBarChart
          chartData={questionTwoByMajorChartData}
          loading={loading}
          error={pollsError}
          title='Library Study Times'
          hAxisTitle='Number of Students'
          vAxisTitle='Major'
        />
      </div>
    </div>
  );
};
