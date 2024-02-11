import React, { useState, useEffect } from 'react';
import { API } from '../utilities';
import { Loading } from '../components';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme,VictoryLine, VictoryLegend } from 'victory';



function PerformancePage() {
  const [performanceData, setPerformanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPerformanceData = async () => {
    try {
      setIsLoading(true);
      const response = await API.getUserPerformance({
        "email": "r@gmail.com"
      });
      setPerformanceData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching performance data:', error);
      setIsLoading(false);
      // Handle error, maybe show a message to the user
    }
  };

  useEffect(() => {
    // Load performance data when the component mounts
    getPerformanceData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Prepare data for the chart
  const subjects = performanceData.reduce((acc, curr) => {
    acc[curr.subject] = acc[curr.subject] || [];
    acc[curr.subject].push(curr.score.length > 0 ? curr.score.reduce((a, b) => a + b, 0) / curr.score.length : 0);
    return acc;
  }, {});

  const chartData = Object.keys(subjects).map(subject => ({
    subject,
    averageScore: subjects[subject].reduce((acc, curr) => acc + curr, 0) / subjects[subject].length
  }));

  return (
    <div className="performance_container">
      <h2 className="page_heading">Performance</h2>

      <Loading isLoading={isLoading} />

      <div className="performance_data">
        {performanceData.map((item, index) => (
          <div key={index} className="performance_item">
            <p>Subject: {item.subject}</p>
            <p>Topic: {item.topic}</p>
            <p>Score: {item.score.length > 0 ? item.score.reduce((a, b) => a + b, 0) / item.score.length : 'N/A'}</p>
            <p>Timestamp: {item.timestamp}</p>
          </div>
        ))}
      </div>

      <div className="bar-chart-container">
        <VictoryChart
          domainPadding={20}
          theme={VictoryTheme.material}
        >
          <VictoryAxis
            tickValues={chartData.map(data => data.subject)}
            tickFormat={t => t}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={t => t}
          />
          <VictoryBar
            data={chartData}
            x="subject"
            y="averageScore"
          />
        </VictoryChart>
      </div>
      <div className="line-chart-container">
        <VictoryChart
          theme={VictoryTheme.material}
        >
          <VictoryLegend x={50} y={0}
            orientation="horizontal"
            gutter={20}
            style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
            data={Object.keys(subjects).map(subject => ({
              name: subject,
              symbol: { fill: "blue" }
            }))}
          />
          <VictoryAxis
            label="Time"
            tickFormat={(t) => new Date(t).toLocaleDateString()}
          />
          <VictoryAxis
            dependentAxis
            label="Average Score"
            tickFormat={(t) => t}
          />
          {chartData.map((subjectData) => (
            <VictoryLine
              key={subjectData.id}
              data={subjectData.data}
              x="x"
              y="y"
            />
          ))}
        </VictoryChart>
      </div>
    </div>
    
  );
}

export default PerformancePage;
