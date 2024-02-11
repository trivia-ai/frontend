import React, { useState, useEffect } from 'react';
import { API } from '../utilities';
import { Loading } from '../components';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from 'victory';

function PerformanceLinePage() {
  const [performanceData, setPerformanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');

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

  // Function to filter performance data by subject
  const filterDataBySubject = (subject) => {
    return performanceData.filter(item => item.subject === subject);
  };

  // Prepare data for the chart
  const getChartData = (subject) => {
    const filteredData = filterDataBySubject(subject);
    return filteredData.map((item, index) => ({ x: `Test ${index + 1}`, y: item.score[0] }));
  };

  // Function to handle subject change
  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  // Get list of subjects with more than one data point
  const availableSubjects = Array.from(new Set(performanceData.map(item => item.subject))).filter(subject => {
    const dataCount = performanceData.filter(item => item.subject === subject).length;
    return dataCount > 1;
  });

  return (
    <div className="performance_container">
      <h2 className="page_heading">Performance</h2>

      <Loading isLoading={isLoading} />

      <div>
        <label htmlFor="subjectSelect">Select a Subject:</label>
        <select id="subjectSelect" value={selectedSubject} onChange={handleSubjectChange}>
          <option value="">-- Select Subject --</option>
          {/* Dynamically generate options based on available subjects */}
          {availableSubjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      <div className="line-chart-container">
        {selectedSubject && (
          <VictoryChart
            theme={VictoryTheme.material}
          >
            <VictoryAxis />
            <VictoryAxis
              dependentAxis
              tickFormat={(t) => `${t}%`} // Format score as percentage
            />
            <VictoryLine
              data={getChartData(selectedSubject)}
              style={{
                data: { stroke: "blue" }
              }}
            />
          </VictoryChart>
        )}
      </div>
    </div>
  );
}

export default PerformanceLinePage;
