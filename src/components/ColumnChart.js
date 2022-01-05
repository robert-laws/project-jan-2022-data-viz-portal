import { Chart } from 'react-google-charts';

export const ColumnChart = ({ title, hAxisTitle, vAxisTitle, chartData }) => {
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
    legend: { position: 'bottom' },
  };

  if (chartData.length === 0) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (chartData.length === 1) {
    return (
      <div>
        <p>No Data to Display</p>
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
