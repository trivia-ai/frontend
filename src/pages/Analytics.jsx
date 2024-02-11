import React, { useEffect, useState } from 'react';
import { API } from '../utilities'
import { Loading } from '../components'
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme, VictoryLine, VictoryLegend } from 'victory';

const AnalyticsPage = () => {
    const email = localStorage.getItem('userEmail')
    const [performanceData, setPerformanceData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('');

    const getPerformanceData = async () => {
        try {
            setIsLoading(true);
            const response = await API.getUserPerformance({
                "email": email
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

    const subjects = performanceData.reduce((acc, curr) => {
        acc[curr.subject] = acc[curr.subject] || [];
        acc[curr.subject].push(curr.score.length > 0 ? curr.score.reduce((a, b) => a + b, 0) / curr.score.length : 0);
        return acc;
    }, {});

    const chartData = Object.keys(subjects).map(subject => ({
        subject,
        averageScore: subjects[subject].reduce((acc, curr) => acc + curr, 0) / subjects[subject].length
    }));

    const filterDataBySubject = (subject) => {
        return performanceData.filter(item => item.subject === subject);
    };

    const getChartData = (subject) => {
        const filteredData = filterDataBySubject(subject);
        return filteredData.flatMap((item, index) => (
            item.score.map((score, scoreIndex) => ({ x: `Test ${index + 1} - Score ${scoreIndex + 1}`, y: score }))
        ));
    };
    

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    };

    const availableSubjects = Array.from(new Set(performanceData.map(item => item.subject)))
    .filter(subject => {
      return performanceData.filter(item => item.subject === subject && item.score.length > 1).length > 0;
    });

    return (
        <div className="performance_container" style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: '1', marginRight: '10px' }}>
                <h2 className="page_subheading">Average Score Per Subject</h2>
                <div style={{ flex: '1', marginTop: '100px' }} className="bar-chart-container">
                    <VictoryChart
                        domainPadding={50}
                        theme={VictoryTheme.material}
                        width={200} // Change width here
                        height={200} // Change height here
                    >
                        <VictoryAxis
                            tickValues={chartData.map(data => data.subject)}
                            tickFormat={t => t}
                            style={{
                                tickLabels: { fontSize: 5, angle: -45 },
                                axis: { stroke: "#333333" },
                                ticks: { size: 5 }
                            }}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={t => t}
                            style={{
                                tickLabels: { fontSize: 6 },
                                axis: { stroke: "#333333" },
                                ticks: { size: 5 }
                            }}
                        />
                        <VictoryBar
                            data={chartData}
                            x="subject"
                            y="averageScore"
                            style={{
                                data: {
                                    fill: "#888888",
                                    width: 10
                                }
                            }}
                        />
                    </VictoryChart>
                </div>
            </div>
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                <h2 className="page_subheading">Trends in Score Per Subject</h2>
                <div style={{ marginBottom: '0px', flex: '1' , marginLeft: '100px'}}>
                    <label htmlFor="subjectSelect" style={{ marginRight: '5px' }}>Select a Subject:</label>
                    <select id="subjectSelect" value={selectedSubject} onChange={handleSubjectChange} style={{ fontSize: '14px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}>
                        <option value="">-- Select Subject --</option>
                        {availableSubjects.map((subject, index) => (
                            <option key={index} value={subject}>{subject}</option>
                        ))}
                    </select>
                </div>
                <div className="line-chart-container" style={{ flex: '1' }}>
                    {selectedSubject && (
                        <VictoryChart
                            theme={VictoryTheme.material}
                            width={200} // Change width here
                            height={200} // Change height here
                        >
                            <VictoryAxis
                                style={{
                                    tickLabels: { fontSize: 4 , angle: -45 },
                                    axis: { stroke: "#333333" },
                                    ticks: { size: 5 }
                                }} />
                            <VictoryAxis
                                dependentAxis
                                tickFormat={(t) => `${t}%`}
                                style={{
                                    tickLabels: { fontSize: 6 },
                                    axis: { stroke: "#333333" },
                                    ticks: { size: 5 }
                                }}
                            />
                            <VictoryLine
                                data={getChartData(selectedSubject)}
                                style={{
                                    data: { stroke: "#888888" }
                                }}
                            />
                        </VictoryChart>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AnalyticsPage;
