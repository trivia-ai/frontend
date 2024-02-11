import { useNavigate } from "react-router-dom";
import { zeroPaddingFunc } from '../utilities'

function CardQuiz(props) {
    const { quizId, quizName, courseId, topicId, date, color } = props
    const navigate = useNavigate();
    console.log(quizId, quizName, courseId, topicId, date, color)

    return (
      <div className='cardCourse_container' onClick={() => navigate(`/course/${courseId}/topic/${topicId}/quiz/${quizId}`)}>
        <p className='cardCourse_id' style={{borderColor: color}}>{zeroPaddingFunc(quizId+1)}</p>
        <br/>
        <div>
            <h3 className='cardCourse_name'>{quizName}</h3>
            <p className='cardCourse_desc'>{date}</p>
        </div>
      </div>
    );
  }
  
  export default CardQuiz;
  