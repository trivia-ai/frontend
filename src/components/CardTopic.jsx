import Slider from '@mui/material/Slider';
import { Link } from 'react-router-dom'

function CardTopic(props) {
    const { name, score } = props

    return (
      <div className='cardCourse_container'>
        <div>
            <Link className='cardCourse_name' to={`/course/${name}`}>{name}</Link>
        </div>
        <br/>
        <div>
            <Slider defaultValue={score} size="small" aria-label="Disabled slider" />
            <div className='cardCourse_progress_container'>
                <span>Progress</span>
                <span>{score}%</span>
            </div>
        </div>
      </div>
    );
  }
  
  export default CardTopic;
  