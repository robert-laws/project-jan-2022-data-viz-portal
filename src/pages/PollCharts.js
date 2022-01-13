import { useEffect, useState, useCallback } from 'react';
// import Select from 'react-select';
import { useCheckUser } from '../hooks/useCheckUser';
import { useQuestionContext } from '../hooks/useQuestionContext';
// import { useBuildChartArray } from '../hooks/useBuildChartArray';
import { Spinner } from '../components';
import { MultiSetBarChart } from '../components';

export const PollCharts = () => {
  const [loading, setLoading] = useState(true);
  const [pollsData, setPollsData] = useState(null);
  const [questionOneByClass, setQuestionOneByClass] = useState(null);
  const [questionOneByClassChartData, setQuestionOneByClassChartData] =
    useState(null);
  const [questionOneByMajor, setQuestionOneByMajor] = useState(null);
  const [questionOneByMeetingDay, setQuestionOneByMeetingDay] = useState(null);

  useCheckUser();

  const { polls, loadAllPolls, isPollsLoading, pollsError, clearPollsResults } =
    useQuestionContext();

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

  const cleanUpResults = (objectWithArray, weekNumber) => {
    const allPollsForWeek = objectWithArray[weekNumber];

    setPollsData(allPollsForWeek);
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

  useEffect(() => {
    if (pollsData) {
      // let questionTwo = [];

      // questionTwo = pollsData.filter((entry) => entry.questionNumber === '2');

      setQuestionOneByClassChartData(
        updateGroup(
          groupResults(
            pollsData.filter((entry) => entry.questionNumber === '1'),
            'studentClass'
          )
        )
      );

      setLoading(false);

      // console.log(
      //   updateGroup(
      //     groupResults(
      //       pollsData.filter((entry) => entry.questionNumber === '1'),
      //       'studentClass'
      //     )
      //   )
      // );

      // setQuestionOneByMajor(groupResults(questionOne, 'studentMajor'));
      // setQuestionOneByMeetingDay(groupResults(questionOne, 'meetingDay'));
    }
  }, [pollsData, updateGroup]);

  useEffect(() => {
    if (polls) {
      cleanUpResults(groupResults(polls, 'weekNumber'), 1);
    }
  }, [polls]);

  useEffect(() => {
    loadAllPolls();

    return () => {
      clearPollsResults();
    };
  }, [loadAllPolls, clearPollsResults]);

  return (
    <div className='app-content'>
      <div>
        <h2>Polls</h2>
        {/* {isPollsLoading && !pollsError ? <Spinner /> : <p>{polls.length}</p>} */}
        <div>
          <MultiSetBarChart
            chartData={questionOneByClassChartData}
            loading={loading}
            title='Favorite Colors'
            hAxisTitle='Number of Students'
            vAxisTitle='Class'
          />
        </div>
      </div>
    </div>
  );
};
