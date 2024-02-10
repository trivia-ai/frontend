import { useNavigate } from "react-router-dom";

function CardCourses(props) {
    const { id, name, desc, color } = props
    const navigate = useNavigate();

    return (
      <div className='cardCourse_container' onClick={() => navigate(`/course/${name}`)}>
        <p className='cardCourse_id' style={{borderColor: color}}>{id}</p>
        <br/>
        <div>
            <h3 className='cardCourse_name'>{name}</h3>
            <p className='cardCourse_desc'>{desc}</p>
        </div>
      </div>
    );
  }
  
  export default CardCourses;
  