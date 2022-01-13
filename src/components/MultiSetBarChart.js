import { Chart } from 'react-google-charts';
import { Spinner } from './Spinner';

export const MultiSetBarChart = ({
  title,
  hAxisTitle,
  vAxisTitle,
  chartData,
  loading,
}) => {
  const options = {
    hAxis: {
      title: hAxisTitle,
    },
    vAxis: {
      title: vAxisTitle,
      minValue: 0,
      bars: 'horizontal',
    },
    colors: ['#338AFF', '#30A948', '#CE2826', '#E2F21E'],
    legend: { position: 'bottom' },
  };

  console.log(chartData);

  if (loading) {
    return (
      <div className='centered'>
        <Spinner />
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className='centered'>
  //       <p>No Data to Display</p>
  //     </div>
  //   );
  // }

  if (!loading && chartData) {
    return (
      <div className='chart'>
        <h3>{title}</h3>
        <Chart
          chartType='BarChart'
          width='1000px'
          height='400px'
          data={chartData}
          options={options}
        />
      </div>
    );
  }
};
