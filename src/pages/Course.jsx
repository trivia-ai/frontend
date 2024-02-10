import { Button, TextField, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CardTopic } from '../components'

const Course = () => {
    const { name } = useParams();

    const DESC = 'this is a short description of the subject'

    const TOPICS = [
        {name: 'Asymptotic Analyis', id:'01', color: '#FF6D46'},
        {name: 'Greedy Algorithm', id:'02', color: '#FF6D46'},
        {name: 'Dynamic Programming', id:'03', color: '#FF6D46'},
    ]

  return (
    <div>
      <h1 className='page_heading'>{name}</h1>
      <p className='page_subheading'>{DESC}</p>

      <div className='input_container'>
        <TextField style={{flex: '7', color: '#fff'}} fullWidth id="filled-basic" label="Name of the Topic" variant="filled" color='secondary' />
        <Button style={{flex: '1'}} variant="contained" >ADD</Button>
      </div>

      <Grid container spacing={5}>
        {TOPICS.map((course, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <CardTopic course={name} id={course.id} name={course.name} color={course.color} />
          </Grid>
        ))}
      </Grid>
      
    </div>
  );
}

export default Course;
