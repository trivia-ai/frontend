import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Grid, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { CardQuiz, Loading } from '../components'
import { API } from '../utilities'
import axios from 'axios'

const TopicPage = () => {
    const { courseId, topicId } = useParams()
    const email = localStorage.getItem('userEmail')

    const [course, setCourse] = useState({})
    const [topic, setTopic] = useState('')
    const [quizes, setQuizes] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [pdfText, setPdfText] = useState('')

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
            console.log(quizRes, '##########')

            console.log(topicId, 'topicId')
            console.log('GET QUIZ ---', quizRes.data[0].topics[topicId].quizzes)
            setQuizes(quizRes.data[0].topics[topicId].quizzes)

            setIsLoading(false)
        } 
        catch (error) {
            console.error('Error fetching subject:', error)
            setIsLoading(false)
        }
    };

    const [quizRadio, setQuizRadio] = useState('single');
    const [quizNum, setQuizNum] = useState(10);

    const handleQuizRadioChange = (e) => setQuizRadio(e.target.value);
    const handleQuizNumChange = (e) => setQuizNum(e.target.value);



    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            setIsLoading(true)
            const response = await axios.post('https://us-central1-plt-gcp-401119.cloudfunctions.net/pdfToText', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            console.log('file', file, response)
            setPdfText(response.data)
            setIsLoading(false)
            toast('File uploaded Successfully', { theme: "dark" })
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Bad Request: File could not be uploaded', { theme: "dark" })
            setIsLoading(false)
        }
    }

    const questionType = {
        single: 1,
        bool: 2,
        flash: 3
    }

    const handleGenerateQuiz = async () => {
        console.log(topic, topicName)
        const data = {
            email,
            subject: course.subject,
            topic: topic ? topic : topicName,
            data: pdfText,
            questions_number: quizNum,
            questions_type: questionType[quizRadio]
        }
        console.log(data)
        try {
            setIsLoading(true)
            const res = await API.generateQuiz(data)
            setIsLoading(false)
            console.log(res.data.questions)
            toast('Quiz generated Successfully', { theme: "dark" })
            window.location.reload()
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Bad Request: Could not generate the quiz', { theme: "dark" });
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h1 className='page_heading'>{course.subject}</h1>

            <ToastContainer />
            <Loading isLoading={isLoading} />

            <div className='section'>
                <div className='input_container'>
                    <input 
                        className="input" 
                        type="text" 
                        name="topic" 
                        placeholder='Topic Name...' 
                        required 
                        value={topic ? topic : topicName}
                        onChange={handleTopicNameChange} 
                    />
                </div>

                <div className='newsection'>
                    <p className='fileinput_label'>Please upload the file you would like to create quiz from</p>
                    <div className='fileinput_container'>
                        <input type="file" onChange={handleFileChange} />
                        <button className='btn' onClick={handleUpload}>Upload</button>
                    </div>
                </div>

                <div className='newsection input_container'>
                    <RadioGroup row value={quizRadio} onChange={handleQuizRadioChange} style={{flex: '2'}}>
                        <FormControlLabel value="single" control={<Radio />} label="MCQ-Single" />
                        <FormControlLabel value="flash" control={<Radio />} label="Flashcard" />
                        <FormControlLabel value="bool" control={<Radio />} label="True/False" />
                    </RadioGroup>
                    <input 
                        className="input inputflex" 
                        type="number" 
                        name="quiznumber" 
                        placeholder='Number of Quiz questions...' 
                        required 
                        value={quizNum}
                        onChange={handleQuizNumChange} 
                    />
                </div>

                <br/>
                <br/>
                <br/>
                <br/>

                <button className='btn' onClick={handleGenerateQuiz}>Generate Your Quizzzz!</button>
            </div>



            <div className='section'>
                <h2 className='page_heading2'>Saved Quizes</h2>
                <Grid container spacing={5}>
                    {quizes.map((quiz, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <CardQuiz quizId={index} quizName={`quiz ${index + 1}`} courseId={courseId} topicId={topicId} date={quiz.timetamp} color={'#FF6D46'} />
                    </Grid>
                    ))}
                </Grid>
            </div>
        
        </div>
    );
}

export default TopicPage;
