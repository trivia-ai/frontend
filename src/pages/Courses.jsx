import { CardCourse } from '../components'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Courses() {

  const COURSES = [
    {name: 'Analysis of Algorithms', desc: 'this is a short description of the subject', id: '01', color:'#FF6D46'},
    {name: 'Cloud Computing', desc: 'this is a short description of the subject', id: '02', color: '#45AB5F'},
    {name: 'Cloud Computing', desc: 'this is a short description of the subject', id: '03', color: '#45AB5F'},
    {name: 'Cloud Computing', desc: 'this is a short description of the subject', id: '04', color: '#45AB5F'},
    {name: 'Programming Languages and Translator', desc: 'this is a short description of the subject', id: '05', color: '#FF6D46'},
    {name: 'Programming Languages and Translator', desc: 'this is a short description of the subject', id: '06', color: '#FF6D46'},
  ]

  return (
    <div>
      <h1 className='page_heading'>Courses</h1>

      <div className='input_container'>
        <TextField style={{flex: '2', color: '#fff'}} fullWidth id="filled-basic" label="Name of the Course" variant="filled" color='secondary' />
        <TextField style={{flex: '5'}} fullWidth id="filled-basic" label="Short Description of the Course" variant="filled" color='secondary' />
        <Button style={{flex: '1'}} variant="contained" >ADD</Button>
      </div>

      <Grid container spacing={5}>
        {COURSES.map((course, index) => (
          <Grid item key={index} xs={12} sm={6} md={3} lg={2}>
            <CardCourse id={course.id} name={course.name} desc={course.desc} score={course.score} color={course.color} />
          </Grid>
        ))}
      </Grid>
      
    </div>
  );
}

export default Courses;
