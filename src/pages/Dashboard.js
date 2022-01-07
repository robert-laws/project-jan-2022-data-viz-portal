import { useCheckUser } from '../hooks/useCheckUser';
import { useBuildChartArray } from '../hooks/useBuildChartArray';
import { BarChart, ColumnChart, LineChart } from '../components';

export const Dashboard = () => {
  const { isProfileLoading } = useCheckUser();

  // useBuildChartArray()
  // depends on state in QuestionContext for 'results', which is loaded by useCheckUser()
  // no additional queries - only data processing
  const [googleChartData, isResultsLoading, resultsError] = useBuildChartArray(
    'weekNumber',
    'Weeks',
    'Scores'
  );

  if (isProfileLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Charts</h1>
      <div>
        <div>
          {googleChartData && (
            <ColumnChart
              title='Quiz Results'
              chartData={googleChartData}
              vAxisTitle='Score'
              hAxisTitle='Weeks'
              loading={isResultsLoading}
              error={resultsError}
            />
          )}
        </div>

        <div>
          {googleChartData && (
            <BarChart
              title='Quiz Results'
              chartData={googleChartData}
              vAxisTitle='Weeks'
              hAxisTitle='Score'
              loading={isResultsLoading}
              error={resultsError}
            />
          )}
        </div>

        <div>
          {googleChartData && (
            <LineChart
              title='Quiz Results'
              chartData={googleChartData}
              vAxisTitle='Weeks'
              hAxisTitle='Score'
              loading={isResultsLoading}
              error={resultsError}
            />
          )}
        </div>
      </div>
    </div>
  );
};
