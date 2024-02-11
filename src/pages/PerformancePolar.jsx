import React, { useState, useEffect } from 'react';
import { API } from '../utilities';
import { Loading } from '../components';
import { VictoryChart, VictoryBar, VictoryPolarAxis, VictoryTheme } from 'victory';

function PerformancePolarPage() {
  const [performanceData, setPerformanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [tickValues, setTickValues] = useState([]);

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

  // Function to handle subject change
  const handleSubjectChange = (event) => {
    const subject = event.target.value;
    setSelectedSubject(subject);
    // Filter performance data for the selected subject
    const filteredData = performanceData.filter(item => item.subject === subject);
    // Extract all scores for the selected subject
    const scores = filteredData.reduce((acc, curr) => acc.concat(curr.score), []);
    // Generate tick values based on scores
    const maxScore = Math.max(...scores);
    const interval = maxScore / 8;
    const newTickValues = Array.from({ length: 8 }, (_, index) => index * interval);
    setTickValues(newTickValues);
  };

  return (
    <div>
      <h2 className="page_heading">Performance</h2>

      <Loading isLoading={isLoading} />

      <div>
        <label htmlFor="subjectSelect">Select a Subject:</label>
        <select id="subjectSelect" value={selectedSubject} onChange={handleSubjectChange}>
          <option value="">-- Select Subject --</option>
          {/* Dynamically generate options based on available subjects */}
          {Array.from(new Set(performanceData.map(item => item.subject))).map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <VictoryChart polar
          theme={VictoryTheme.material}
          startAngle={0}
          endAngle={180}
        >
          <VictoryPolarAxis
            tickValues={tickValues}
            labelPlacement="vertical"
          />
          <VictoryBar style={{ data: { fill: "tomato", width: 30 } }}
            data={performanceData.filter(item => item.subject === selectedSubject).map((item, index) => ({ x: index * (360 / performanceData.length), y: item.score[0] }))}
          />
        </VictoryChart>
      </div>
    </div>
  );
}

export default PerformancePolarPage;
