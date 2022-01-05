import { Chart } from 'react-google-charts';

export const options = {
  hAxis: {
    title: 'Weeks',
  },
  vAxis: {
    title: 'Score',
    maxValue: 10,
    minValue: 0,
    ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  legend: { position: 'bottom' },
};

export const ColumnChart = ({ title, chartData }) => {
  if (chartData.length === 0) {
    return (
      <div>
        <p>No data to display</p>
      </div>
    );
  }

  return (
    <div className='chart'>
      <h3>{title}</h3>
      <Chart
        chartType='ColumnChart'
        width='100%'
        height='400px'
        data={chartData}
        options={options}
      />
    </div>
  );
};
