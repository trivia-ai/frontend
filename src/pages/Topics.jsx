import { CardTopic } from '../components'
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';

function Topics() {
    const { name } = useParams();

    const DESC = 'this is a short description of the subject'

    const TOPICS = [
        {name: 'Asymptotic Analyis', score: '45'},
        {name: 'Greedy Algorithm', score: '45'},
        {name: 'Dynamic Programming', score: '45'},
    ]

  return (
    <div>
      <h1>{name}</h1>
      <p>{DESC}</p>

      <Grid container spacing={5}>
        {TOPICS.map((course, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <CardTopic name={course.name} score={course.score} />
          </Grid>
        ))}
      </Grid>
      
    </div>
  );
}

export default Topics;
