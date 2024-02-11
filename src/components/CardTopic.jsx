import { useNavigate } from "react-router-dom";
import { zeroPaddingFunc } from '../utilities'

function CardTopic(props) {
    const { courseId, topicId, name, color } = props
    const navigate = useNavigate();

    return (
      <div className='cardCourse_container' onClick={() => navigate(`/course/${courseId}/topic/${topicId}`)}>
        <p className='cardCourse_id' style={{borderColor: color}}>{zeroPaddingFunc(topicId+1)}</p>
        <br/>
        <div>
            <h3 className='cardCourse_name'>{name}</h3>
        </div>
      </div>
    );
  }
  
  export default CardTopic;
  