import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart({ scoreData }) {
  // Extracting scores and timestamps from the scoreData
  const scores = scoreData.map(item => item.score.length > 0 ? item.score[0] : null);
  const timestamps = scoreData.map(item => item.timestamp);

  // Building data object for the chart
  const data = {
    labels: timestamps,
    datasets: [
      {
        label: 'Scores',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: scores
      }
    ]
  };

  return (
    <div>
      <h2>Line Chart</h2>
      <Line data={data} />
    </div>
  );
}

export default LineChart;
