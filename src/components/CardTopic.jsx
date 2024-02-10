import { useNavigate } from "react-router-dom";

function CardTopic(props) {
    const { course, id, name, color } = props
    const navigate = useNavigate();

    return (
      <div className='cardCourse_container' onClick={() => navigate(`/course/${course}/topic/${name}`)}>
        <p className='cardCourse_id' style={{borderColor: color}}>{id}</p>
        <br/>
        <div>
            <h3 className='cardCourse_name'>{name}</h3>
        </div>
      </div>
    );
  }
  
  export default CardTopic;
  