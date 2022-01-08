import { Chart } from 'react-google-charts';
import { Spinner } from './Spinner';

export const BarChart = ({
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
      minValue: 0,
      maxValue: 10,
      ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    vAxis: {
      title: vAxisTitle,
      minValue: 0,
      bars: 'horizontal',
    },
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
        chartType='BarChart'
        width='100%'
        height='400px'
        data={chartData}
        options={options}
      />
    </div>
  );
};
