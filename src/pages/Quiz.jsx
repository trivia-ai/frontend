import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Tabs, Tab, Typography, Box, Grid } from '@mui/material';
import { QuizApp } from '../components'


const quizData = [
    {
        'Question': 'Which of the following is not a benefit of copying data locally?', 
        'Options': ['Speed improvement', 'Reduced latency', 'Increased bandwidth', 'Enhanced reliability'], 
        'Answer': 'Increased bandwidth'
    }, 
    {
        'Question': 'What is the main reason for copying data locally?', 
        'Options': ['To save space', 'To improve security', 'To increase speed', 'To reduce costs'], 
        'Answer': 'To increase speed'
    }, 
    {
        'Question': 'How much faster are local disks compared to a 100 Mb network?', 
        'Options': ['Twice as fast', 'Three times as fast', 'Four times as fast', 'Five times as fast'], 
        'Answer': 'Three times as fast'
    }, 
    {
        'Question': 'Which of the following is not a factor to consider when deciding whether to copy data locally?', 
        'Options': ['Data size', 'Network speed', 'Disk speed', 'Budget'], 
        'Answer': 'Budget'
    }, 
    {
        'Question': 'What is the best way to ensure that data is copied locally, not over the network?', 
        'Options': ['Use a local copy command', 'Disable network access', 'Use a dedicated local server', 'Use a high-speed network'], 
        'Answer': 'Use a local copy command'
    }, 
    {
        'Question': 'Which of the following is not a potential drawback of copying data locally?', 
        'Options': ['Increased security', 'Reduced latency', 'Increased storage requirements', 'Improved performance'], 
        'Answer': 'Improved performance'
    }, 
    {
        'Question': 'What is the most important factor to consider when choosing a local copy method?', 
        'Options': ['Speed', 'Security', 'Reliability', 'Cost'], 
        'Answer': 'Speed'
    }, 
    {
        'Question': 'Which of the following is not a potential benefit of copying data locally?', 
        'Options': ['Reduced network traffic', 'Improved data integrity', 'Enhanced data security', 'Increased data accessibility'], 
        'Answer': 'Increased data accessibility'
    }, 
    {
        'Question': 'When should you consider copying data locally instead of over the network?', 
        'Options': ['When working with large datasets', 'When working with sensitive data', 'When working on a remote computer', 'When working on a slow network'], 
        'Answer': 'When working with large datasets'
    }, 
    {
        'Question': 'What is the best way to ensure that local copies of data are up to date?', 
        'Options': ['Use a file synchronization tool', 'Manually copy files as needed', 'Use a cloud-based storage service', 'Use a dedicated local server'], 
        'Answer': 'Use a file synchronization tool'
    }
];


const Quiz = () => {
    const { course, topic, quizid } = useParams();

    const [tabVal, setTabVal] = useState(0);
    const handleTabChange = (e, newVal) => setTabVal(newVal);

    const MYPROGRESSRow = [
        {Date:'12/03/2024', Time:'10:46pm', TimeTaken:'45 mins', Score:'56'},
        {Date:'12/03/2024', Time:'10:46pm', TimeTaken:'45 mins', Score:'56'},
        {Date:'12/03/2024', Time:'10:46pm', TimeTaken:'45', Score:'56'},
        {Date:'12/03/2024', Time:'10:46pm', TimeTaken:'45', Score:'56'},
        {Date:'12/03/2024', Time:'10:46pm', TimeTaken:'45', Score:'56'},
    ]

    const MYPROGRESSCol = Object.keys(MYPROGRESSRow[0]);

    return (
        <div>
            <h1 className='page_heading'>{course}</h1>
            <p className='page_subheading'>{topic}</p>

            <h1 className='page_backgroundText'>{quizid}</h1>

            <div className='section'>
                <h2 className='page_heading2'>Quiz</h2>
                

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabVal} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab label="My Questions" {...tabProps(0)} style={{ color: '#fff' }} />
                        <Tab label="Previous Analytics" {...tabProps(1)} style={{ color: '#fff' }} />
                        </Tabs>
                    </Box>

                    {/* TAB 1 */}
                    <CustomTabPanel value={tabVal} index={0}>
                        <QuizApp quizData={quizData} />
                    </CustomTabPanel>

                    {/* TAB 2 */}
                    <CustomTabPanel value={tabVal} index={1}>

                        <Grid container spacing={0}>
                            {/* Header Row */}
                            <Grid container item spacing={0} sx={{margin: '5px 0', fontWeight: '800', color:'#5A5960'}}>
                                {MYPROGRESSCol.map((col) => (
                                    <Grid key={col} item xs={3}>{col}</Grid>
                                ))}
                            </Grid>

                            {/* Data Rows */}
                            {MYPROGRESSRow.map((row, rowIndex) => (
                                <Grid key={rowIndex} container item spacing={0} sx={{backgroundColor: '#26262F', margin: '4px 0', padding: '1rem'}}>
                                    {MYPROGRESSCol.map((col) => (
                                        <Grid key={col} item xs={3}> {row[col]}</Grid>
                                    ))}
                                </Grid>
                            ))}
                        </Grid>
                    </CustomTabPanel>
                </Box>
            </div>        
        </div>
    );
}

export default Quiz;

const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const tabProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}