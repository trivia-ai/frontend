import React, { useState } from 'react'
import { CardQuiz, Dropzone } from '../components'
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const CourseTopic = () => {
    const { course, topic } = useParams();

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
            <h1 className='page_heading'>{course}</h1>
            <p className='page_subheading'>{topic}</p>

            <div className='section'>
                <h2 className='page_heading2'>Upload Document</h2>
                <Dropzone />
                <br/>
                <Button variant="contained" >Upload</Button>
            </div>


            <div className='section'>
                <h2 className='page_heading2'>Generate your QUIZ!</h2>

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
                <Button variant="contained" >Generate</Button>

            </div>



            <div className='section'>
                <h2 className='page_heading2'>Saved Quizes</h2>
                <Grid container spacing={5}>
                    {SAVEDQUIZ.map((quiz, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <CardQuiz id={quiz.id} name={quiz.name} course={course} topic={topic} date={quiz.dateCreated} color={quiz.color} />
                    </Grid>
                    ))}
                </Grid>
            </div>
        
        </div>
    );
}

export default CourseTopic;
