import { useCheckUser } from '../hooks/useCheckUser';
import { useBuildChartArray } from '../hooks/useBuildChartArray';
import {
  BarChart,
  ColumnChart,
  LineChart,
  QuizCards,
  PollCards,
} from '../components';

// TODO - split up content into tabbed sections
// sections - profile, charts, etc.

export const Profile = () => {
  // useCheckUser()
  // 1) queries for profile first time on page *QUERY PROFILE - only 1 record
  // 2) queries user's results on every profile page load - data into results state in QuestionContext *QUERY RESULTS BY USERID - up to 60 records
  const { user, profile, isProfileLoading, profileError } = useCheckUser();

  // useBuildChartArray()
  // depends on state in QuestionContext for 'results', which is loaded by useCheckUser()
  // no additional queries - only data processing
  const [googleChartData, isResultsLoading, resultsError] = useBuildChartArray(
    'weekNumber',
    'Weeks',
    'Scores'
  );

  return (
    <div>
      {isProfileLoading && !profileError ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>
            {profile.firstName} {profile.lastName}
          </p>
          {user && <p>email: {user.email}</p>}
          <p>class: {profile.studentClass}</p>
          <p>class: {profile.studentMajor}</p>
          <p>class: {profile.meetingDay}</p>
        </div>
      )}
      {profileError && <p>{profileError}</p>}
      {profile && !profileError && (
        <div>
          <div>
            <QuizCards completed={profile.quiz} profilePage={true} />
          </div>
          <div>
            <PollCards completed={profile.poll} profilePage={true} />
          </div>
        </div>
      )}
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
