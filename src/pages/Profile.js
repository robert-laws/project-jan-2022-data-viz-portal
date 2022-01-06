import { useEffect, useState } from 'react';
import { useCheckUser } from '../hooks/useCheckUser';
import { useBuildChartArray } from '../hooks/useBuildChartArray';
import {
  BarChart,
  ColumnChart,
  LineChart,
  QuizCards,
  PollCards,
} from '../components';

export const Profile = () => {
  const [chartData, setChartData] = useState([]);
  const { user, profile, isProfileLoading, profileError } = useCheckUser();
  const [googleChartData, isResultsLoading, resultsError] = useBuildChartArray(
    user,
    'weekNumber',
    'Weeks',
    'Scores'
  );

  const [completedQuizList, setCompletedQuizList] = useState([]);
  const [completedPollList, setCompletedPollList] = useState([]);

  useEffect(() => {
    if (profile) {
      setCompletedQuizList(profile.quiz);
      setCompletedPollList(profile.poll);
    }
  }, [profile]);

  useEffect(() => {
    setChartData(googleChartData);
  }, [googleChartData]);

  return (
    <div>
      {isProfileLoading && !profileError ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>
            {profile.firstName} {profile.lastName}
          </p>
        </div>
      )}
      {profileError && <p>{profileError}</p>}
      {profile && (
        <div>
          <div>
            <QuizCards completed={completedQuizList} />
          </div>
          <div>
            <PollCards completed={completedPollList} />
          </div>
        </div>
      )}
      <div>
        {isResultsLoading && !resultsError ? (
          <p>Loading...</p>
        ) : (
          <div>
            {resultsError && <p>{resultsError}</p>}
            {googleChartData && (
              <ColumnChart
                title='Quiz Results'
                chartData={chartData}
                vAxisTitle='Score'
                hAxisTitle='Weeks'
              />
            )}
          </div>
        )}
        {isResultsLoading && !resultsError ? (
          <p>Loading...</p>
        ) : (
          <div>
            {resultsError && <p>{resultsError}</p>}
            {googleChartData && (
              <BarChart
                title='Quiz Results'
                chartData={chartData}
                vAxisTitle='Weeks'
                hAxisTitle='Score'
              />
            )}
          </div>
        )}
        {isResultsLoading && !resultsError ? (
          <p>Loading...</p>
        ) : (
          <div>
            {resultsError && <p>{resultsError}</p>}
            {googleChartData && (
              <LineChart
                title='Quiz Results'
                chartData={chartData}
                vAxisTitle='Weeks'
                hAxisTitle='Score'
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
