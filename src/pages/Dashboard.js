import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useCheckUser } from '../hooks/useCheckUser';
import { useQuestionContext } from '../hooks/useQuestionContext';
import { useBuildChartArray } from '../hooks/useBuildChartArray';
import { BarChart, ColumnChart, LineChart } from '../components';

const chartSelections = [
  { value: 'column', label: 'Column Chart' },
  { value: 'bar', label: 'Bar Chart' },
  { value: 'line', label: 'Line Chart' },
];

export const Dashboard = () => {
  const [chartSelection, setChartSelection] = useState('column');
  const [scoreText, setScoreText] = useState('Loading');
  const { user, isProfileLoading } = useCheckUser();
  const { loadResults } = useQuestionContext();

  useEffect(() => {
    if (user) {
      loadResults(user.uid);
    }
  }, [user, loadResults]);

  // useBuildChartArray()
  // depends on state in QuestionContext for 'results', which is loaded by useCheckUser()
  // no additional queries - only data processing
  const [googleChartData, isResultsLoading, resultsError] = useBuildChartArray(
    'weekNumber',
    'Weeks',
    'Scores'
  );

  // const { polls, loadAllPolls, isPollsLoading, pollsError, clearPollsResults } =
  //   useQuestionContext();

  // useEffect(() => {
  //   loadAllPolls();

  //   return () => {
  //     clearPollsResults();
  //   };
  // }, [loadAllPolls, clearPollsResults]);

  const getScoreAverage = (scoreData) => {
    let average = '';
    if (scoreData && scoreData.length > 0) {
      const quizzesTaken = scoreData.length - 1;
      let score = 0;

      for (let i = 1; i < scoreData.length; i++) {
        score += scoreData[i][1];
      }

      const scoreAverage = score / quizzesTaken;
      average = `${scoreAverage * 10}% ∙ ${score} points out of ${
        quizzesTaken * 10
      } Total`;
    } else {
      average = '0 Quizzes Taken';
    }

    return average;
  };

  useEffect(() => {
    const result = getScoreAverage(googleChartData);
    setScoreText(result);
  }, [googleChartData]);

  if (isProfileLoading) {
    return (
      <div className='app-content'>
        <div className='centered'>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className='section-app-content'>
      <div className='app-content'>
        <h1>Your Data Dashboard</h1>
        <div className='dashboard-quiz'>
          <div className='quiz-tools'>
            <h2>Your Quiz Average: {scoreText}</h2>
            <div className='quiz-select'>
              <label>
                <span>Change Quiz Scores Visualization Type</span>
                <Select
                  options={chartSelections}
                  onChange={(option) => setChartSelection(option.value)}
                />
              </label>
            </div>
          </div>
          {googleChartData && chartSelection === 'column' && (
            <div className='quiz-chart'>
              <ColumnChart
                title='Quiz Results'
                chartData={googleChartData}
                vAxisTitle='Score'
                hAxisTitle='Weeks'
                loading={isResultsLoading}
                error={resultsError}
              />
            </div>
          )}

          {googleChartData && chartSelection === 'bar' && (
            <div className='quiz-chart'>
              <BarChart
                title='Quiz Results'
                chartData={googleChartData}
                vAxisTitle='Weeks'
                hAxisTitle='Score'
                loading={isResultsLoading}
                error={resultsError}
              />
            </div>
          )}

          {googleChartData && chartSelection === 'line' && (
            <div className='quiz-chart'>
              <LineChart
                title='Quiz Results'
                chartData={googleChartData}
                vAxisTitle='Weeks'
                hAxisTitle='Score'
                loading={isResultsLoading}
                error={resultsError}
              />
            </div>
          )}
        </div>
        {/* <div>
        <h2>Polls</h2>
        {isPollsLoading && !pollsError ? (
          <p>Loading...</p>
        ) : (
          <div>{polls.length}</div>
        )}
      </div> */}
      </div>
    </main>
  );
};
