import { useNavigate } from "react-router-dom";

function CardQuiz(props) {
    const { id, name, course, topic, date, color } = props
    const navigate = useNavigate();

    return (
      <div className='cardCourse_container' onClick={() => navigate(`/course/${course}/topic/${topic}/quiz/${id}`)}>
        <p className='cardCourse_id' style={{borderColor: color}}>{id}</p>
        <br/>
        <div>
            <h3 className='cardCourse_name'>{name}</h3>
            <p className='cardCourse_desc'>{date}</p>
        </div>
      </div>
    );
  }
  
  export default CardQuiz;
  