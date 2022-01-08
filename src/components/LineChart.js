import { Chart } from 'react-google-charts';
import { Spinner } from './Spinner';

export const LineChart = ({
  title,
  hAxisTitle,
  vAxisTitle,
  chartData,
  loading,
  error,
}) => {
  const options = {
    hAxis: {
      title: hAxisTitle,
    },
    vAxis: {
      title: vAxisTitle,
      maxValue: 10,
      minValue: 0,
      ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    curveType: 'function',
    legend: { position: 'bottom' },
  };

  if (loading) {
    return (
      <div className='centered'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='centered'>
        <p>No Data to Display</p>
      </div>
    );
  }

  return (
    <div className='chart'>
      <h3>{title}</h3>
      <Chart
        chartType='LineChart'
        width='100%'
        height='400px'
        data={chartData}
        options={options}
      />
    </div>
  );
};
