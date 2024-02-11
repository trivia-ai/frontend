import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Tabs, Tab, Typography, Box, Grid } from '@mui/material';
import { QuizApp, Loading } from '../components'
import { API } from '../utilities'


const QuizPage = () => {
  const email = localStorage.getItem('userEmail')
  const { courseId, topicId, quizId } = useParams();

    const [tabVal, setTabVal] = useState(0);
    const handleTabChange = (e, newVal) => setTabVal(newVal);

    const [currQuiz, setCurrQuiz] = useState([])
    const [timestamp, setTimestamp] = useState('')

    const [progress, setProgress] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const [courseName, setCourseName] = useState('')
    const [topicName, setTopicName] = useState('')

    useEffect(() => {
        handleGetQuizByDate();
    }, [])

    const handleGetQuizByDate = async () => {
        try {
            setIsLoading(true)

            const courseRes = await API.getSubjects({ email })
            const _course = courseRes.data[courseId].subject
            setCourseName(_course)

            const topicsRes = await API.getTopics({ email, subject: _course })
            const _topic = topicsRes.data[topicId]
            setTopicName(_topic)

            const quizRes = await API.getQuizzes({ email, subject: _course, topic: _topic})
            const _allquiz = quizRes.data[0].topics[topicId].quizzes

            console.log(_allquiz[quizId])

            setTimestamp(_allquiz[quizId].timestamp)

            if(_allquiz[quizId].attempts) {
                setProgress(_allquiz[quizId].attempts)
            }
            console.log(_allquiz[quizId].attempts)

            if(_allquiz[quizId].flashcards) {
                console.log(_allquiz[quizId].flashcards)
                setCurrQuiz(_allquiz[quizId].flashcards)
            } else if(_allquiz[quizId].questions) {
                console.log(_allquiz[quizId].questions)
                setCurrQuiz(_allquiz[quizId].questions)
            }

            console.log(progress, 'skjdhfjshdjsjbsjbfsdhjbhb')

            
            setIsLoading(false)
        } 
        catch (error) {
            console.error('Error fetching subject:', error)
            setIsLoading(false)
        }
    };

    const MYPROGRESSCol = ['Score', 'Timstamp'];

    return (
        <div>
            <h1 className='page_heading'>{courseName}</h1>
            <p className='page_subheading'>{topicName}</p>

            <Loading isLoading={isLoading} />

            <h1 className='page_backgroundText'>{quizId}</h1>

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
                        <QuizApp quizData={currQuiz} courseName={courseName} topicName={topicName} time={timestamp} />
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
                            {progress.map((row, rowIndex) => {
                                console.log(row)
                                return (
                                    <Grid key={rowIndex} container item spacing={0} sx={{backgroundColor: '#26262F', margin: '4px 0', padding: '1rem'}}>
                                        {Object.values(row).map((col) => {
                                            console.log(col)
                                            return (
                                                <Grid key={col} item xs={3}> {col}</Grid>
                                            )
                                        })}
                                    </Grid>
                                )
                            }
                            )}
                        </Grid>
                    </CustomTabPanel>
                </Box>
            </div>        
        </div>
    );
}

export default QuizPage;

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