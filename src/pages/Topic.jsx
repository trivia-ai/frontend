import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Grid, TextField, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { CardQuiz, Dropzone, Loading } from '../components'
import { API } from '../utilities'

const TopicPage = () => {
    const { courseId, topicId } = useParams()
    const email = localStorage.getItem('userEmail')

    const [course, setCourse] = useState({})
    const [topic, setTopic] = useState()
    const [quizes, setQuizes] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [topicName, setTopicName] = useState('')
    const handleTopicNameChange = (e) => setTopicName(e.target.value)

    useEffect(() => {
        handleGetCourseTopicAndQuiz()
    }, [])

    const handleGetCourseTopicAndQuiz = async () => {
        try {
            setIsLoading(true)

            const courseRes = await API.getSubjects({ email })
            setCourse(courseRes.data[courseId])
            console.log('GET COURSE ---', courseRes.data[courseId])

            const topicsRes = await API.getTopics({ email, subject: courseRes.data[courseId].subject })
            setTopic(topicsRes.data[topicId])
            console.log('GET TOPICS ---', topicsRes.data[topicId])


            const quizRes = await API.getQuizzes({ email, subject: courseRes.data[courseId].subject, topic: topicsRes.data[topicId]})
            console.log('GET QUIZ ---', quizRes.data[0].topics[topicId].quizzes)
            setQuizes(quizRes.data[0].topics[topicId].quizzes)

            setIsLoading(false)
        } 
        catch (error) {
            console.error('Error fetching subject:', error)
            setIsLoading(false)
        }
    };

    const SAVEDQUIZ = [
        {name: 'Multi Select', id:'01', color: '#FF6D46', dateCreated:"14th Feb 2024"},
        {name: 'Single Select', id:'02', color: '#FF6D46', dateCreated:"14th Feb 2024"},
        {name: 'Flashcard', id:'03', color: '#FF6D46', dateCreated:"14th Feb 2024"},
    ]


    const [quizRadio, setQuizRadio] = useState('single');
    const [quizNum, setQuizNum] = useState(10);

    const handleQuizRadioChange = (e) => setQuizRadio(e.target.value);
    const handleQuizNumChange = (e) => setQuizNum(e.target.value);


    return (
        <div>
            <h1 className='page_heading'>{course.subject}</h1>

            <Loading isLoading={isLoading} />

            <div className='section'>
                <div className='input_container'>
                    <input 
                        className="input" 
                        type="text" 
                        name="topic" 
                        placeholder='Topic Name...' 
                        required 
                        value={topicName}
                        onChange={handleTopicNameChange} 
                    />
                </div>
                <Dropzone />
                <br/>

                <div className='input_container'>
                    
                    <RadioGroup row value={quizRadio} onChange={handleQuizRadioChange} style={{flex: '2'}}>
                        <FormControlLabel value="single" control={<Radio />} label="MCQ-Single" />
                        <FormControlLabel value="multi" control={<Radio />} label="MCQ-Multi" />
                        <FormControlLabel value="flash" control={<Radio />} label="Flashcard" />
                        <FormControlLabel value="bool" control={<Radio />} label="True/False" />
                    </RadioGroup>

                    <TextField
                        label="How many Questions"
                        variant="outlined"
                        type="number"
                        value={quizNum}
                        onChange={handleQuizNumChange}
                        style={{ marginTop: '10px', flex: '1' }}
                    />

                </div>


      
                <Button variant="contained" >Generate Your Quizzzz!</Button>
            </div>



            <div className='section'>
                <h2 className='page_heading2'>Saved Quizes</h2>
                <Grid container spacing={5}>
                    {quizes.map((quiz, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <CardQuiz quizId={index} quizName={Object.keys(quiz)[0]} courseId={courseId} topicId={topicId} date={quiz.timetamp} color={'#FF6D46'} />
                    </Grid>
                    ))}
                </Grid>
            </div>
        
        </div>
    );
}

export default TopicPage;
