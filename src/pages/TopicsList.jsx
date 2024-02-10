import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { CardTopic, Loading } from '../components'
import { API } from '../utilities'

const TopicsListPage = () => {
    const { courseId } = useParams()
    const navigate = useNavigate()
    const email = localStorage.getItem('userEmail')

    const [course, setCourse] = useState({})
    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      handleGetCourseAndTopics()
    }, [])

    const handleGetCourseAndTopics = async () => {
      try {
        setIsLoading(true)
        const courseRes = await API.getSubjects({ email })
        setCourse(courseRes.data[courseId])
        console.log('GET COURSE ---', courseRes.data[courseId])
        const topicsRes = await API.getTopics({ email, subject: courseRes.data[courseId].subject })
        setTopics(topicsRes.data)
        console.log('GET TOPICS ---', topicsRes.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching subject:', error);
        setIsLoading(false)
      }
    };

    const handlePostTopic = () => {
      navigate(`/course/${courseId}/topic/${topics.length}`)
    }

  return (
    <div>
      <h1 className='page_heading'>{course.subject}</h1>
      <p className='page_subheading'>{course.description}</p>

      <Loading isLoading={isLoading} />

      <div className='input_container'>
        <button style={{flex:1}} className="btn" type="submit" onClick={handlePostTopic}>Add Topic</button>
      </div>

      <Grid container spacing={5}>
        {Array.isArray(topics) && topics.length > 0 && topics.map((course, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <CardTopic course={courseId} id={course.id} name={course.name} color={course.color} />
          </Grid>
        ))}
      </Grid>
      
    </div>
  );
}

export default TopicsListPage;
